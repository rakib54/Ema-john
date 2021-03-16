import React from 'react';

const ReviewItem = (props) => {
    const {name ,quantity,key,price} = props.product
    const divStyle ={
        borderBottom:"1px solid grey",
        marginBottom:"10px",
        paddingBottom:"5px",
        marginLeft:"200px"
    }
    return (
        <div style={divStyle} className="product-name">
            <h4 className="product-name">{name}</h4>
            <p>Quantity :{quantity}</p>
            <p><small>${price}</small></p>
            <br/>
            <button 
                className="main-button" onClick={()=>props.removeProduct(key)}>Remove
                
            </button>
        </div>
    );
};

export default ReviewItem;