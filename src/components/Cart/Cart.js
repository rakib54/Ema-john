import React from 'react';
import { Link } from 'react-router-dom';

const Cart = (props) => {
    const cart = props.carts
    
    // const Total = cart.reduce((Total, pd) => Total + pd.price, 0)
    let Total =0;
    for(let i=0 ; i<cart.length; i++){
        const product = cart[i];
        Total = (Total + product.price)
        
    }
    let shipping =0;
    if(Total > 15){
        shipping = 4.99
    }
    else if(Total >= 35){
        shipping = 0 
    }
    // else if(Total> 0){
    //     shipping = 12.99
    // }
    const tax = (Total * .01).toFixed(2)
    const GrandTotal = (Total + shipping + Number(tax)).toFixed(2)
    
    return (
        <div>
            <h4>Order Summary-</h4>
            <h4>Total Ordered: {cart.length}</h4>
            <p>Product Price :{Total}</p>
            <p><small>Shipping:{shipping}</small></p>
            <p><small>Tax :{tax}</small></p>
            <h3>Total :{GrandTotal}</h3>
            <Link to="/review">
                <button className="main-button">Review order </button>
            </Link>
        </div>
    );
};

export default Cart;