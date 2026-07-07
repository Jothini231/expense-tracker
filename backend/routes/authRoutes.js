const express = require("express");
const { protect } = require("../middleware/authMiddleware");

const{
    registerUser,
    loginUser,
    getUserInfo,
    forgotPassword,
    verifyOTP,
    resetPassword,
    googleAuth,
    updateProfileImage
} = require("../controllers/authController");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.post("/register" , registerUser);
router.post("/login" , loginUser);
router.post("/google", googleAuth);
router.get("/getUser",protect,getUserInfo);

router.post("/forgot-password", forgotPassword);
router.post("/verify-otp", verifyOTP);
router.post("/reset-password", resetPassword);
router.put("/profile-image", protect, updateProfileImage);

router.post("/upload-image", (req, res) => {
    upload.single("image")(req, res, function (err) {
        if (err) {
            console.error("Multer/Cloudinary Error:", err);
            return res.status(500).json({ message: "Upload failed", error: err.message || err });
        }
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }
        const imageUrl = req.file.path;
        res.status(200).json({ imageUrl });
    });
});

module.exports = router;