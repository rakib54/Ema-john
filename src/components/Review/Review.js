import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import fakeData from '../../fakeData';
import { getDatabaseCart,processOrder,removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';

const Review = () => {
    const [cart ,setCart] = useState([])
    const [orderPlace , setOrderPlace] = useState(false)
    const history = useHistory()

    const handleProceedCheckOut = () =>{
        history.push('./shipment')
        // setCart([])
        // setOrderPlace(true)
        // processOrder()

    }

    const removeProduct = (productKey)=>{
        const newCart =cart.filter(pd => pd.key !==productKey);
        setCart(newCart)
        removeFromDatabaseCart(productKey)
    }
    
    useEffect(() =>{
        const saveCart = getDatabaseCart()
        const productKeys = Object.keys(saveCart)

        fetch('http://localhost:5000/productsByKeys' ,{
            method:"POST",
            headers :{
                'Content-Type' :'application/json'
            },
            body: JSON.stringify(productKeys)
        })
        .then(res =>res.json())
        .then(data => setCart(data))
     
    },[])
    return (
        <div className="shop-container">
            <div className="product-container">
            {
                cart.map(pd =>
                    <ReviewItem 
                        key={pd.key} 
                        product ={pd}
                        removeProduct ={removeProduct} >
                    </ReviewItem>)
            }
        </div>
            <div className="cart-container">
                <Cart carts ={cart} >
                    <button onClick={handleProceedCheckOut} className="main-button">Proceed CheckOut</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;