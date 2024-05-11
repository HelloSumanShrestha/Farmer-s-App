import React, { } from 'react';
import { Button } from '@mui/material';
import CategoryCard from "../components/CategoryCard"
import { useNavigate } from 'react-router-dom';

import meat from "../assets/categories/meat.png";
import vegetables from "../assets/categories/vagetable.png";
import fruits from "../assets/categories/fruits.png";
import dairy from "../assets/categories/dairy.png";
import grains from "../assets/categories/grains.png";

import "../assets/css/PopularCategories.css";

export default function PopularCategories() {

    const categories = [
        { id: 0, name: 'Meat', img: meat, bgColor: '#FEF4EA' },
        { id: 1, name: 'Vegetables', img: vegetables, bgColor: '#ECECEC' },
        { id: 2, name: 'Fruits', img: fruits, bgColor: '#EAF5E3' },
        { id: 3, name: 'Dairy', img: dairy, bgColor: '#eaf4f4' },
        { id: 4, name: 'Frozen', img: grains, bgColor: '#FAF9D7', }
    ];


    const navigate = useNavigate();

    return (
        <div className='popular-categories'>

            <div className="categories-header">
                {/* Title */}
                <h2 className='categories-title'>
                    Popular Categories
                </h2>
                {/* See all Categories Btn */}
                <Button
                    size={'large'}
                    color='success'
                    variant='outlined'
                    onClick={() => navigate('/categories')}
                    sx={{ textTransform: 'capitalize' }}
                >
                    See All
                </Button>
            </div>

            {/* Categories */}
            <div className="categories-items">
                {categories && categories.map(category => (
                    <CategoryCard key={category.id} category={category} shadow={category.bgColor} />
                ))}
            </div>
        </div >
    );
}
