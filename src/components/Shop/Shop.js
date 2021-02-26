import React, { useState } from 'react';
import fakeData from '../../fakeData'
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'

const Shop = () => {
    const first10 = fakeData.slice(0,10)
    const[products , setProduct] = useState(first10)
    const[cart , setCart] = useState([])


    const handleProduct = (product) =>{
        // console.log('clicked',product);
        const newCart = [...cart ,product]
        setCart(newCart)
    }

    return (
        <div className ="shop-container">
            <div className="product-container">
                {
                    products.map(pd => <Product 
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