import React from 'react';

const Inventory = () => {
    const handleAddProduct = () =>{
        const product ={};
        fetch('http://localhost:5000/addProduct',{
            method :"POST",
            headers :{
                'Content-Type' :'application/json'
            },
            body :JSON.stringify(product)
        })
    }
    return (
        <div>
            <form action="">
                <p><span>Name</span></p><input type="text"/>
                <p><span>Price</span></p><input type="text"/>
                <p><span>Quantity</span></p><input type="text"/>
                <p><span>product image</span></p><input type="file"/>
                <button onClick={handleAddProduct}>Add product</button>
            </form>
            
        </div>
    );
};

export default Inventory;