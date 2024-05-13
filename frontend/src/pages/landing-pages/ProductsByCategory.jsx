import React, { useEffect, useState } from 'react'
import "../../assets/css/Products.css"
import { useNavigate, useParams } from 'react-router-dom';

export default function ProductsByCategory() {
    const { categoryName } = useParams();
    const [products, setProducts] = useState([])

    const navigate = useNavigate();

    const productsMap = {
        meat: "Meat Products",
        dairy: "Dairy Products",
        fruits: "Fruit",
        vegetables: "Vegetable",
        frozen: "Frozen Items"
    }

    useEffect(() => {
        console.log(categoryName)
        const mappedCategoryName = productsMap[categoryName];
        if (mappedCategoryName) {
            fetch(`http://localhost:8000/products/category/${mappedCategoryName}`)
                .then(res => res.json())
                .then(data => { setProducts(data); console.log(data); })
        } else {
            console.log("Error fetching the data of " + categoryName);
        }
    }, [categoryName, productsMap])

    const handleProductView = (product) => {
        console.log(product.productId);
        navigate(`/products/${product.productId}`);
    };

    return (
        <div className="products">
            <div className="product-main">
                <h2>{productsMap[categoryName]}</h2>
            </div>

            <div className="products-items">
                {products && products.map(i => (
                    <div className="product" key={i.productId} onClick={() => handleProductView(i)}>
                        <img src={i.productImage} alt="" />
                        <div className="product-description">
                            <p>{i.productName}</p>
                            <span>Rs. {i.productPrice}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
