import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import users from '../../constant/users';
import image from "../../assets/images.png"
import './Signup.scss';

export default function Signup() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
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

        if (!username.trim()) {
            newErrors.username = 'Please enter your username';
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

        const newUser = {
            fullname: fullName,
            email: email,
            username: username,
            password: password,
            usertype: "seller"
        };

        fetch("http://localhost:8000/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser)
        }).then(response => {
            if (response.status == 201) {
                toast.success("Signup Successful! Redirecting...");
                setTimeout(() => navigate('/login'), 2000);
            } else if (response.status === 400) {
                response.json().then(data => {
                    toast.error(data.detail || "Username or email already exists");
                });
            }
            else {
                toast.error("Something went wrong, please try again.");
            }
        }).catch(error => {
            toast.error("An error occurred while communicating with the server");
            console.error(error);
        });
    };


    return (
        <div className="main">
            <ToastContainer />
            <div className="image-container">
                <img src={image} alt="Signup" />
            </div>

            <div className="signup-form-container">
                <form className="signup-form" onSubmit={handleSubmit}>
                    <div className="signup-header">
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

                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
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
                            <Link to="/login" className="signup-to-login">Sign in</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}
