import React from 'react';
import "../css/Home.scss"
import testData from '../constant/product';

export default function Home({ products }) {
    return (
        <div className="home-container">
            <header>

                <p className="header-text">
                    Dashboard
                </p>

                <div className="header-user">
                    <div className="user-image">
                        <img src="" alt="pfp" />
                    </div>
                    <h3 className="header-username">
                        Username
                    </h3>
                </div>
            </header>

            <div className="home-main">

                {testData.items.map((product, index) => (

                    <div key={index} className="product-card">
                        <img src={product.img} alt={product.name} />

                        <h3>{product.name}</h3>

                        <p>{product.description}</p>

                        <span className="price">&#8377;{product.price}</span>

                        <span className="sold-quantity">Sold: {product.sold}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
