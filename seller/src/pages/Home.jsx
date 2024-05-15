import React, { useEffect, useState } from 'react';
import '../assets/css/Home.css';
import useStore from '../zustand/userInfo';

const Metric = ({ title, value, bg }) => (
    <div className="metric" style={{ background: bg }}>
        <p>{title}</p>
        <h3>{value}</h3>
    </div>
);

const Home = () => {
    const { sellerId } = useStore();
    const [summary, setSummary] = useState({ total_sales: 0, total_products: 0 });
    const [recentProducts, setRecentProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const summaryResponse = await fetch(`http://localhost:8000/sales/summary/${sellerId}`);
                const summaryData = await summaryResponse.json();
                setSummary(summaryData);

                const recentProductsResponse = await fetch(`http://localhost:8000/sales/seller/${sellerId}`);
                const recentProductsData = await recentProductsResponse.json();
                setRecentProducts(recentProductsData);
                console.log(recentProductsData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [sellerId]);

    return (
        <div className="dashboard">
            <div className="information">

                <Metric title="Total Sales" value={`Rs. ${summary.total_sales}`} />
                <Metric title="Total Products Sold" value={summary.total_products} bg={"#FFFCF5"} />
                <Metric title="Total Orders" value={recentProducts.length} bg={"#FDF8FF"} />
            </div>

            <div className="recent-products">
                <h3>Recent Orders</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Sales Number</th>
                            <th>Product Id</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Sales Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentProducts.map((product, index) => (
                            <tr key={index}>
                                <td>{product.SalesNumber}</td>
                                <td>{product.productId}</td>
                                <td>Rs.{product.price}</td>
                                <td>{product.quantity}</td>
                                <td>{new Date(product.salesDate).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Home;
