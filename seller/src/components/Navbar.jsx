// Navbar.js
import React, { useState, useEffect } from 'react';
import { FaUserCircle } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import "../assets/css/Navbar.css";
import useStore from '../zustand/userInfo';

export default function Navbar() {

    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const [data, setData] = useState({});
    const { sellerId } = useStore();

    useEffect(() => {
        fetch("http://localhost:8000/sellers/" + sellerId)
            .then(res => res.json())
            .then(fetchedData => setData(fetchedData))
            .catch(err => console.error('Error fetching data:', err));
    }, [sellerId]);


    const handleSearch = () => {
        if (searchQuery.trim() !== '') {
            navigate(`/search/${searchQuery}`);
        }
    };

    return (
        <header>
            <nav>
                <span>Farmer App</span>
                <div className="search-bar">
                    <input
                        type="search"
                        name=""
                        id=""
                        placeholder='Search your products'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button type="button" onClick={handleSearch}><IoSearch /></button>
                </div>

                <div className="profile-info">
                    <FaUserCircle />
                    {data.sellerName}
                </div>
            </nav>
        </header>
    );
}
