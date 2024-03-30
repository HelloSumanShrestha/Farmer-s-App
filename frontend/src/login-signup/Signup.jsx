import React from 'react'
import image from "../assets/images.png"
import './Signup.scss'

export default function Signup() {
    return <>
        <div className="main">
            <div className="image-container">
                <img src={image} alt="" />
            </div>

            <div className="signup-form-container">
                <div className="signup-form">
                    <div className="signup-header">
                        <p className='signup-main-text'>Create an Account</p>
                        <p className='signup-sub-text'>Signup to explore marketplace</p>
                    </div>
                    <div className="signup-textfields">
                        <label htmlFor="">Full Name</label>
                        <input type="text" placeholder='Enter your full name' />

                        <label htmlFor="">Email</label>
                        <input type="email" placeholder='Enter your email' />

                        <label htmlFor="">Date of Birth</label>
                        <input type="date" className='input-date' />

                        <label htmlFor="">Username</label>
                        <input type="text" placeholder='Enter your username' />

                        <label htmlFor="">Password</label>
                        <input type="password" placeholder='Enter your password' />
                    </div>
                    <div className="signup-footer">
                        <button className='signup-btn'>Create Account</button>
                        <p>Already have an account? <span className='signup-to-login'>Sign in</span></p>
                    </div>
                </div>
            </div>
        </div>
    </>
}
