import React, { useEffect, useState } from 'react'
import '../assets/css/Products.css'
import { useNavigate } from 'react-router-dom';
import useStore from '../zustand/userInfo';

export default function Products() {

    const navigate = useNavigate();

    const products = useStore(state => state.products);

    const handleClick = () => {
        navigate("/products")
    }

    const handleProductView = (product) => {
        console.log(product.productId);
        navigate(`/products/${product.productId}`);
    };

    return (
        <div className="products">

            <div className="product-main">
                <h2>All Products</h2>
                <button onClick={handleClick}>
                    Show All
                </button>
            </div>

            <div className="products-items">

                {products && products.slice(0, 5).map((product) => (
                    <div key={product.productId} className="product" onClick={() => handleProductView(product)}>
                        <img src={product.productImage} alt="" />
                        <div className="product-description">
                            <p>{product.productName}</p>
                            <span>Rs. {product.productPrice}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div >
    )
}
