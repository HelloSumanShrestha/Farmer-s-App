import React from 'react';
import ProductCard from '../components/product card/productCard';
import Header from "../components/Header/Header"
import "../assets/css/Home.scss"

export default function Home({ products }) {
    const userId = localStorage.getItem('userId');

    return (
        <div className="home-container">
            <Header headerText={"Dashboard"} />
            <div className="home-main">
                {products && products.map((product) => (
                    (product.seller_id === userId) && <ProductCard product={product} key={product.product_id} />
                ))}
            </div>
        </div>
    );
}
