import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Product.css'

const Product = (props) => {
    // console.log(props);
    const{name, img,seller,price,stock} = props.product
    return (
        <div className="product">
            <div>
                <img src={img} alt=""/>
            </div>
            <div className="product-name">
                <h4>{name}</h4>
                <br/>
                <p><small>by:{seller}</small></p>
                <p>${price}</p>
                <p><small>only{stock} left in stock. order soon</small></p>
                <button className="main-button" onClick={() =>props.handleProduct(props.product)}>
                    <FontAwesomeIcon icon={faShoppingCart}/>add to cart
                </button>
            </div>
            
            
        </div>
    );
};

export default Product;