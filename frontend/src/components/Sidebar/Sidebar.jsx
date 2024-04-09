import React, { useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';

import "../../assets/css/Sidebar.scss"

export default function Sidebar() {
    const location = useLocation();
    const [activeLink, setActiveLink] = useState(null);

    const handleNavLinkClick = (link) => {
        setActiveLink(link);
    };

    return (
        <>
            <div className="sidebar-container">

                <div className="sidebar-header">
                    <h1>SAAJHA BAARI</h1>
                </div>

                <div className="sidebar-links-container">

                    <NavLink
                        to="/"
                        className={location.pathname === '/' ? 'nav-link-active' : 'nav-link'}
                        onClick={() => handleNavLinkClick('/')}
                    >
                        <p className="sidebar-links">
                            Home
                        </p>
                    </NavLink>

                    <NavLink
                        to="/earnings"
                        className={location.pathname === '/earnings' ? 'nav-link-active' : 'nav-link'}
                        onClick={() => handleNavLinkClick('/earnings')}
                    >
                        <p className="sidebar-links">
                            Earnings
                        </p>
                    </NavLink>


                    <NavLink
                        to="/my-products"
                        className={location.pathname === '/my-products' ? 'nav-link-active' : 'nav-link'}
                        onClick={() => handleNavLinkClick('/my-products')}
                    >
                        <p className="sidebar-links">
                            My Products
                        </p>
                    </NavLink>

                    <NavLink
                        to="/settings"
                        className={location.pathname === '/settings' ? 'nav-link-active' : 'nav-link'}
                        onClick={() => handleNavLinkClick('/settings')}
                    >
                        <p className="sidebar-links">
                            Settings
                        </p>
                    </NavLink>
                </div>

            </div>
            <Outlet />
        </>
    );
}
