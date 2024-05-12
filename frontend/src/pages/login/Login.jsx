import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

export default function Login({ setIsLoggedIn }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [show, setShow] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {

        console.log({ "customer_email": email, "password": password });
        e.preventDefault();
        // try {
        // const response = await fetch('http://localhost:8000/sellers/login', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({ "customer_email": email, "password": password }),
        // });
        // if (response.ok) {
        setIsLoggedIn(true);
        navigate('/');
        //     } else {
        //         console.error('Login failed');
        //     }
        // } catch (error) {
        //     console.error('Error logging in:', error);
        // }
    };


    const handleShowPassword = () => {
        setShow(!show);
    };

    return (
        <div className="login-form-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="login-header">
                    <p className="login-main-text">Welcome back!</p>
                    <p className="login-sub-text">Login to explore marketplace</p>
                </div>
                <div className="login-textfields">
                    <label htmlFor="">Email</label>
                    <input
                        type="text"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label htmlFor="">Password</label>
                    <input
                        type={show ? "text" : "password"}
                        placeholder="Enter your password"
                        autoComplete="on"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <div className="show-password">
                        <input type="checkbox" value={show} onChange={handleShowPassword} />
                        <p className="show-password-text">Show Password</p>
                    </div>

                    <p className="forgot-password">Forgot Password?</p>
                </div>

                <div className="login-footer">
                    <button className="signin-btn" type="submit">Sign in</button>
                    <p>New to Sajha Baari? <span className="login-to-signup">Signup now</span></p>
                </div>
            </form>
        </div>
    );
}
