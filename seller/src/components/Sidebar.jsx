import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { FaHome, FaShoppingBag, FaMoneyBill, FaCog } from 'react-icons/fa';
import { FaBagShopping } from "react-icons/fa6";
import { AiFillProduct } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";

import "../assets/css/sidebar.css";
import useStore from "../zustand/userInfo"
import { CiLogin } from "react-icons/ci";
import { toast } from 'react-toastify';

export default function Sidebar() {
    const location = useLocation();
    const { logOut } = useStore()

    return (
        <>
            <div className="sidebar-container">
                <div className="sidebar-links-container">

                    <NavLink
                        to="/home"
                        className={({ isActive }) => isActive ? 'nav-link-active' : 'nav-link'}
                    >
                        <FaHome />
                        <p className="sidebar-links">
                            Home
                        </p>
                    </NavLink>

                    <NavLink
                        to="/orders"
                        className={({ isActive }) => isActive ? 'nav-link-active' : 'nav-link'}
                    >
                        <FaBagShopping />
                        <p className="sidebar-links">
                            Orders
                        </p>
                    </NavLink>

                    <NavLink
                        to="/products"
                        className={({ isActive }) => isActive ? 'nav-link-active' : 'nav-link'}
                    >
                        <AiFillProduct />
                        <p className="sidebar-links">
                            My Products
                        </p>
                    </NavLink>

                    <NavLink
                        to="/profile"
                        className={({ isActive }) => isActive ? 'nav-link-active' : 'nav-link'}
                    >
                        <FaUserCircle />
                        <p className="sidebar-links">
                            Profile
                        </p>
                    </NavLink>

                    <li onClick={() => {

                        {
                            logOut(),
                                toast.success("Log out successful!")
                        }
                    }
                    }
                    >
                        <CiLogin /> Log out
                    </li>
                </div>
            </div >
            <Outlet />
        </>
    );
}
