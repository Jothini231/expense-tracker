const User = require("../models/User")
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");
const bcrypt = require("bcryptjs");
const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID || "YOUR_GOOGLE_CLIENT_ID_HERE");

const generateToken = (id) => {
    return jwt.sign({id} , process.env.JWT_SECRET , {expiresIn : "1h"});
}

exports.registerUser = async(req,res) => {

    const { fullName, email, password, profileImageUrl } = req.body;

    if(!fullName || !email || !password){
        return res.status(400).json({message : "All fields are required."});
    }

    try{
        const existingUser = await User.findOne({ email });
        if(existingUser){
            return res.status(400).json({message : "Email already exists"});
        }

        const user = await User.create({
            fullName,
            email,
            password,
            profileImageUrl
        });

        res.status(201).json({
            id: user._id,
            user,
            token: generateToken(user._id),
        });
    }catch(err){
        res
            .status(500)
            .json({message: "Error registering user", error: err.message});
    }
}

exports.loginUser = async (req,res) => {
    const {email , password } = req.body;

    if(!email || !password){
        return res.status(400).json({message: "All fields are required" });
    }

    try{
        const user = await User.findOne({email});
        if(!user || !(await user.comparePassword(password))){
            return res.status(400).json({message: "Invalid credentials" })
        }

        res.status(200).json({
            message : "logged in successfully",
            id: user._id,
            user,
            token: generateToken(user._id),
        });
    }catch(err){
        res
            .status(500)
            .json({message: "Error registering user", error: err.message});
    }
}

exports.getUserInfo = async(req,res) => {
    try{
        const user = await User.findById(req.user.id).select("-password");

        if(!user){
            return res.status(404).json({message : "User not found"});
        }

        res.status(200).json(user);
    }catch(err){
        res
            .status(500)
            .json({message: "Error getting user", error: err.message});
    }
}

// Generate OTP
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
};

exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    
    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const otp = generateOTP();
        const otpExpiry = new Date(Date.now() + 1 * 60 * 1000); // 1 minute expiry

        user.otp = otp;
        user.otpExpiry = otpExpiry;
        await user.save();

        const emailContent = `
            <h3>Password Reset OTP</h3>
            <p>Your OTP for password reset is <strong>${otp}</strong>.</p>
            <p>It is valid for 1 minute.</p>
        `;

        // Send email (if configured)
        try {
            if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
                await sendEmail({
                    to: email,
                    subject: "Password Reset OTP - SpendWise",
                    html: emailContent
                });
            } else {
                console.log("OTP Generated (Email not configured):", otp);
            }
        } catch (emailError) {
            console.error("Failed to send OTP email:", emailError);
            // We can still proceed if email fails for local testing, or return error in prod.
        }

        res.status(200).json({ message: "OTP sent successfully" });

    } catch (err) {
        res.status(500).json({ message: "Error in forgot password", error: err.message });
    }
};

exports.verifyOTP = async (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        return res.status(400).json({ message: "Email and OTP are required" });
    }

    try {
        const user = await User.findOne({ email });

        if (!user || user.otp !== otp) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        if (user.otpExpiry < new Date()) {
            return res.status(400).json({ message: "OTP has expired" });
        }

        // OTP is valid. We don't clear it yet so reset password can verify or we issue a temporary token.
        // For simplicity, we clear it and return a temp token, or just rely on a new endpoint.
        // Let's clear OTP and send a reset token that expires in 3 mins.
        user.otp = null;
        user.otpExpiry = null;
        await user.save();

        const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "3m" });

        res.status(200).json({ message: "OTP verified", resetToken });
    } catch (err) {
        res.status(500).json({ message: "Error verifying OTP", error: err.message });
    }
};

exports.resetPassword = async (req, res) => {
    const { resetToken, newPassword } = req.body;

    if (!resetToken || !newPassword) {
        return res.status(400).json({ message: "Reset token and new password are required" });
    }

    try {
        const decoded = jwt.verify(resetToken, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.password = newPassword;
        await user.save();

        res.status(200).json({ message: "Password reset successfully" });
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(400).json({ message: "Reset token expired" });
        }
        res.status(500).json({ message: "Error resetting password", error: err.message });
    }
};

exports.googleAuth = async (req, res) => {
    const { token } = req.body;
    if (!token) {
        return res.status(400).json({ message: "Token is required" });
    }

    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        const { email, name, picture } = payload;

        let user = await User.findOne({ email });

        if (!user) {
            // Create user
            user = await User.create({
                fullName: name,
                email: email,
                authProvider: 'google',
                profileImageUrl: picture
            });
        }

        res.status(200).json({
            message: "Logged in with Google successfully",
            id: user._id,
            user,
            token: generateToken(user._id),
        });

    } catch (err) {
        res.status(500).json({ message: "Error authenticating with Google", error: err.message });
    }
};