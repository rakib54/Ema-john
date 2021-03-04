import React, { useState } from 'react';
import fakeData from '../../fakeData'
import { addToDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'

const Shop = () => {
    const first10 = fakeData.slice(0,10)
    const[products , setProduct] = useState(first10)
    const[cart , setCart] = useState([])


    const handleProduct = (product) =>{
        const newCart = [...cart ,product]
        setCart(newCart)
        const sameProduct = newCart.filter(pd => pd.key ===product.key)
        const count = sameProduct.length
        addToDatabaseCart(product.key,count)
    }

    return (
        <div className ="shop-container">
            <div className="product-container">
                {
                    products.map(pd => <Product
                        key={pd.key} 
                        showAddToCart={true}
                        handleProduct ={handleProduct}
                        product ={pd}>

                        </Product>)
                }   
            </div>
            <div className="cart-container">
                <Cart carts ={cart}></Cart>
                
            </div>
            
            
        </div>
    );
};

export default Shop;