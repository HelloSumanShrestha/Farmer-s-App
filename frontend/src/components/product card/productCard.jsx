import React from 'react'
import "../../assets/css/ProductCard.scss"
export default function ProductCard({ product }) {
    return (
        <div className="product-card">
            <img src={product.img} alt={product.name} />

            <h3>{product.name}</h3>

            <p>{product.description}</p>

            <span className="price">Price : &#8377;{product.price}</span>

            <span className="sold-quantity">Sold units: {product.sold}</span>
            <span className="sold-quantity">Remaining units: {product.quantity - product.sold}</span>
        </div>
    )
}