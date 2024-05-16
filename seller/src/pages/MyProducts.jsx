import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../assets/css/myproduct.css";
import useStore from "../zustand/userInfo";
import AddProduct from '../components/AddProduct';
import { useNavigate } from 'react-router-dom';

export default function MyProducts() {
    const { sellerId } = useStore();
    const [sellerProducts, setSellerProducts] = useState([]);
    const [addState, setAddState] = useState(false);
    const navigate = useNavigate();

    const fetchSellerProducts = async () => {
        try {
            const response = await fetch(`http://localhost:8000/products/seller/${sellerId}`);
            if (response.ok) {
                const products = await response.json();
                setSellerProducts(products);
            } else {
                throw new Error("Failed to fetch products");
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Failed to fetch products');
        }
    };

    useEffect(() => {
        fetchSellerProducts();
    }, [sellerId]);

    const handleProductView = (product) => {
        navigate("/products/" + product.productId);
    };

    return (
        <>
            <div className="my-products">
                <ToastContainer autoClose={500} />
                {addState && <AddProduct setAddState={setAddState} />}
                <div className="seller-products">
                    <div className="seller-products-header">
                        <h2>My Products</h2>
                        <button onClick={() => setAddState(true)}>Add Product</button>
                    </div>
                    <ul>
                        {sellerProducts.map(i => (
                            <div className="product" key={i.productId} onClick={() => handleProductView(i)}>
                                <img src={i.productImage} alt="" />
                                <div className="product-description">
                                    <p>{i.productName}</p>
                                    <span>Rs. {i.productPrice}</span>
                                </div>
                            </div>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}
