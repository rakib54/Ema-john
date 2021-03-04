import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart,removeFromDatabaseCart } from '../../utilities/databaseManager';
import ReviewItem from '../ReviewItem/ReviewItem';

const Review = () => {
    const [cart ,setCart] = useState([])

    const removeProduct = (productKey)=>{
        const newCart =cart.filter(pd => pd.key !==productKey);
        setCart(newCart)
        removeFromDatabaseCart(productKey)
    }



    useEffect(() =>{
        const saveCart = getDatabaseCart()
        const productKeys = Object.keys(saveCart)

        const CartProducts =productKeys.map(key =>{
            const product = fakeData.find(pd =>pd.key ===key)
            product.quantity = saveCart[key];
            return product
        })
        setCart(CartProducts)
        // console.log(counts);
    },[])
    return (
        <div>
            <h1>Cart Items {cart.length}</h1>
            {
                cart.map(pd =>
                    <ReviewItem 
                        key={pd.key} 
                        product ={pd}
                        removeProduct ={removeProduct} >
                    </ReviewItem>)
            }
        </div>
    );
};

export default Review;