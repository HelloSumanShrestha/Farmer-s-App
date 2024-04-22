// Navbar.jsx
import React, { useState } from 'react';
import './navbar.css';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isActive, setIsActive] = useState(false);

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  const logout = () => {
    setIsActive(false)
  }

  return (
    <nav className="navbar">
      <div className="logo">        <span className="sajha">SAJHA</span> <span className="baari">BAARI</span>
      </div>
      <div className={`hamburger-menu ${isActive ? 'active' : ''}`} onClick={toggleMenu}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
      <ul className={`nav-links ${isActive ? 'active' : ''}`}>
        <div className="search-container">
          <input type="search" id="q-search" placeholder="Search products" className="search-input" />
          <button type="submit" className="search-button">Search</button>
        </div>

        <li className="seller-button">
          <Link to={"/seller/signup"}>Become a seller</Link>
        </li>
        <li>
          <a href='#banner'>Home</a>
        </li>
        <li>
          <a href="#products">Products</a>
        </li>
        <li>
          <a href="#testimonials">Testimonials</a>
        </li>
        <li>
          <a href="#blog">Blog</a>
        </li>
        <li>
          <a href="#about-us">About Us</a>
        </li>
      </ul>
    </nav>
  );
}
