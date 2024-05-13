import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "../assets/css/productsOnDetail.css"

const ProductOnDetail = ({ cartItems, setCartItems }) => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [quantityInCart, setQuantityInCart] = useState(0);
    const [stock, setStock] = useState(0);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:8000/products/${productId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch product');
                }
                const data = await response.json();
                setProduct(data);
                setStock(data.productQuantity);
                const existingCartItem = cartItems.find(item => item.productId === data.productId);
                if (existingCartItem) {
                    setQuantityInCart(existingCartItem.quantity);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchProduct();

        return () => {
            setProduct(null);
            setQuantityInCart(0);
            setStock(0);
        };
    }, [productId, cartItems]);

    const handleAddToCart = () => {
        if (stock > 0) {
            setQuantityInCart(quantityInCart + 1);
            setStock(stock - 1);
            const updatedCart = [...cartItems];
            const foundIndex = updatedCart.findIndex(item => item.productId === product.productId);
            if (foundIndex !== -1) {
                updatedCart[foundIndex].quantity += 1;
            } else {
                updatedCart.push({ ...product, quantity: 1 });
            }
            setCartItems(updatedCart);
        }
    };

    const handleRemoveFromCart = () => {
        if (quantityInCart > 0) {
            setQuantityInCart(quantityInCart - 1);
            setStock(stock + 1);
            const updatedCart = [...cartItems];
            const foundIndex = updatedCart.findIndex(item => item.productId === product.productId);
            if (foundIndex !== -1) {
                updatedCart[foundIndex].quantity -= 1;
                if (updatedCart[foundIndex].quantity === 0) {
                    updatedCart.splice(foundIndex, 1);
                }
            }
            setCartItems(updatedCart);
        }
    };

    if (!product) {
        return <div>Loading...</div>;
    }

    const { productName, productImage, productPrice } = product;

    return (
        <div className="product-card">
            <img src={productImage} alt={productName} className="product-image" />
            <h3 className="product-name">{productName}</h3>
            <p className="product-price">${productPrice}</p>
            <p className="product-stock">In Stock: {stock}</p>
            <div className="quantity-control">
                <button className="quantity-btn" onClick={handleRemoveFromCart}>-</button>
                <span className="quantity">{quantityInCart}</span>
                <button className="quantity-btn" onClick={handleAddToCart}>+</button>
            </div>
            <div className="action-buttons">
                <button className="buy-btn" onClick={() => alert("Buy button clicked!")}>Buy</button>
                <button className="cart-btn" onClick={handleAddToCart}>Add to Cart</button>
            </div>
        </div>
    );
};

export default ProductOnDetail;
