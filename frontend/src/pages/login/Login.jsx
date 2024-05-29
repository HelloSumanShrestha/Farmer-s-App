import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import useStore from '../../zustand/userInfo';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const { logIn } = useStore();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8000/customers/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            if (response.ok) {
                const data = await response.json();
                toast.success("Login Successful!", { autoClose: 1000 });
                logIn(data.customerId);

                console.log(data);
                navigate('/');
            } else {
                const errorData = await response.json();
                toast.error(errorData.detail || "Invalid email or password!");
                console.error('Login failed:', errorData);
            }
        } catch (error) {
            toast.error("An error occurred while logging in!");
            console.error('Error logging in:', error);
        }
    };

    const handleShowPassword = () => {
        setShow(!show);
    };

    return (
        <div className="login-form-container">
            <ToastContainer />
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="login-header">
                    <p className="login-main-text">Welcome back!</p>
                    <p className="login-sub-text">Login to explore marketplace</p>
                </div>
                <div className="login-textfields">
                    <label>Email</label>
                    <input
                        type="text"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label>Password</label>
                    <input
                        type={show ? "text" : "password"}
                        placeholder="Enter your password"
                        autoComplete="on"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <div className="show-password">
                        <input type="checkbox" checked={show} onChange={handleShowPassword} />
                        <p className="show-password-text">Show Password</p>
                    </div>
                </div>

                <div className="login-footer">
                    <button className="signin-btn" type="submit">Sign in</button>
                    <p>New to Sajha Baari? <span className="login-to-signup">
                        <Link to="/signup">
                            Signup now
                        </Link>
                    </span>
                    </p>
                </div>
            </form>
        </div>
    );
}
