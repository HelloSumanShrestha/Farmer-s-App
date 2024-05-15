import React, { useEffect, useState } from 'react';
import useStore from '../zustand/userInfo';
import "../assets/css/Orders.css"

export default function Orders() {
    const [sales, setSales] = useState([]);
    const [products, setProducts] = useState({});
    const { sellerId } = useStore();

    useEffect(() => {
        async function fetchSales() {
            try {
                const response = await fetch(`http://localhost:8000/sales/seller/${sellerId}`);
                if (response.ok) {
                    const salesData = await response.json();
                    setSales(salesData);
                } else {
                    console.error('Failed to fetch sales');
                }
            } catch (error) {
                console.error('Error fetching sales:', error);
            }
        }

        if (sellerId) {
            fetchSales();
        }
    }, [sellerId]);

    useEffect(() => {
        async function fetchProductDetails(productId) {
            try {
                const response = await fetch(`http://localhost:8000/products/${productId}`);
                if (response.ok) {
                    const productData = await response.json();
                    setProducts(prevProducts => ({
                        ...prevProducts,
                        [productId]: productData
                    }));
                } else {
                    console.error(`Failed to fetch product details for ID: ${productId}`);
                }
            } catch (error) {
                console.error(`Error fetching product details for ID: ${productId}`, error);
            }
        }

        sales.forEach(sale => {
            if (!products[sale.productId]) {
                fetchProductDetails(sale.productId);
            }
        });
    }, [sales, products]);

    return (
        <div className='orders'>
            <h1>My Orders</h1>
            {sales.length === 0 ? (
                <p>No sales found.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sales.map((sale) => (
                            <tr key={sale.id}>
                                <td>{products[sale.productId]?.productName || 'Loading...'}</td>
                                <td>{sale.quantity}</td>
                                <td>{sale.price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
