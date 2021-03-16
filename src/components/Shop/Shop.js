import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData'
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'
import { Link } from 'react-router-dom';


const Shop = () => {
    const first10 = fakeData.slice(0,10)
    const[products , setProduct] = useState(first10)
    const[cart , setCart] = useState([])

    useEffect(()=>{
        const saveCart = getDatabaseCart()
        const productKeys = Object.keys(saveCart)
        const PreviousCart = productKeys.map(existingKeys =>{
            const product = fakeData.find(pd =>pd.key ===existingKeys)
            return product;
        })
        setCart(PreviousCart)
        
    },[])


    const handleProduct = (product) =>{
        const toBeAddedKey = product.key
        const sameProduct = cart.find(pd => pd.key === toBeAddedKey)
        let count = 1
        let newCart;
        if(sameProduct){
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd =>pd.key !== toBeAddedKey)
            newCart =[...others , sameProduct];
        }
        else{
            product.quantity = 1
            newCart =[...cart ,product]
        }
        setCart(newCart)

        addToDatabaseCart(product.key,count);
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
                <Cart carts ={cart}>
                    <Link to="/review">
                        <button className="main-button">Review order </button>
                    </Link>
                </Cart>
                
            </div>
            
            
        </div>
    );
};

export default Shop;