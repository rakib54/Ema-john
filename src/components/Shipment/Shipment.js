import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { userContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import ProcessPayment from '../ProcessPayment/ProcessPayment';
import './Shipment.css'

const Shipment = () => {
  const { register, handleSubmit, watch, errors } = useForm()
  const [loggedInUser, setLoggedInUser] = useContext(userContext)
  const [shippingData , setShippingData] = useState(null)

  const onSubmit = data => {
    setShippingData(data)
  };

  const handlePaymentSuccess = paymentId =>{
    const saveCart = getDatabaseCart();
    const orderDetails = { 
      ...loggedInUser, 
      products: saveCart, 
      shipment: shippingData,
      orderTime: new Date() }

    fetch('http://localhost:5000/addOrder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderDetails)
    })
      .then(res => res.json())
      .then(result => {
        if (result) {
          processOrder()
          alert('Your order is successfully placed in execution')
        }
      })
  }


  console.log(watch("example")); // watch input value by passing the name of it

  return (
    <div className="row">
      <div style={{display: shippingData ? 'none':'block'}} className="col-md-6">
        <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>

          <input name="name" defaultValue={loggedInUser.name} ref={register({ required: true })} placeholder="Your name" />
          {errors.name && <span className="error">This name is required</span>}
          <input name="email" defaultValue={loggedInUser.email} ref={register({ required: true })} placeholder="Your email" />
          {errors.email && <span className="error">This email is required</span>}
          <input name="address" ref={register({ required: true })} placeholder="Your address" />
          {errors.address && <span className="error">This address is required</span>}
          <input name="phoneNumber" ref={register({ required: true })} placeholder="Your phone" />
          {errors.phoneNumber && <span className="error">This phoneNumber is required</span>}

          <input type="submit" />
        </form>
      </div>
      <div style={{display: shippingData ? 'block':'none'}} className="col-md-6">
        <h2>Your Payment</h2>
        <ProcessPayment handlePaymentProcess = {handlePaymentSuccess}></ProcessPayment>
      </div>
    </div>
  );
};

export default Shipment;