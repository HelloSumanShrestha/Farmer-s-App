import React, { useEffect } from 'react';
import "../../assets/css/cart.css";
import { useState } from 'react';

export default function Cart({ cartItems = [], setCartItems }) {

    const [totalPrice, setTotalPrice] = useState(0)

    const handleRemoveItem = (productId) => {
        setCartItems(cartItems.filter(item => item.productId !== productId));
    };

    useEffect(() => {
        const newTotalPrice = cartItems.reduce((total, item) => total + item.productPrice * item.quantity, 0);
        setTotalPrice(newTotalPrice);
    }, [cartItems]);


    const incrementQuantity = (productId) => {
        const newCartItems = cartItems.map(item => {
            if (item.productId === productId) {
                return { ...item, productQuantity: item.productQuantity + 1 };
            }
            return item;
        });
        setCartItems(newCartItems);
    };

    const decrementQuantity = (productId) => {
        const newCartItems = cartItems.map(item => {
            if (item.productId === productId && item.productQuantity > 1) {
                return { ...item, productQuantity: item.productQuantity - 1 };
            }
            return item;
        });
        setCartItems(newCartItems);
    };


    return (
        <div className="cart">
            <h2>Your Shopping Cart</h2>
            {cartItems.length > 0 ? (
                <ul>
                    {cartItems.map(item => (
                        <li key={item.productId} className="cart-item">
                            <img src={item.productImage} alt={item.productName} className="cart-item-image" />
                            <div className="cart-item-info">
                                <h4>{item.productName}</h4>
                                <p>Rs.{item.productPrice}</p>
                                <div className="cart-item-quantity">
                                    <button onClick={() => decrementQuantity(item.productId)}>-</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => incrementQuantity(item.productId)}>+</button>
                                </div>
                                <button onClick={() => handleRemoveItem(item.productId)} className="remove-item">
                                    Remove
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Your cart is empty.</p>
            )}

            <p>Your Total price is Rs.{totalPrice}</p>
        </div>
    );
}
