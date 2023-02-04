import React, {useContext} from 'react';
import { ShopContext } from "../../context/shop-context";//importamos el context
import { CartItem } from './cart-item'; //importamos el cartitem para cada item que se ingrese en el carrito
import "./cart.css"; //vinculamos el css
import { useNavigate } from 'react-router-dom' //se importa para poder redireccionar
import axios from 'axios';//se usa para hacer peticiones al servidor
import { useState } from 'react';
import { useEffect } from 'react';

const URI = 'http://localhost:3001/products/';//esta sera la ruta en la cual se haran las peticiones

export const Cart = () => {
    const context = useContext(ShopContext);//variable para usar el contexto
    const { cartItems, getTotalCartAmount } = useContext(ShopContext); //aqui almacenamos los elementos del carrito
    const totalAmount = getTotalCartAmount(); //aqi se almacena el total de la compra
    const navigate = useNavigate();//se usa para navegar entre direcciones

    const[products, setProducts] = useState([])//aqui se almacenan todos los productos
    useEffect(() => {
        getProducts()
    }, []);

    const getProducts = async () => {//aqui se obtienen todos los productos
        const res = await axios.get(URI)
        setProducts(res.data)
    }

    const buy = async (e) => {
        e.preventDefault();
        console.log(cartItems);
        await axios.put(URI + 'buy', {//se envian con este metodo para poder actualizar la base de datos desde el back
            "1": cartItems[1],
            "2": cartItems[2],
            "3": cartItems[3],
            "4": cartItems[4],
            "5": cartItems[5],
            "6": cartItems[6],
            "7": cartItems[7],
            "8": cartItems[8],
            "9": cartItems[9],
            "10": cartItems[10],
        })
        .then((res) => {
            alert(res);
        }).catch((err) => {
            alert(err.message)
        });
        context.setPayAumount(totalAmount); //antes de pasar al portal de pago se agrega en el context el valor de la compra para poder cobrar ese monto
        navigate('/stripe');//se navega hacia la pagina de pago
    }

    return (
        <div className="cart">
            <div> 
                <h1> Your Cart Items</h1>
            </div>
            <div className="cartItems">
                {products.map((product) => {
                    if (cartItems[product.id] !== 0) {{/*para cada producto lo mostramos */}
                        return <CartItem data={product} />;
                    }
                })}
            </div>
            {totalAmount > 0 ? //si el total es mayor que 0
            <div className="checkout">
                <p> Subtotal: ${totalAmount}</p>{/*imprime el total de la compra calculado */}
                <button onClick={() => navigate ("/shop")}> Continue Shopping</button>{/*si se le da click se devuelve a la tienda principal */}
                <button onClick={buy}> Checkout </button>{/*si se le da clic llama a la funcion buy que lleva a procesar el pago */}
            </div>
            : <h1> Your Cart is Empty </h1>}
        </div>
    )
};