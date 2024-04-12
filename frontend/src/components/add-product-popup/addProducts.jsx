import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Cloudinary } from "@cloudinary/url-gen";
import 'react-toastify/dist/ReactToastify.css';
import "./AddProducts.scss"


export default function AddProduct({ products, setProducts, setAddBtnActive }) {
    const [formData, setFormData] = useState({
        productName: "",
        productCategory: "",
        productImage: null,
        productQuantity: 0,
        productPrice: 0,
        expiryDate: "",
        manufactureDate: ""
    });

    const handleChange = (e) => {
        const { name, value, type } = e.target;

        const val = type === 'file' ? e.target.files[0] : value;

        setFormData({ ...formData, [name]: val });
    };
    const cloudName = 'dmd6t24m3'

    const handleSubmit = async () => {
        const { productName, productCategory, productImage,
            productQuantity, productPrice, expiryDate,
            manufactureDate } = formData;

        if (!productName.trim() || !productCategory.trim() || !productImage || productQuantity <= 0 || productPrice <= 0 || !expiryDate || !manufactureDate) {
            return toast.error("Please fill up every field.");
        }

        // Upload image to Cloudinary
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

            // Create a new product with the received image URL and other data
            const newProductData = {
                seller_id: '174d1b39-c151-4d5e-8223-ab210f79ee47',
                price: productPrice,
                product_name: productName,
                category: productCategory,
                img_url: data.secure_url,
                expiry_date: expiryDate,
                manufacture_date: manufactureDate,
                quantity: productQuantity
            };

            // Send the new product data to your backend
            const addProductResponse = await fetch('http://localhost:8000/add_product', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newProductData),
            });

            if (!addProductResponse.ok) {
                throw new Error('Failed to add product');
            }

            const addedProductData = await addProductResponse.json();
            setProducts([...products, addedProductData]);
            setAddBtnActive(false);
            setFormData({
                productName: '',
                productCategory: '',
                productImage: null,
                productQuantity: 0,
                productPrice: 0,
                expiryDate: '',
                manufactureDate: '',
            });
            toast.success('Product added successfully');
        } catch (error) {
            console.error('Error:', error);
            toast.error('Failed to add product');
        }
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

                        <label htmlFor="expiryDate">Expiry Date</label>
                        <input type="date" name="expiryDate" value={formData.expiryDate} onChange={handleChange} />

                        <label htmlFor="manufactureDate">Manufacture Date</label>
                        <input type="date" name="manufactureDate" value={formData.manufactureDate} onChange={handleChange} />
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
