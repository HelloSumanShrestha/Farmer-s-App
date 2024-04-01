import React, { useState } from 'react'
import image from "../assets/images.png"
import './Login.scss'

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usernameError, setUsernameError] = useState("")
    const [passwordError, setPasswordError] = useState("")

    const handleSubmit = () => {
        setUsernameError('')
        setPasswordError('')

        if ('' === username) {
            setEmailError('Please enter your email')
            return
        }

        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(username)) {
            setUsernameError('Please enter a valid email')
            return
        }

        if ('' === password) {
            setPasswordError('Please enter a password')
            return
        }

        if (password.length < 7) {
            setPasswordError('The password must be 8 characters or longer')
            return
        }

    }

    return <>
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

                        <p className="forgot-password">Forgot Passwod?</p>
                    </div>
                    <div className="login-footer">
                        <button className='signin-btn' onClick={handleSubmit}>Sign in</button>
                        <p>New to Sajha Baari? <span className='login-to-signup'>Signup now</span></p>
                    </div>
                </div>
            </div>
        </div>
    </>
}