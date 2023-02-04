import React from 'react';
import { Product } from './product';
import './shop.css';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

const URI = 'http://localhost:3001/products/'; //se hacen las peticiones aqui 

export const Shop = () => {

    const[products,setProducts] = useState([]) //se guardan todos los productos
    useEffect(() => {
        getProducts()
    }, []);

    const getProducts = async () => { //se hace la peticion para todos los usuarios
        const res = await axios.get(URI)
        setProducts(res.data)
    }
    return (
        <div className="shop">
            <div className="shopTitle">
                <h1>ADARTENIS</h1>
            </div>
            <div className="products"> 
                {products.map((product) => (
                    <Product data={product} /> //se llama al producto con sus propias informaciones 
                ))}
            </div>
        </div>
    )
};