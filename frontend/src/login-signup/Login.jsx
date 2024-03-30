import React from 'react'
import image from "../assets/images.png"
import './Login.scss'

export default function Login() {
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
                        <input type="text" placeholder='Enter your username' />

                        <label htmlFor="">Password</label>
                        <input type="password" placeholder='Enter your password' />

                        <p className="forgot-password">Forgot Passwod?</p>
                    </div>
                    <div className="login-footer">
                        <button className='signin-btn'>Sign in</button>
                        <p>New to Sajha Baari? <span className='login-to-signup'>Signup now</span></p>
                    </div>
                </div>
            </div>
        </div>
    </>
}