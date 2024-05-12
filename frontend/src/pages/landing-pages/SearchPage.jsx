import React, { useEffect, useState } from 'react';
import "../../assets/css/Products.css";
import { useNavigate, useParams } from 'react-router-dom';

export default function SearchPage() {
    const { query } = useParams();
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    console.log(query);

    useEffect(() => {
        fetch(`http://localhost:8000/products/search/${query}`)
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(error => {
                console.error("Error fetching products:", error);
            });
    }, [query]);

    const handleClick = () => {
        navigate("/products");
    };

    return (
        <div className="products">
            <div className="product-main">
                <h2>Search Results for "{query}"</h2>
                <button onClick={handleClick}>Show All</button>
            </div>

            <div className="products-items">
                {products && products.map(i => (
                    <div className="product" key={i.productId}>
                        <img src={i.productImage} alt="" />
                        <div className="product-description">
                            <p>{i.productName}</p>
                            <span>Rs. {i.productPrice}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
