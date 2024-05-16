import React, { useEffect, useState } from 'react';
import '../../assets/css/Products.css';
import { useNavigate } from 'react-router-dom';
import useStore from '../../zustand/userInfo';

export default function AllProducts() {
  const [sortType, setSortType] = useState('Sort by');
  const navigate = useNavigate();
  const products = useStore(state => state.products);

  const handleSortChange = (e) => {
    setSortType(e.target.value);
  };

  const sortProducts = (type) => {
    let sortedProducts = [...products];
    if (type === 'ascPrice') {
      sortedProducts.sort((a, b) => a.productPrice - b.productPrice);
    } else if (type === 'descPrice') {
      sortedProducts.sort((a, b) => b.productPrice - a.productPrice);
    } else if (type === 'expiryDate') {
      sortedProducts.sort((a, b) => new Date(a.productExpiry) - new Date(b.productExpiry));
    }
    return sortedProducts;
  };

  useEffect(() => {
    if (sortType !== 'Sort by') {
      const sortedProducts = sortProducts(sortType);
      useStore.setState({ products: sortedProducts });
    }
  }, [sortType]);

  const handleProductView = (product) => {
    navigate(`/products/${product.productId}`);
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
          products.map((product) => (
            <div key={product.productId} className="product" onClick={() => handleProductView(product)}>
              <img src={product.productImage} alt={product.productName} />
              <div className="product-description">
                <p>{product.productName}</p>
                <span>Rs. {product.productPrice}</span>
                <span>Expiry Date: {new Date(product.productExpiry).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
