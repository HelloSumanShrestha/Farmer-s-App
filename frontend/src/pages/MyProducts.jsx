import React, { useState } from 'react';
import AddProduct from '../components/add-product-popup/addProducts';
import ProductCard from '../components/product card/productCard';
import Header from '../components/Header/Header';
import "../assets/css/MyProducts.scss";

export default function MyProducts({ products, setProducts }) {
    const [addBtnActive, setAddBtnActive] = useState(false);
    return (
        <div className="my-products-container">
            <Header headerText={"My Products"} />
            <button className="add-product-button" onClick={() => setAddBtnActive(true)}>Add Product</button>
            {addBtnActive && <AddProduct setProducts={setProducts} products={products} setAddBtnActive={setAddBtnActive} />}
            <div className="my-products-main">
                {products && products.map((product, index) => (
                    <ProductCard product={product} key={index} />
                ))}
            </div>
        </div>
    );
}
