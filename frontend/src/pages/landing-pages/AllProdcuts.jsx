import React, { useEffect, useState } from 'react'
import "../../assets/css/Products.css"
import { useNavigate } from 'react-router-dom';

export default function AllProducts() {

    const [products, setProducts] = useState()

    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:8000/products")
            .then(res => res.json())
            .then(data => setProducts(data))
    },
        [])

    return (
        <div className="products">

            <div className="product-main">
                <h2>All Products</h2>
            </div>

            <div className="products-items">

                {products && products.map(i => {
                    return <>
                        <div className="product">
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
