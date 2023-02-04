import React from 'react';
import {Elements} from "@stripe/react-stripe-js";//se llama elements para stripe
import { loadStripe } from '@stripe/stripe-js'; //se llama loadstripe
import PaymentForm from './PaymentForm';

const PUBLIC_KEY="pk_test_51MXhMwE3qnA4gieV66oI4KWMYXHB4FFpfK2E7KpaUDLv5PK32PwufHS8GAEI2RvpyEyhig3ZpxIu9SHgW9VsLhvj00ooDSlOjE" //se coloca la llave publica

const stripeTestPromise = loadStripe(PUBLIC_KEY); //se crea una variable en la que se almacena la key

export default function StripeContainer() {
    return (
        <Elements stripe={stripeTestPromise}>{/*se llama al elemento al formulario de del pago  */}
                <PaymentForm/>
        </Elements>
    )
}