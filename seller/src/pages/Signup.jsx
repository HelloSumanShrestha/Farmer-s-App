import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../assets/css/Signup.css"

export default function Signup() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors = {};

        if (!fullName.trim()) {
            newErrors.fullName = 'Please enter your full name';
        }

        if (!email.trim()) {
            newErrors.email = 'Please enter your email';
        } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!password.trim()) {
            newErrors.password = 'Please enter your password';
        } else if (password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters long';
        }

        if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        if (Object.keys(newErrors).length > 0) {
            Object.values(newErrors).forEach((error) => {
                toast.error(error, {
                    autoClose: 2000
                });
            });
        }

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const newSeller = {
            sellerId: 0,
            sellerName: fullName,
            sellerEmail: email,
            sellerPassword: password
        };

        fetch("http://localhost:8000/sellers/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newSeller)
        }).then(response => {
            if (response.ok) {
                toast.success("Signup Successful! Redirecting...");
                setTimeout(() => navigate('/seller/login'), 2000);
            }
        }).catch(error => {
            toast.error("An error occurred while communicating with the server");
            console.error(error);
        });
    };

    const handleSellerClick = () => {
        window.location.href = "http://localhost:5173/";
    };

    return (
        <div className="main">
            <ToastContainer />
            <form className="signup-form" onSubmit={handleSubmit}>
                <div className="signup-header">
                    <li onClick={handleSellerClick} className='go-back'>
                        Go back
                    </li>
                    <p className="signup-main-text">Create an Account</p>
                    <p className="signup-sub-text">Signup to become a seller</p>
                </div>
                <div className="signup-textfields">
                    <label htmlFor="fullName">Full Name</label>
                    <input
                        type="text"
                        id="fullName"
                        placeholder="Enter your full name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />

                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <div className="signup-footer">
                    <button className="signup-btn" type="submit">Create Account</button>
                    <p className='login-redirect'>
                        Already have an account?{' '}
                        <Link to="/seller/login" className="signup-to-login">Sign in</Link>
                    </p>
                </div>
            </form>
        </div>
    );
}
