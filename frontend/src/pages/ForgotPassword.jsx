import React, { useState } from 'react';
import "../assets/css/forgot-password.scss";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [stage, setStage] = useState(0);

    let navigate = useNavigate()

    const handleEmail = (e) => {
        e.preventDefault();
        if (!email) {
            toast.error('Please enter your email');
            return;
        }

        fetch("http://localhost:8000/forgot_password", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email })
        }).then(res => {
            if (res.status === 200) {
                setStage(1);
                toast.success("OTP sent to your email");
            } else {
                toast.error("Email not found");
            }
        }).catch(() => {
            toast.error("An error occurred while sending OTP");
        });
    };

    const handleOTPVerification = (e) => {
        e.preventDefault();
        if (!otp) {
            toast.error('Please enter the OTP sent to your email');
            return;
        }

        fetch("http://localhost:8000/verify_otp", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, otp })
        }).then(res => {
            if (!res.ok) {
                setStage(2);
                toast.success("OTP verified, set your new password");
            } else {
                toast.error("Invalid OTP");
            }
        }).catch(() => {
            toast.error("An error occurred while verifying OTP");
        });
    };

    const handlePasswordChange = (e) => {
        e.preventDefault();
        if (!newPassword) {
            toast.error('Please enter a new password');
            return;
        }

        fetch("http://localhost:8000/update_password", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, otp: otp, new_password: newPassword })
        }).then(res => {
            if (res.status === 200) {
                toast.success("Password updated successfully");
                setEmail("");
                setOtp("");
                setNewPassword("");
                setStage(0);
                navigate("/seller/login")
            } else {
                toast.error("Failed to update password");
            }
        }).catch(() => {
            toast.error("An error occurred while updating the password");
        });
    };
    return (
        <div className="forgot-password-container">
            <div className="forgot-password-main">
                <h2>Saajha Baari</h2>
                {stage === 0 && (
                    <form onSubmit={handleEmail}>
                        <label>Please enter your email to search for your account.</label>
                        <input type="email" placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)} />
                        <button type="submit">Send OTP</button>
                    </form>
                )}
                {stage === 1 && (
                    <form onSubmit={handleOTPVerification}>
                        <label>Please enter the OTP sent to your email.</label>
                        <input type="text" placeholder='Enter OTP' value={otp} onChange={(e) => setOtp(e.target.value)} />
                        <button type="submit">Verify OTP</button>
                    </form>
                )}
                {stage === 2 && (
                    <form onSubmit={handlePasswordChange}>
                        <label>Please enter your new password.</label>
                        <input type="password" placeholder='New Password' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                        <button type="submit">Update Password</button>
                    </form>
                )}
            </div>
        </div>
    );
}
