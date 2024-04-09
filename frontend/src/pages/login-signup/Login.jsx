import React, { useState } from 'react';
import users from "../../constant/users";
import { useNavigate, Link } from 'react-router-dom';
import './Login.scss';
import image from "../../assets/images.png"


export default function Login({ setIsLoggedIn }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = () => {
        setUsernameError('');
        setPasswordError('');

        if ('' === username) {
            setUsernameError('Please enter your username');
            return;
        }

        if ('' === password) {
            setPasswordError('Please enter your password');
            return;
        }

        const user = users.all.find(user => user.username === username && user.password === password);
        if (user) {
            setIsLoggedIn(true);
            navigate('/');
        } else {
            setUsernameError('Username or password is incorrect');
        }
    };

    return (
        <div className="main">
            <div className="image-container">
                <img src={image} alt="" />
            </div>

            <div className="login-form-container">
                <div className="login-form">
                    <div className="login-header">
                        <p className='login-main-text'>Welcome back!</p>
                        <p className='login-sub-text'>Login to explore marketplace</p>
                    </div>
                    <div className="login-textfields">
                        <label htmlFor="">Username</label>
                        <input type="text" placeholder='Enter your username' value={username} onChange={(e) => setUsername(e.target.value)} />
                        <label className="errorLabel">{usernameError}</label>

                        <label htmlFor="">Password</label>
                        <input type="password" placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)} />
                        <label className="errorLabel">{passwordError}</label>

                        <p className="forgot-password">Forgot Password?</p>
                    </div>
                    <div className="login-footer">
                        <button className='signin-btn' onClick={handleSubmit}>Sign in</button>
                        <Link to={"/signup"}>
                            <p>New to Sajha Baari? <span className='login-to-signup'>Signup now</span></p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
