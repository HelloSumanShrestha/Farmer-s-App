import React, { useState } from 'react';
import './Signup.scss';
import { Link, useNavigate } from 'react-router-dom';
import users from '../../constant/users';
import image from "../../assets/images.png"

export default function Signup() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleFullNameChange = (e) => {
        setFullName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        setErrors({});

        const errors = {};
        if (!fullName.trim()) {
            errors.fullName = 'Please enter your full name';
        }
        if (!email.trim()) {
            errors.email = 'Please enter your email';
        } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            errors.email = 'Please enter a valid email';
        }
        if (!username.trim()) {
            errors.username = 'Please enter your username';
        }
        if (!password.trim()) {
            errors.password = 'Please enter your password';
        } else if (password.length < 8) {
            errors.password = 'Password must be at least 8 characters long';
        }

        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }

        const newUser = { username, password };

        users.all.push(newUser);

        navigate('/login');
    };

    return (
        <div className="main">
            <div className="image-container">
                <img src={image} alt="" />
            </div>

            <div className="signup-form-container">
                <form className="signup-form" onSubmit={handleSubmit}>
                    <div className="signup-header">
                        <p className="signup-main-text">Create an Account</p>
                        <p className="signup-sub-text">Signup to explore marketplace</p>
                    </div>
                    <div className="signup-textfields">
                        <label htmlFor="fullName">Full Name</label>
                        <input
                            type="text"
                            id="fullName"
                            placeholder="Enter your full name"
                            value={fullName}
                            onChange={handleFullNameChange}
                        />
                        {errors.fullName && <span className="error">{errors.fullName}</span>}

                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={handleEmailChange}
                        />
                        {errors.email && <span className="error">{errors.email}</span>}

                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            placeholder="Enter your username"
                            value={username}
                            onChange={handleUsernameChange}
                        />
                        {errors.username && <span className="error">{errors.username}</span>}

                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                        {errors.password && <span className="error">{errors.password}</span>}

                        <label htmlFor="password">Confirm Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                        {errors.password && <span className="error">{errors.password}</span>}
                    </div>
                    <div className="signup-footer">
                        <button className="signup-btn" onClick={handleSubmit}>Create Account</button>
                        <p>
                            Already have an account?{' '}
                            <Link to="/login" className="signup-to-login">Sign in</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}
