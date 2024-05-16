import React, { useEffect, useState } from 'react'
import "../../assets/css/Products.css"
import { useNavigate } from 'react-router-dom';
import useStore from '../../zustand/userInfo';
import Footer from '../landing-pages/Footer';

export default function AllProducts() {
    const products = useStore(state => state.products);

    const navigate = useNavigate();

    const handleProductView = (product) => {
        navigate(`/products/${product.productId}`);
    };

    return (
        <div className="products">

            <div className="product-main">
                <h2>All Products</h2>
            </div>

            <div className="products-items">

                {products && products.map(i => {
                    return <>
                        <div className="product" onClick={() => handleProductView(i)}>
                            <img src={i.productImage} alt="" />
                            <div className="product-description">
                                <p>{i.productName}</p>
                                <span>Rs. {i.productPrice}</span>
                            </div>
                        </div>
                    </>
                })}
            </div>
        </div> 
    )
}
