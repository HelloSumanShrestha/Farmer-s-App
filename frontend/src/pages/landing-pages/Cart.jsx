import React, { useEffect } from 'react';
import "../../assets/css/cart.css";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Cart({ cartItems = [], setCartItems }) {

    const [totalPrice, setTotalPrice] = useState(0)

    const navigate = useNavigate();


    const handleRemoveItem = (productId) => {
        setCartItems(cartItems.filter(item => item.productId !== productId));
    };

    useEffect(() => {
        const newTotalPrice = cartItems.reduce((total, item) => total + item.productPrice * item.quantity, 0);
        setTotalPrice(newTotalPrice);
    }, [cartItems]);


    const handleShopping = () => {
        navigate("/products")
    }


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
            {cartItems.length > 0 ? (
                <ul>
                    {cartItems.map(item => (
                        <li key={item.productId} className="cart-item">
                            <img src={item.productImage} alt={item.productName} className="cart-item-image" />

                            <div className="cart-item-info">

                                <h2>{item.productName}</h2>
                                <p>Rs.{item.productPrice}</p>
                                <p>Quantity : {item.productQuantity}</p>

                                <button onClick={() => handleRemoveItem(item.productId)} className="remove-item">
                                    Remove
                                </button>

                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className='information'>
                    <p>
                        There is no items in the cart.
                    </p>
                    <button onClick={handleShopping}>Continue Shopping</button>
                </div>
            )}

            {
                cartItems.length > 0 && <>
                    <div className="checkout">
                        <p>Total Amount : <strong>Rs. {totalPrice}</strong></p>
                        {/* <button onClick={alert("")}>
                            Buy
                        </button> */}
                    </div>
                </>
            }
        </div>
    );
}
