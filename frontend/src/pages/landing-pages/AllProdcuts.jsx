import React, { useEffect, useState } from 'react';
import '../../assets/css/Products.css';
import { useNavigate } from 'react-router-dom';

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const [sortType, setSortType] = useState('Sort by');

  const navigate = useNavigate();

  useEffect(() => {

    const dummyProducts = [
      {
        productName: 'Product 1',
        productImage: 'image_url_1',
        productPrice: 100,
        expiryDate: '2024-06-01',
      },
      {
        productName: 'Product 2',
        productImage: 'image_url_2',
        productPrice: 200,
        expiryDate: '2024-07-01',
      },
      {
        productName: 'Product 3',
        productImage: 'image_url_3',
        productPrice: 150,
        expiryDate: '2024-05-01',
      },
      {
        productName: 'Product 4',
        productImage: 'image_url_4',
        productPrice: 300,
        expiryDate: '2024-06-15',
      },
      {
        productName: 'Product 5',
        productImage: 'image_url_5',
        productPrice: 250,
        expiryDate: '2024-06-30',
      },
      {
        productName: 'Product 6',
        productImage: 'image_url_6',
        productPrice: 120,
        expiryDate: '2024-05-10',
      },
      {
        productName: 'Product 7',
        productImage: 'image_url_7',
        productPrice: 180,
        expiryDate: '2024-07-10',
      },
      {
        productName: 'Product 8',
        productImage: 'image_url_8',
        productPrice: 220,
        expiryDate: '2024-05-20',
      },
      {
        productName: 'Product 9',
        productImage: 'image_url_9',
        productPrice: 350,
        expiryDate: '2024-06-20',
      },
    ];

    let sortedProducts = [...dummyProducts];
    if (sortType === 'ascPrice') {
      sortedProducts = [...dummyProducts].sort((a, b) => a.productPrice - b.productPrice);
    } else if (sortType === 'descPrice') {
      sortedProducts = [...dummyProducts].sort((a, b) => b.productPrice - a.productPrice);
    } else if (sortType === 'expiryDate') {
      sortedProducts = [...dummyProducts].sort((a, b) => new Date(a.expiryDate) - new Date(b.expiryDate));
    }

    setProducts(sortedProducts);
  }, [sortType]);

  const handleSortChange = (e) => {
    setSortType(e.target.value);
    if (e.target.value !== 'Sort by') {
      e.target.value = 'Sort by';
    }
  };

  return (
    <div className="products">
      <div className="product-main">
        <h2>All Products</h2>
        <select value={sortType} onChange={handleSortChange}>
          <option disabled hidden>Sort by</option>
          <option value="ascPrice">Price Low to High</option>
          <option value="descPrice">Price High to Low</option>
          <option value="expiryDate">Expiry Date</option>
        </select>
      </div>

      <div className="products-items">
        {products &&
          products.map((product, index) => (
            <div key={index} className="product">
              <img src={product.productImage} alt={product.productName} />
              <div className="product-description">
                <p>{product.productName}</p>
                <span>Rs. {product.productPrice}</span>
                <span>Expiry Date: {product.expiryDate}</span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
