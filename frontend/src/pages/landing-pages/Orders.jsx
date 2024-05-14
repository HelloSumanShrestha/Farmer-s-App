import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../../zustand/userInfo';
import "../../assets/css/orders.css"

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState({});
    const { customerId, isLoggedIn } = useStore();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            if (!isLoggedIn || !customerId) {
                navigate('/login');
                return;
            }

            try {
                const orderResponse = await fetch(`http://localhost:8000/sales/customer/${customerId}`);
                if (!orderResponse.ok) {
                    throw new Error('Failed to fetch orders');
                }
                const orderData = await orderResponse.json();
                setOrders(orderData);

                // Fetch product details for each order
                const productIds = orderData.map(order => order.productId);
                const productPromises = productIds.map(productId =>
                    fetch(`http://localhost:8000/products/${productId}`)
                        .then(response => response.json())
                );
                const productData = await Promise.all(productPromises);

                // Create a map of product IDs to product names
                const productMap = {};
                productData.forEach(product => {
                    productMap[product.productId] = product.productName;
                });
                setProducts(productMap);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, [isLoggedIn, customerId, navigate]);

    if (!orders.length) {
        return <div>No orders found.</div>;
    }

    return (
        <div className="orders-container">
            <table className="orders-table">
                <thead>
                    <tr>
                        <th>Order Number</th>
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th>Total Price</th>
                        <th>Order Date</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order.SalesNumber}>
                            <td>{order.SalesNumber}</td>
                            <td>{products[order.productId]}</td>
                            <td>{order.quantity}</td>
                            <td>Rs. {order.price}</td>
                            <td>{new Date(order.salesDate).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
