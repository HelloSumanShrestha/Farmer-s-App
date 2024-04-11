import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

import './Login.scss';
import 'react-toastify/dist/ReactToastify.css';

import image from "../../assets/images.png"

export default function Login({ setIsLoggedIn }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = () => {

        if ('' === username) {
            toast.error('Please enter your username');
            return;
        }

        if ('' === password) {
            toast.error('Please enter your password');
            return;
        }

        // handle login functionality for the seller

        fetch("http://localhost:8000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ "username": username, "password": password })
        }).then(
            res => {
                if (res.status === 200) {
                    toast.success("Login Successful!")
                    setTimeout(() => {
                        setIsLoggedIn(true)
                        navigate("/")
                    }, 1500)
                }
                else {
                    toast.error("Invalid password or username!")
                }
            }
        )
    };

    return (
        <div className="main">
            <ToastContainer />
            <div className="image-container">
                <img src={image} alt="" />
            </div>

            <div className="login-form-container">
                <div className="login-form">
                    <div className="login-header">
                        <p className='login-main-text'>Welcome back!</p>
                        <p className='login-sub-text'>Login to manage your products</p>
                    </div>
                    <div className="login-textfields">
                        <label htmlFor="">Username</label>
                        <input type="text" placeholder='Enter your username' value={username} onChange={(e) => setUsername(e.target.value)} />

                        <label htmlFor="">Password</label>
                        <input type="password" placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)} />

                        <p className="forgot-password">Forgot Password?</p>
                    </div>
                    <div className="login-footer">
                        <button className='signin-btn' onClick={handleSubmit}>Sign in</button>
                        <Link to={"/signup"} className='signup-redirect'>
                            <p>New to Sajha Baari? <span className='login-to-signup'>Signup now</span></p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
