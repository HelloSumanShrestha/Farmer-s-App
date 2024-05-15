import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useStore from "../zustand/userInfo"
import "../assets/css/addproduct.css"

export default function AddProduct({ setAddState }) {
    const { sellerId } = useStore()

    const [formData, setFormData] = useState({
        productName: "",
        productCategory: "",
        productImage: null,
        productQuantity: 0,
        productPrice: 0,
        productMake: "",
        productExpiry: ""
    });

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        const val = type === 'file' ? e.target.files[0] : value;
        setFormData({ ...formData, [name]: val });
    };

    const cloudName = 'dmd6t24m3';

    const handleSubmit = async () => {
        const { productName, productCategory, productImage, productQuantity, productPrice, productMake, productExpiry } = formData;

        if (!productName.trim() || !productCategory.trim() || !productImage || productQuantity <= 0 || productPrice <= 0 || !productMake || !productExpiry) {
            return toast.error("Please fill up every field.");
        }

        const formDataToSend = new FormData();
        formDataToSend.append('file', productImage);
        formDataToSend.append('upload_preset', 'ml_default');

        try {
            const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
                method: 'POST',
                body: formDataToSend,
            });

            const data = await response.json();
            console.log(data.secure_url);

            const newProductData = {
                productId: 0,
                productName,
                productQuantity,
                productImage: data.secure_url,
                productPrice,
                productMake,
                productExpiry,
                productCategory,
                sellerId: sellerId,
                sold: 0
            };

            const addProductResponse = await fetch('http://localhost:8000/products/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newProductData),
            });

            toast.success('Product added successfully', { autoClose: 500 });
            setTimeout(() => {
                setAddState(false);
            }, 2000);

            setFormData({
                productName: '',
                productCategory: '',
                productImage: null,
                productQuantity: 0,
                productPrice: 0,
                productMake: '',
                productExpiry: ''
            });
        } catch (error) {
            console.error('Error:', error);
            toast.error('Failed to add product');
        }
    };

    return (
        <>
            <div className="my-products">

                <ToastContainer autoClose={500} />
                <div className="add-product-container">
                    <div className="add-product-form-container">
                        <div className="add-product-form">
                            <div className="add-product-header">
                                <p className='add-product-main-text'>Add New Product</p>
                            </div>
                            <div className="add-product-textfields">
                                <label htmlFor="productName">Product Name</label>
                                <input type="text" name="productName" placeholder='Enter product name' value={formData.productName} onChange={handleChange} />

                                <label htmlFor="productCategory">Product Category</label>
                                <input type="text" name="productCategory" placeholder='Enter product category' value={formData.productCategory} onChange={handleChange} />

                                <label htmlFor="productImage">Product Image</label>
                                <input type="file" accept="image/*" name="productImage" onChange={handleChange} />


                                <label htmlFor="productQuantity">Product Quantity</label>
                                <input type="number" name="productQuantity" placeholder='Enter product quantity' value={formData.productQuantity} onChange={handleChange} />

                                <label htmlFor="productPrice">Product Price</label>
                                <input type="number" name="productPrice" placeholder='Enter product price' value={formData.productPrice} onChange={handleChange} />

                                <label htmlFor="productMake">Manufacture Date</label>
                                <input type="date" name="productMake" value={formData.productMake} onChange={handleChange} />

                                <label htmlFor="productExpiry">Expiry Date</label>
                                <input type="date" name="productExpiry" value={formData.productExpiry} onChange={handleChange} />
                            </div>
                            <div className="add-product-footer">
                                <button className='cancel-btn' onClick={() => setAddState(false)}>Cancel</button>
                                <button className='add-product-btn' onClick={handleSubmit}>Add Product</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
