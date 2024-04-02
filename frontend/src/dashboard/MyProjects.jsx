import React, { useState } from 'react';

export default function AddProduct({ products, setProducts }) {

    const [productName, setProductName] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [productImage, setProductImage] = useState("");
    const [productQuantity, setProductQuantity] = useState(0);
    const [productPrice, setProductPrice] = useState(0);
    const [productNameError, setProductNameError] = useState("");
    const [productDescriptionError, setProductDescriptionError] = useState("");
    const [productImageError, setProductImageError] = useState("");
    const [productQuantityError, setProductQuantityError] = useState("");
    const [productPriceError, setProductPriceError] = useState("");

    const handleSubmit = () => {

        const newProduct = {
            name: productName,
            description: productDescription,
            imageUrl: productImage,
            quantity: productQuantity,
            price: productPrice,
        };

        setProducts([...products, newProduct]);

        setProductName("");
        setProductDescription("");
        setProductImage("");
        setProductQuantity(0);
        setProductPrice(0);
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
                        <label className="errorLabel">{productNameError}</label>

                        <label htmlFor="">Product Description</label>
                        <input placeholder='Enter product description' value={productDescription} onChange={(e) => setProductDescription(e.target.value)} />
                        <label className="errorLabel">{productDescriptionError}</label>

                        <label htmlFor="">Product Image URL</label>
                        <input type="text" placeholder='Enter product image URL' value={productImage} onChange={(e) => setProductImage(e.target.value)} />
                        <label className="errorLabel">{productImageError}</label>

                        <label htmlFor="">Product Quantity</label>
                        <input type="number" placeholder='Enter product quantity' value={productQuantity} onChange={(e) => setProductQuantity(e.target.value)} />
                        <label className="errorLabel">{productQuantityError}</label>

                        <label htmlFor="">Product Price</label>
                        <input type="number" placeholder='Enter product price' value={productPrice} onChange={(e) => setProductPrice(e.target.value)} />
                        <label className="errorLabel">{productPriceError}</label>
                    </div>
                    <div className="add-product-footer">
                        <button className='add-product-btn' onClick={handleSubmit}>Add Product</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
