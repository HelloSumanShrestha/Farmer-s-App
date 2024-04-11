import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./AddProducts.scss"

export default function AddProduct({ products, setProducts, setAddBtnActive }) {
    const [formData, setFormData] = useState({
        productName: "",
        productCategory: "",
        productImage: null,
        productQuantity: 0,
        productPrice: 0
    });

    const handleChange = (e) => {
        const { name, value, type } = e.target;

        const val = type === 'file' ? e.target.files[0] : value;

        setFormData({ ...formData, [name]: val });
    };

    const handleSubmit = () => {
        const { productName, productCategory, productImage, productQuantity, productPrice } = formData;

        if (!productName.trim() || !productCategory.trim() || !productImage || productQuantity <= 0 || productPrice <= 0) {
            return toast.error("Please fill up every field.");
        }

        const reader = new FileReader();
        reader.onload = function (e) {
            const imageUrl = e.target.result;
            const newProduct = {
                name: productName,
                category: productCategory,
                imageUrl,
                quantity: productQuantity,
                price: productPrice
            };

            setProducts([...products, newProduct]);
            setAddBtnActive(false);

            setFormData({
                productName: "",
                productCategory: "",
                productImage: null,
                productQuantity: 0,
                productPrice: 0
            });

            toast.success('Product added successfully');
        };

        reader.readAsDataURL(productImage);
    };

    return (
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

                        {formData.productImage && (
                            <img src={URL.createObjectURL(formData.productImage)} alt="Product" style={{ maxWidth: '100%', marginTop: '10px' }} />
                        )}

                        <label htmlFor="productQuantity">Product Quantity</label>
                        <input type="number" name="productQuantity" placeholder='Enter product quantity' value={formData.productQuantity} onChange={handleChange} />

                        <label htmlFor="productPrice">Product Price</label>
                        <input type="number" name="productPrice" placeholder='Enter product price' value={formData.productPrice} onChange={handleChange} />
                    </div>
                    <div className="add-product-footer">
                        <button className='cancel-btn' onClick={() => setAddBtnActive(false)}>Cancel</button>
                        <button className='add-product-btn' onClick={handleSubmit}>Add Product</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
