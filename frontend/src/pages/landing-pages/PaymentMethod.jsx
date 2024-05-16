import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useStore from '../../zustand/userInfo';
import "../../assets/css/paymentmethod.css"

export default function PaymentMethod() {
    const location = useLocation();
    const navigate = useNavigate();
    const { customerId, isLoggedIn } = useStore();
    const [paymentMethod, setPaymentMethod] = useState('');

    const { product, quantity } = location.state || {};

    if (!isLoggedIn) {
        navigate("/login")
    }

    const handleProceedOrder = async () => {
        if (!product || !quantity || !paymentMethod) {
            toast.error("Please select a payment method!");
            return;
        }

        const sale = {
            SalesNumber: 0,
            sellerId: product.sellerId,
            customerId: customerId,
            quantity: quantity,
            salesDate: new Date().toISOString(),
            price: product.productPrice,
            productId: product.productId,
            paymentMethod: paymentMethod,
        };

        console.log(sale);

        try {
            const response = await fetch('http://localhost:8000/sales/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(sale),
            });

            if (response.ok) {
                toast.success("Purchase Successful!", { autoClose: 1000 });
                setTimeout(() => {
                    navigate('/orders');
                }, 2000);
            } else {
                const errorData = await response.json();
                toast.error(errorData.detail || "Purchase failed!");
                console.error('Purchase failed:', errorData);
            }
        } catch (error) {
            toast.error("An error occurred while making the purchase!");
            console.error('Error making purchase:', error);
        }
    };

    const handlePaymentMethodChange = (e) => {
        setPaymentMethod(e.target.value);
    };

    return (
        <div className="payment-method-container">
            <ToastContainer className="toast-container" />
            <h2>Select Payment Method</h2>
            {product && (
                <div className="payment-details">
                    <table>
                        <tbody>
                            <tr>
                                <td>Product Name:</td>
                                <td>{product.productName}</td>
                            </tr>
                            <tr>
                                <td>Price per Unit:</td>
                                <td>Rs. {product.productPrice}</td>
                            </tr>
                            <tr>
                                <td>Quantity:</td>
                                <td>{quantity}</td>
                            </tr>
                            <tr>
                                <td>Total Price:</td>
                                <td>Rs. {product.productPrice * quantity}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
            <div>
                <label htmlFor="paymentMethod">Payment Method:</label>
                <select id="paymentMethod" value={paymentMethod} onChange={handlePaymentMethodChange}>
                    <option value="">Select a payment method</option>
                    <option value="credit_card">Credit Card</option>
                    <option value="debit_card">Debit Card</option>
                    <option value="paypal">PayPal</option>
                    <option value="cash_on_delivery">Cash on Delivery</option>
                </select>
            </div>
            <div>
                <button onClick={handleProceedOrder}>Proceed to Order</button>
            </div>
        </div>
    );
}
