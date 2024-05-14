import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useStore from '../../zustand/userInfo';

export default function Buy() {
    const location = useLocation();
    const navigate = useNavigate();
    const { customerId } = useStore();

    const { product, quantity } = location.state || {};

    useEffect(() => {
        const createSale = async () => {
            if (!product || !quantity) return;

            const sale = {
                SalesNumber: 0,
                sellerId: product.sellerId,
                customerId: customerId,
                quantity: quantity,
                salesDate: new Date().toISOString(),
                price: product.productPrice,
                productId: product.productId,
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

        createSale();
    }, [product, quantity, customerId, navigate]);

    return (
        <div>
            <ToastContainer />
            <p>Processing your purchase...</p>
        </div>
    );
}
