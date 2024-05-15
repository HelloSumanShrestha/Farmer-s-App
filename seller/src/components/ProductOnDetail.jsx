import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "../assets/css/ProductOnDetail.css";
import useStore from '../zustand/userInfo';

const ProductOnDetail = () => {
    const { isLoggedIn } = useStore();
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:8000/products/${productId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch product');
                }
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();

        return () => {
            setProduct(null);
        };
    }, [productId]);

    const handleDelete = async () => {
        if (!isLoggedIn) {
            navigate("/login");
            return;
        }

        try {
            const response = await fetch(`http://localhost:8000/products/${productId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete product');
            }
            navigate('/products');
        } catch (error) {
            console.error(error);
        }
    };

    const handleUpdate = () => {
        if (!isLoggedIn) {
            navigate("/login");
            return;
        }

        navigate(`/edit/${productId}`);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!product) {
        return <div>Product not found</div>;
    }

    const { productName, productImage, productPrice, productExpiry } = product;

    return (
        <div className="product-card">
            <div className="product-image">
                <img src={productImage} alt={productName} />
            </div>

            <div className="product-details">
                <h3 className="product-name">{productName}</h3>
                <p className="product-price">Rs. {productPrice}</p>
                <p className="product-expiry">Valid until: {productExpiry}</p>

                <div className="action-buttons">
                    <button className="update-btn" onClick={handleUpdate}>Update</button>
                    <button className="delete-btn" onClick={() => setShowDeleteConfirmation(true)}>Delete</button>
                </div>
            </div>

            {showDeleteConfirmation && (
                <div className="delete-confirmation-modal">
                    <div className="delete-confirmation">
                        <p>Are you sure you want to delete this product?</p>
                        <div className="btn-collection">
                            <button className="confirm-btn" onClick={handleDelete}>Yes</button>
                            <button className="cancel-btn" onClick={() => setShowDeleteConfirmation(false)}>No</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductOnDetail;
