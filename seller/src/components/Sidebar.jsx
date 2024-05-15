import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { FaHome, FaShoppingBag, FaMoneyBill, FaCog } from 'react-icons/fa';
import "../assets/css/sidebar.css";
import useStore from "../zustand/userInfo"
import { CiLogin } from "react-icons/ci";

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
                        <FaMoneyBill />
                        <p className="sidebar-links">
                            Orders
                        </p>
                    </NavLink>

                    <NavLink
                        to="/products"
                        className={({ isActive }) => isActive ? 'nav-link-active' : 'nav-link'}
                    >
                        <FaShoppingBag />
                        <p className="sidebar-links">
                            My Products
                        </p>
                    </NavLink>

                    <NavLink
                        to="/settings"
                        className={({ isActive }) => isActive ? 'nav-link-active' : 'nav-link'}
                    >
                        <FaCog />
                        <p className="sidebar-links">
                            Settings
                        </p>
                    </NavLink>

                    <li onClick={logOut}>
                        <CiLogin /> Log out
                    </li>
                </div>
            </div>
            <Outlet />
        </>
    );
}
