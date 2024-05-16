import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useStore from "../zustand/userInfo"
import "../assets/css/addproduct.css"

const Edit = () => {
    const { sellerId } = useStore()
    const { productId } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        productName: '',
        productCategory: '',
        productPrice: '',
        productImage: '',
        productMake: '',
        productExpiry: '',
        productQuantity: 0,
        sold: 0
    });

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:8000/products/${productId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch product');
                }
                const data = await response.json();
                setFormData({
                    productName: data.productName,
                    productCategory: data.productCategory,
                    productPrice: data.productPrice,
                    productImage: data.productImage,
                    productMake: data.productMake,
                    productExpiry: data.productExpiry,
                    productQuantity: data.productQuantity,
                    sold: data.sold
                });
            } catch (error) {
                console.error(error);
            }
        };

        fetchProduct();
    }, [productId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async () => {
        const { productQuantity } = formData;

        if (!productQuantity || productQuantity <= 0) {
            return toast.error("Please enter a valid stock quantity.");
        }

        try {
            const updatedProductData = {
                sellerId: sellerId,
                productId: productId,
                productName: formData.productName,
                productCategory: formData.productCategory,
                productPrice: formData.productPrice,
                productMake: formData.productMake,
                productImage: formData.productImage,
                productExpiry: formData.productExpiry,
                productQuantity: formData.productQuantity,
                sold: formData.sold
            };

            const updateProductResponse = await fetch(`http://localhost:8000/products/${productId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedProductData),
            });

            if (!updateProductResponse.ok) {
                throw new Error('Failed to update product');
            }

            toast.success('Product updated successfully', { autoClose: 2000 });
            setTimeout(
                () => {

                    navigate('/products');
                }, 2000
            )
        } catch (error) {
            console.error(error);
            toast.error('Failed to update product');
        }
    };

    return (
        <>
            <div className="my-products">
                <ToastContainer autoClose={2000} />
                <div className="add-product-container">
                    <div className="add-product-form-container">
                        <div className="add-product-form">
                            <div className="add-product-header">
                                <p className='add-product-main-text'>Edit Product</p>
                            </div>
                            <div className="add-product-textfields">
                                <label htmlFor="productName">Product Name</label>
                                <input type="text" name="productName" value={formData.productName} readOnly />

                                <label htmlFor="productCategory">Product Category</label>
                                <input type="text" name="productCategory" value={formData.productCategory} readOnly />

                                <label htmlFor="productPrice">Product Price</label>
                                <input type="text" name="productPrice" value={formData.productPrice} readOnly />

                                <label htmlFor="productMake">Manufacture Date</label>
                                <input type="text" name="productMake" value={formData.productMake} readOnly />

                                <label htmlFor="productExpiry">Expiry Date</label>
                                <input type="text" name="productExpiry" value={formData.productExpiry} readOnly />

                                <label htmlFor="productQuantity">Stock Quantity</label>
                                <input type="number" name="productQuantity" placeholder='Enter stock quantity' value={formData.productQuantity} onChange={handleChange} />
                            </div>
                            <div className="add-product-footer">
                                <button className='add-product-btn' onClick={handleSubmit}>Save Changes</button>
                                <button className='cancel-edit-btn' onClick={() => navigate("/products")}>Cancel</button >
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Edit;