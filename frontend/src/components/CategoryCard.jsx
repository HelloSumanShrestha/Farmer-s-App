import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../assets/css/CategoryCard.css"

const CategoryCard = ({ category, shadow }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/categories/${category.name.toLowerCase()}`);
    };

    return (
        <div
            className='category-card'
            onClick={handleClick}

            style={{ backgroundColor: shadow }}
        >
            <img
                className='category-img'
                src={category.img}
                loading='lazy'
                alt={category.name} />

            <div className='category-info'>
                {/* Name */}
                <h3 className='category-name'>
                    {category.name}
                </h3>
            </div>
        </div >
    );
};

export default CategoryCard;
