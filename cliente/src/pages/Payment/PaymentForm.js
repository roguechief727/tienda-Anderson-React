import React, { useState, useContext } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { ShopContext } from "../../context/shop-context";
import axios from "axios";
import './payment.css';

const CARD_OPTIONS = {//estilos para el formulario de pago
	iconStyle: "solid",
	style: {
		base: {
			iconColor: "#c4f0ff",
			color: "#fff",
			fontWeight: 500,
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "16px",
			fontSmoothing: "antialiased",
			":-webkit-autofill": { color: "#fce883" },
			"::placeholder": { color: "#87bbfd" }
		},
		invalid: {
			iconColor: "#ffc7ee",
			color: "#ffc7ee"
		}
	}
}

export default function PaymentForm() {
    const context = useContext(ShopContext);
    const [success , setSucces] = useState(false);//para saber si fue un exito o no
    const stripe = useStripe()
    const elements = useElements()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: "card",//se crea un metodo de pago por tarjeta
            card: elements.getElement(CardElement) //se le da el elemento card eleemnent
        })
    

    if(!error){
        try {
            const {id} = paymentMethod//si n hay error se almacena el if de payment method
            const response = await axios.post("http://localhost:3001/payment", { //se cre una peticion para el pago
                amount: context.payAumount, //con el total de la compra
                id
            });

            if (response.data.success){
                console.log("succesful payment");
                setSucces(true);
            }
        }catch (error) {
            console.log("error",error);
        }
    }else {
        console.log(error.message);
    }
}

    return (
        <>
        {!success ?
        <form onSubmit={handleSubmit}>
            <fieldset className="FormGroup">
                <div className="FormRow">
                    <CardElement options={CARD_OPTIONS}/>
                </div>
            </fieldset>
            <button className="pay">Pay</button> {/*boton para pagar  */}
        </form>
        :
        <div>
            <h2>succesful purchase</h2>
        </div>
        }
        </>
    )
}