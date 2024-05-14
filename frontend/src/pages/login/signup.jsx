import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './signup.css';

export default function UserSignup() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const validateForm = () => {
        let isValid = true;

        if (!fullName.trim()) {
            toast.error('Please enter your full name', { autoClose: 2000 });
            isValid = false;
        }

        if (!email.trim()) {
            toast.error('Please enter your email', { autoClose: 2000 });
            isValid = false;
        } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            toast.error('Please enter a valid email', { autoClose: 2000 });
            isValid = false;
        }

        if (!password.trim()) {
            toast.error('Please enter your password', { autoClose: 2000 });
            isValid = false;
        } else if (password.length < 8) {
            toast.error('Password must be at least 8 characters long', { autoClose: 2000 });
            isValid = false;
        }

        if (password !== confirmPassword) {
            toast.error('Passwords do not match', { autoClose: 2000 });
            isValid = false;
        }

        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form submitted');

        if (!validateForm()) {
            console.log('Form validation failed');
            return;
        }

        const newUser = {
            customerId: 0,
            customerName: fullName,
            customerEmail: email,
            customerPassword: password
        };

        try {
            const response = await fetch("http://localhost:8000/customers/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newUser)
            });

            if (response.ok) {
                toast.success("Signup Successful! Redirecting...");
                setTimeout(() => navigate('/login'), 2000);
            } else if (response.status === 400) {
                const data = await response.json();
                toast.error(data.detail || "Username or email already exists");
            } else {
                toast.error("Something went wrong, please try again.");
            }
        } catch (error) {
            toast.error("An error occurred while communicating with the server");
            console.error(error);
        }
    };

    return (
        <div className="main">
            <ToastContainer />

            <div className="signup-form-container">
                <form className="signup-form" onSubmit={handleSubmit}>
                    <div className="signup-header">
                        <p className="signup-main-text">Create an Account</p>
                        <p className="signup-sub-text">Signup to get started</p>
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
                            Already have an account?
                            <Link to="/login" className="signup-to-login"> Sign in</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}
