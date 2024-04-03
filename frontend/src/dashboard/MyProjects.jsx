import React, { useState } from 'react'
import AddProduct from '../popup/addProducts'

export default function MyProjects({ products, setProducts }) {
    const [addBtnActive, setAddBtnActive] = useState(false)
    return (
        <>
            <div>MyProjects

                <button onClick={() => setAddBtnActive(true)}>Add Product</button>
            </div>
            {
                addBtnActive && <AddProduct setProducts={setProducts} products={products} setAddBtnActive={setAddBtnActive} />
            }

            <div className="my-products-main">

                {products && products.map((product, index) => (

                    <div key={index} className="product-card">
                        <img src={product.img} alt={product.name} />

                        <h3>{product.name}</h3>

                        <p>{product.description}</p>

                        <span className="price">&#8377;{product.price}</span>

                        <span className="sold-quantity">Sold: {product.sold}</span>
                    </div>
                ))}
            </div>
        </>
    )
}
