import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import SimpleCardForm from './SimpleCardForm';
import SplitCardForm from './SplitCardForm';


const stripePromise = loadStripe('pk_test_51Ie0W0DZredcbLuuvscGjiZi5dfw8LRyqFDzeMwJXC3Njt6iILrbkAxvfn5RxJ5bDSveOPxYH6jiUNumDjYMF4OJ00Utkn0WAT');

const ProcessPayment = ({handlePaymentProcess}) => {
    return (

        <Elements stripe={stripePromise}>
            <SimpleCardForm handlePayment = {handlePaymentProcess}></SimpleCardForm>
            {/* <SplitCardForm></SplitCardForm> */}
        </Elements>

    );
};

export default ProcessPayment;