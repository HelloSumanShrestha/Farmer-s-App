// MyProducts.jsx
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import AddProduct from '../components/add-product-popup/addProducts';
import ProductCard from '../components/product card/productCard';
import "../assets/css/MyProducts.scss";

export default function MyProducts({ products, setProducts }) {
    const [addBtnActive, setAddBtnActive] = useState(false);
    const [editProductId, setEditProductId] = useState(null);

    const userId = localStorage.getItem('userId');
    const location = useLocation();

    console.log(products)

    const handleEditProduct = (product) => {
        setEditProductId(product.product_id);
    };

    return (
        <div className="my-products-container">
            <button className="add-product-button" onClick={() => setAddBtnActive(true)}>Add Product</button>
            {addBtnActive && <AddProduct setProducts={setProducts} products={products} setAddBtnActive={setAddBtnActive} />}
            <div className="my-products-main">
                {products && products.map((product, index) => {
                    return <ProductCard product={product} key={index} />
                })}
            </div>
        </div>
    );
}
