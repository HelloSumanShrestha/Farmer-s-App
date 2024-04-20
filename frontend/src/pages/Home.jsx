import React from 'react';
import ProductCard from '../components/product card/productCard';
import "../assets/css/Home.scss"

export default function Home({ products }) {
    const userId = localStorage.getItem('userId');

    return (
        <div className="home-container">
            <div className="home-main">
                {products && products.map((product, index) => {
                    return <ProductCard product={product} key={index} />
                })}
            </div>
        </div>
    );
}
