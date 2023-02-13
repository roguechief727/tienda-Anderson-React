import React, { createContext, useState } from 'react';
import axios from 'axios';//se importa axios para generar peticiones al servidor
import { useEffect } from 'react';

export const ShopContext = createContext(null);
const URI = 'http://localhost:3001/products/';//esta sera la ruta a la cual se generaran peticiones en este caso sera para los productos

const getDefaultCart = () => {//se crea un arreglo que se usara para darle una cantidad a cada producto esto, cada posicion del arreglo contendra un cero como cantidad
    let cart = {}
    for(let i = 1; i < 12 ; i++) {
        cart[i] = 0
    }
    return cart;
};

export const ShopContextProvider = (props) => {
    const [cartItems, setCartItems] = useState(getDefaultCart()); //aqui se almacenaran los productos ingresados dentro del carrito
    const [payAumount,setPayAumount] = useState(0);//aqui se guarda el total de la compra

    const[products, setProducts] = useState([])//aqui va a obtener todos los productos que se encuentran dentro de la base de datos
    useEffect(() => {
        getProducts()
    }, []);

    const [logged, setLogged] = useState(0);//este hook es para saber si hay un usuario logeado en la pagina
    const loggedChanger = (value) => setLogged(value);//con esto se le cambia el valor al hook logged 

    const [admin, setAdmin] = useState(false);//se utiliza para saber si el usuario es un admin, por defecto el hook se encuentra en falso
    const AdminChanger = (value) => setAdmin(value);
    
    const getProducts = async () => {//aqui se hacen las peticiones a la base de datos para obtener todos los productos
        const res = await axios.get(URI)
        setProducts(res.data);

    }


    const getTotalCartAmount = () => {//esta funcion permite dabe
        let totalAmount = 0;//se crea una variable con el total que comenzara en 0
        for (const item in cartItems) {//se crea una bucle que recorre cada item del arreglo carItems 
            if (cartItems[item] > 0) { //se pregunta si el valor del en la posicion item de ese arreglo es mayor de 0
                let itemInfo = products.find((product) => product.id === Number(item)); //dentro de una variable se almacena el producto para poder usar el precio mas adelante
                totalAmount += cartItems[item] * itemInfo.precio; //dentro de totalAmount se almacena la multiplicacion del precio del producto multiplicado por la cantidad de productos que se encuentra del arreglo
            }
        }
 
        return totalAmount;//retorna el valor total de la compra 
    };

    const addToCart = async (itemId) => { //funcion para poder agregar al carrito enviando como parametro el id del producto y poder reservarlo en el servidor
        await axios.get('http://localhost:3001/products/book/'+ itemId + '?f=book')//se genera una peticion get para poder traer el el producto el cual se va reservar el producto
        .then(({ data }) => {
            data==='Booked' ? setCartItems((prev) => ({...prev, [itemId]: prev[itemId] + 1 })) : void(0);//si el dato extraido es Booked le sumamos 1 a la posicion que represente al producto dentro del arreglo para poder saber la cantidad de cada producto
            data==='Stockout' ? alert('Empty product') : void(0); //en caso de que el estado retornado sea Stockout se crea una alerta que dice que el producto esta vacio y no hace nada
        })
        .catch(error => {
            console.log(error.message);//si hay un error lo muestra por consola
        }) 
    };

    const removeFromCart = async (itemId) => { //funcion para remover del carrito a partir del id
        await axios.get('http://localhost:3001/products/book/'+ itemId + '?f=unbook')//en esta ruta se hace la peticion
        .then(({ data }) => {
            data==='Unbooked' ? setCartItems((prev) => ({...prev, [itemId]: prev[itemId] - 1 })) : void(0);//si tiene el estado unbooked se le resta 1 en el arreglo de la cantidad
        })
        .catch(error => {
            console.log(error.message);
        }) 
    };

    const contextValue = { cartItems, addToCart, removeFromCart, getTotalCartAmount, loggedChanger, logged, AdminChanger, admin, payAumount,setPayAumount};//metemos todas las funciones y hooks dentro del contexto
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};