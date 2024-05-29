import React, { useEffect } from 'react';
import "../../assets/css/cart.css";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Cart({ cartItems = [], setCartItems }) {
    const [totalPrice, setTotalPrice] = useState(0);
    const navigate = useNavigate();

    const handleRemoveItem = (productId) => {
        setCartItems(cartItems.filter(item => item.productId !== productId));
    };

    useEffect(() => {
        const newTotalPrice = cartItems.reduce((total, item) => total + item.productPrice * item.quantity, 0);
        setTotalPrice(newTotalPrice);
    }, [cartItems]);

    const handleShopping = () => {
        navigate("/products");
    };

    const handleProceedToPayment = (product) => {
        handleRemoveItem(product.productId);
        navigate("/payment-method", {
            state: {
                product: product,
                quantity: product.quantity
            }
        });
    };

    return (
        <div className="cart">
            {cartItems.length > 0 ? (
                <ul>
                    {cartItems.map(item => (
                        <li key={item.productId} className="cart-item">
                            <img src={item.productImage} alt={item.productName} className="cart-item-image" onClick={() => handleProceedToPayment(item)} />
                            <div className="cart-item-info">
                                <h2>{item.productName}</h2>
                                <p>Rs. {item.productPrice}</p>
                                <p>Quantity: {item.quantity}</p>
                                <button onClick={() => handleRemoveItem(item.productId)} className="remove-item">Remove</button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className='information'>
                    <p>There are no items in the cart.</p>
                    <button onClick={handleShopping}>Continue Shopping</button>
                </div>
            )}
            {cartItems.length > 0 && (
                <div className="checkout">
                    <p>Total Amount: <strong>Rs. {totalPrice}</strong></p>
                </div>
            )}
        </div>
    );
}
