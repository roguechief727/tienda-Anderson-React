import Stripe from "stripe";//portal de pagos para conectarse a su api
const striper = Stripe('sk_test_51MXhMwE3qnA4gieV1zddEIRQEaSU2Ro4yVhovCZZGzuLKMvnkc1pmksgMB0B2hcPnogMWw4zzYAoiUK0trTZ7rCY00jHqdr6ZV');//clave de acceso stripe para recibir el pago

//router.post("/payment", (req,res)=>{
//    let costumer = stripe.costumer
//})


//funcion que permite conectarse a la api y realizar los pagos
export const pay = async (req,res) => {
    let {amount, id} = req.body
    try {
        const payment = await striper.paymentIntents.create({
            amount,
            currency: 'COP',
            description: 'shop',
            payment_method: id,
            confirm: true
        })

        console.log('payment', payment);
        res.json({
            message: 'payment succesful',
            succes: true
        })
    } catch (error) {
        console.log('error', error);
        res.json({
            message:'payment failed',
            succes: false
        })
    }
}