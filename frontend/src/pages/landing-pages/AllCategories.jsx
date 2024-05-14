import React, { } from 'react';
import { Button } from '@mui/material';
import CategoryCard from "../../components/CategoryCard"
import { useNavigate } from 'react-router-dom';

import meat from "../../assets/categories/meat.png";
import vegetables from "../../assets/categories/vagetable.png";
import fruits from "../../assets/categories/fruits.png";
import dairy from "../../assets/categories/dairy.png";
import grains from "../../assets/categories/grains.png";

import "../../assets/css/PopularCategories.css";

export default function AllCategories() {

    const categories = [
        { id: 0, name: 'Meat', img: meat, bgColor: '#FEF4EA' },
        { id: 1, name: 'Vegetables', img: vegetables, bgColor: '#ECECEC' },
        { id: 2, name: 'Fruits', img: fruits, bgColor: '#EAF5E3' },
        { id: 3, name: 'Dairy', img: dairy, bgColor: '#eaf4f4' },
        { id: 4, name: 'Frozen', img: grains, bgColor: '#FAF9D7', }
    ];


    const navigate = useNavigate();

    return (
        <div className='all-categories'>

            <div className="categories-header">
                <h2 className='categories-title'>
                    All Categories
                </h2>

            </div>

            {/* Categories */}
            <div className="categories-items">
                {categories && categories.map(category => (
                    <CategoryCard key={category.id} category={category} shadow={category.bgColor} />
                ))}
            </div>
            
            {/* Footer */}
            <div className="footer">
                <div className="logo">
                    <span className="sajha">SAJHA</span> <span className="baari">BAARI</span>
                </div>
                <div className="contact-info">
                    <h3>Contact Us</h3>
                    <p>Email: contact@sajhabaari.com.np</p>
                    <p>Phone: +977 9840753049</p>
                    <p>Address: Naxal, Kathmandu, Nepal</p>
                </div>
                <div className="helps">
                    <h3>Helps</h3>
                    <ul>
                        <li><a href="#">FAQs</a></li>
                        <li><a href="#">Terms and Conditions</a></li>
                        <li><a href="#">Privacy Policy</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );        
}
