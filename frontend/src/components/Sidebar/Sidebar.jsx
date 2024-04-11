import React, { useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SettingsIcon from '@mui/icons-material/Settings';
import "../../assets/css/Sidebar.scss"
import Settings from './../../pages/Settings';

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
                        <HomeIcon />
                        <p className="sidebar-links">
                            Home
                        </p>
                    </NavLink>

                    <NavLink
                        to="/earnings"
                        className={location.pathname === '/earnings' ? 'nav-link-active' : 'nav-link'}
                        onClick={() => handleNavLinkClick('/earnings')}
                    >
                        <AttachMoneyIcon />
                        <p className="sidebar-links">
                            Earnings
                        </p>
                    </NavLink>


                    <NavLink
                        to="/my-products"
                        className={location.pathname === '/my-products' ? 'nav-link-active' : 'nav-link'}
                        onClick={() => handleNavLinkClick('/my-products')}
                    >
                        <ShoppingBagIcon />
                        <p className="sidebar-links">
                            My Products
                        </p>
                    </NavLink>

                    <NavLink
                        to="/settings"
                        className={location.pathname === '/settings' ? 'nav-link-active' : 'nav-link'}
                        onClick={() => handleNavLinkClick('/settings')}
                    >
                        <SettingsIcon />
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
