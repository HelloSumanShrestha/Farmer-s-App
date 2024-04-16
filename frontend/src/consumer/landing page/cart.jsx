import React, { useState } from 'react';
import './cart.css';

export default function Cart({ cartItems, resetCart }) {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  const handleCheckout = () => {
    // Implement checkout logic here
    setIsCheckingOut(true);
  };

  const handlePayment = () => {
    // Implement payment logic here
    if (!selectedPaymentMethod) {
      alert('Please select a payment method.');
      return;
    }

    // Perform payment processing based on the selected method
    switch (selectedPaymentMethod) {
      case 'creditCard':
        processCreditCardPayment();
        break;
      case 'Esewa':
        processEsewaPayment();
        break;
      default:
        alert('Unsupported payment method.');
    }
  };

  const processCreditCardPayment = () => {
    // Simulate credit card payment processing
    alert('Credit card payment successful!');
    resetCart();
    setIsCheckingOut(false);
  };

  const processEsewaPayment = () => {
    // Simulate Esewa payment processing
    alert('Esewa payment successful!');
    resetCart();
    setIsCheckingOut(false);
  };

  return (
    <div className="cart-container" id='#cart'>
      <h2>Shopping Cart</h2>
      <div className="cart-items">
        {cartItems.map((item, index) => (
          <div key={index} className="cart-item">
            <img src={item.image} alt={item.name} />
            <div>
              <h3>{item.name}</h3>
              <p>Price: Rs.{item.price}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <h3>Total: Rs.{totalPrice}</h3>
        {isCheckingOut ? (
          <div>
            <h4>Select Payment Method:</h4>
            <label>
              <input
                type="radio"
                value="creditCard"
                checked={selectedPaymentMethod === 'creditCard'}
                onChange={() => setSelectedPaymentMethod('creditCard')}
              />
              Credit Card
            </label>
            <label>
              <input
                type="radio"
                value="Esewa"
                checked={selectedPaymentMethod === 'Esewa'}
                onChange={() => setSelectedPaymentMethod('Esewa')}
              />
              Esewa
            </label>
            <button onClick={handlePayment}>Complete Payment</button>
          </div>
        ) : (
          <button onClick={handleCheckout}>Proceed to Checkout</button>
        )}
      </div>
    </div>
  );
}
