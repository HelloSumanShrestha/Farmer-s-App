import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddProduct({ products, setProducts, setAddBtnActive }) {
    const [productName, setProductName] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [productImage, setProductImage] = useState("");
    const [productQuantity, setProductQuantity] = useState(0);
    const [productPrice, setProductPrice] = useState(0);

    const handleSubmit = () => {
        const emptyInputs = [];

        if (!productName.trim()) {
            emptyInputs.push('product name');
        }
        if (!productDescription.trim()) {
            emptyInputs.push('product description');
        }
        if (!productImage.trim()) {
            emptyInputs.push('product image URL');
        }
        if (productQuantity <= 0) {
            emptyInputs.push('product quantity');
        }
        if (productPrice <= 0) {
            emptyInputs.push('product price');
        }

        if (emptyInputs.length > 0) {
            const errorMessage = `Please fill up every fields.`;
            return toast.error(errorMessage);
        }

        const newProduct = {
            name: productName,
            description: productDescription,
            imageUrl: productImage,
            quantity: productQuantity,
            price: productPrice,
        };

        setProducts([...products, newProduct]);

        setAddBtnActive(false);

        setProductName("");
        setProductDescription("");
        setProductImage("");
        setProductQuantity(0);
        setProductPrice(0);

        toast.success('Product added successfully');
    };


    return (
        <div className="add-product-container">
            <div className="add-product-form-container">
                <div className="add-product-form">
                    <div className="add-product-header">
                        <p className='add-product-main-text'>Add New Product</p>
                    </div>
                    <div className="add-product-textfields">
                        <label htmlFor="">Product Name</label>
                        <input type="text" placeholder='Enter product name' value={productName} onChange={(e) => setProductName(e.target.value)} />

                        <label htmlFor="">Product Description</label>
                        <input placeholder='Enter product description' value={productDescription} onChange={(e) => setProductDescription(e.target.value)} />

                        <label htmlFor="">Product Image URL</label>
                        <input type="text" placeholder='Enter product image URL' value={productImage} onChange={(e) => setProductImage(e.target.value)} />

                        <label htmlFor="">Product Quantity</label>
                        <input type="number" placeholder='Enter product quantity' value={productQuantity} onChange={(e) => setProductQuantity(e.target.value)} />

                        <label htmlFor="">Product Price</label>
                        <input type="number" placeholder='Enter product price' value={productPrice} onChange={(e) => setProductPrice(e.target.value)} />
                    </div>
                    <div className="add-product-footer">
                        <button className='add-product-btn' onClick={handleSubmit}>Add Product</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
