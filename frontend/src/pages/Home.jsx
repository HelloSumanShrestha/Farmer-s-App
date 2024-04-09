import React from 'react';
import ProductCard from '../components/product card/productCard';
import Header from "../components/Header/Header"
import "../assets/css/Home.scss"

export default function Home({ products }) {
    return (
        <div className="home-container">

            <Header headerText={"Dashboard"} />
            <div className="home-main">

                {products && products.map((product, index) => (

                    <ProductCard product={product} key={index} />
                ))}
            </div>
        </div>
    );
}


