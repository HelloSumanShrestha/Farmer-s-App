import React, { useState } from 'react'
import "../assets/css/Navbar.css"
import { IoIosSearch } from "react-icons/io";
import { FaUserAlt } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import useStore from '../zustand/userInfo';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
    const navigate = useNavigate()
    const [searchItem, setSearchItem] = useState("")

    const { isLoggedIn, logOut } = useStore();

    return (
        <header>
            <div className="header-shortcuts">
                <li>Become a seller</li>
            </div>

            <nav>
                <div className="logo">
                    <Link to="/home">
                        Farmer App
                    </Link>
                </div>
                { }
                <form className="search" onSubmit={(e) => {
                    e.preventDefault();
                    navigate(`/search/${searchItem}`);
                }}>
                    <input type="search" value={searchItem} onChange={(e) => setSearchItem(e.target.value)} id="" placeholder='Search products' />
                    <button type="submit"><IoIosSearch /></button>
                </form>


                <ul className="nav-links">
                    <li>
                        <Link to="/products">
                            Products
                        </Link>
                    </li>

                    <li>
                        <Link to="/categories">
                            Categories
                        </Link>
                    </li>

                    <li>
                        <Link to="/about">
                            About Us
                        </Link>
                    </li>
                    <li>
                        <Link to="/cart">
                            <FaShoppingCart />
                        </Link>
                    </li>

                    {
                        isLoggedIn ? (
                            <>
                                <li>
                                    <Link to="/profile">
                                        <FaUserCircle />
                                    </Link>
                                </li>
                                <li onClick={logOut} style={{ cursor: "pointer" }}>
                                    Logout
                                </li>
                            </>
                        ) :

                            (<li>
                                <FaUserAlt />

                                <span>
                                    <Link to="/login">
                                        Sign in
                                    </Link>
                                    |
                                    <Link to="/login">
                                        Sign up
                                    </Link>
                                </span>
                            </li>)
                    }
                </ul>
            </nav>
        </header>
    )
}
