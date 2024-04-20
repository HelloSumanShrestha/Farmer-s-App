import React, { useEffect, useState } from 'react';
import './products.css';

export default function Products() {
  const [productsData, setProductsData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/seller_products/6d3a7d72-2109-4b52-bd6d-c5bed0b15ed6")
      .then(res => res.json())
      .then(data => setProductsData(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const renderProductCards = () => {
    return productsData.map(product => (
      <div key={product["Product ID"]} className="product-card">
        <img src={product["Img URL"]} alt={product["Product Name"]} />
        <h3>{product["Product Name"]}</h3>
        <p><strong>Category:</strong> {product["Category"]}</p>
        <span className="price">Price: &#8377;{product["Price"]}</span>
        <span className="sold-quantity">Remaining units: {product["Quantity"]}</span>
        <button>Add to Cart</button>
      </div>
    ));
  };

  return (
    <div className="products-container" id='products'>
      <h2>Our Best Sellers</h2>
      <div className="product-list">
        {renderProductCards()}
      </div>

      <h2>Featured Products</h2>
      <div className="product-list">
        {renderProductCards()}
      </div>
    </div>
  );
}
