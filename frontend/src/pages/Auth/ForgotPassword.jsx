import React, { useState, useEffect } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import toast from 'react-hot-toast';

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [resetToken, setResetToken] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [resendAttempts, setResendAttempts] = useState(0);
  
  const navigate = useNavigate();

  useEffect(() => {
    let timer;
    if (step === 2 && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [step, timeLeft]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    if (isSending) return;

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setIsSending(true);
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.FORGOT_PASSWORD, { email });
      toast.success(response.data.message);
      setTimeLeft(60);
      setStep(2);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP.");
    } finally {
      setIsSending(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();

    // If timer expired, treat this as a "Resend OTP" request
    if (timeLeft === 0) {
      if (resendAttempts >= 3) {
        toast.error("Maximum resend attempts reached. Please start over later.");
        return;
      }
      setResendAttempts(prev => prev + 1);
      await handleSendOTP(e);
      return;
    }

    if (!otp) {
      toast.error("Please enter the OTP.");
      return;
    }

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.VERIFY_OTP, { email, otp });
      setResetToken(response.data.resetToken);
      toast.success(response.data.message);
      setStep(3);
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid or expired OTP.");
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!newPassword || newPassword.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.RESET_PASSWORD, { resetToken, newPassword });
      toast.success(response.data.message);
      
      // Redirect to login after a short delay
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to reset password.");
    }
  };

  return (
    <AuthLayout>
      <div className="flex flex-col justify-center w-full">
        <div className="text-center mb-6">
          <h3 className="text-3xl font-bold text-gray-800 tracking-tight">
            {step === 1 && "Forgot Password"}
            {step === 2 && "Verify OTP"}
            {step === 3 && "Reset Password"}
          </h3>
          <p className="text-sm text-gray-500 mt-2">
            {step === 1 && "Enter your email to receive an OTP"}
            {step === 2 && `Enter the OTP sent to ${email}`}
            {step === 3 && "Enter your new password"}
          </p>
        </div>

        {step === 1 && (
          <form onSubmit={handleSendOTP}>
            <Input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email Address"
              placeholder="john@example.com"
              type="text"
            />
            <button type="submit" className="btn-primary mt-2" disabled={isSending}>
              {isSending ? "Sending..." : "Send OTP"}
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleVerifyOTP}>
            <Input
              value={otp}
              onChange={({ target }) => setOtp(target.value)}
              label="OTP"
              placeholder="123456"
              type="text"
            />
            {timeLeft > 0 ? (
              <p className="text-xs text-gray-500 pb-2.5 mt-2">OTP expires in {formatTime(timeLeft)}</p>
            ) : (
              <p className="text-expense text-xs pb-2.5 mt-2">OTP has expired. Click below to resend.</p>
            )}
            <button type="submit" className="btn-primary" disabled={isSending}>
              {isSending ? "Sending..." : (timeLeft === 0 ? "Resend OTP" : "Verify OTP")}
            </button>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleResetPassword}>
            <Input
              value={newPassword}
              onChange={({ target }) => setNewPassword(target.value)}
              label="New Password"
              placeholder="Min 6 characters"
              type="password"
            />
            <button type="submit" className="btn-primary mt-2">
              Reset Password
            </button>
          </form>
        )}
        
        {step === 1 && (
           <div className="text-center mt-4">
              <button 
                type="button"
                onClick={() => navigate("/login")}
                className="text-sm font-medium text-primary hover:text-indigo-500"
              >
                Back to Login
              </button>
           </div>
        )}
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;
