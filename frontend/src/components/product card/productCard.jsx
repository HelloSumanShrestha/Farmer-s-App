import React, { useState } from 'react';
import '../../assets/css/ProductCard.scss';

export default function ProductCard({ product, onEdit }) {

    return (
        <div className="product-card">
            <img src={product["Img URL"]} alt={product["Product Name"]} />

            <h3>{product["Product Name"]}</h3>

            <p><strong>Category:</strong> {product["Category"]}</p>

            <span className="price">Price: &#8377;{product["Price"]}</span>

            {/* <span className="sold-quantity">Sold units: {product.sold}</span> */}
            <span className="sold-quantity">Remaining units: {product["Quantity"]}</span>
        </div>
    );
}