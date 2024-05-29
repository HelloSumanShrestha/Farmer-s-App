import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "../assets/css/productsOnDetail.css";
import useStore from '../zustand/userInfo';

const ProductOnDetail = ({ cartItems, setCartItems }) => {
    const { isLoggedIn } = useStore();
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [quantityInCart, setQuantityInCart] = useState(0);
    const [stock, setStock] = useState(0);
    const [loading, setLoading] = useState(true);
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
                setStock(data.productQuantity);
                const existingCartItem = cartItems.find(item => item.productId === data.productId);
                if (existingCartItem) {
                    setQuantityInCart(existingCartItem.quantity);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();

        return () => {
            setProduct(null);
            setQuantityInCart(0);
            setStock(0);
        };
    }, [productId, cartItems]);

    const handleAddToCart = () => {
        if (!isLoggedIn) {
            navigate("/login");
            return;
        }

        if (stock > 0 && quantityInCart > 0) {
            const updatedCart = [...cartItems];
            const foundIndex = updatedCart.findIndex(item => item.productId === product.productId);
            if (foundIndex !== -1) {
                updatedCart[foundIndex].quantity += quantityInCart;
            } else {
                updatedCart.push({ ...product, quantity: quantityInCart });
            }
            setCartItems(updatedCart);
            setStock(stock - quantityInCart);
            setQuantityInCart(0);
        }
    };

    const handleQuantityChange = (amount) => {
        const newQuantity = quantityInCart + amount;
        if (newQuantity >= 0 && newQuantity <= stock) {
            setQuantityInCart(newQuantity);
        }
    };

    const handleBuy = () => {
        if (!isLoggedIn) {
            navigate("/login");
            return;
        }

        if (quantityInCart > 0 && quantityInCart <= stock) {
            navigate('/payment-method', {
                state: {
                    product,
                    quantity: quantityInCart
                }
            });
        }
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
                <p className="product-stock">In Stock: {stock <= 0 ? <span>Out of Stock</span> : stock} </p>
                <p className="product-expiry">Valid until: {productExpiry}</p>

                <div className="quantity-control">
                    <p>Quantity: </p>
                    <button className="quantity-btn" onClick={() => handleQuantityChange(-1)}>-</button>
                    <span className="quantity">{quantityInCart}</span>
                    <button className="quantity-btn" onClick={() => handleQuantityChange(1)}>+</button>
                </div>

                <div className="action-buttons">
                    <button className="buy-btn" onClick={handleBuy} disabled={stock === 0}>Buy</button>
                    <button className="cart-btn" onClick={handleAddToCart} disabled={quantityInCart === 0}>Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default ProductOnDetail;
