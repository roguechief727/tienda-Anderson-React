import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";

export const Product = (props) => {
    const { id, nombre, precio, descripcion, img1, img2, img3 } = props.data; //se guardan las informaciones de la base de datos
    const { addToCart, cartItems} = useContext(ShopContext); //se usa el context para agregar al carrito 

    const cartItemAmount = cartItems[id];
    return (
        <div className="product">
            <div className="slide-var"> {/*se hace el carusel */}
                <ul>
                    <li><img src={img1} alt={nombre}/></li>
                    <li><img src={img2} alt={nombre}/></li>
                    <li><img src={img3} alt={nombre}/></li>
                </ul>
            </div>
            <div className="descripcion">
                <p>{descripcion}</p>
            </div>
            <div className="description"> 
                <p> 
                    <b>{nombre}</b> 
                </p>
                <p> ${precio}</p>
            </div>
            <button className="addToCartBttn" onClick={() => addToCart(id)}> {/*se agrega un producto por su id */}
                Add To Cart {cartItemAmount > 0 && <> ({cartItemAmount})</>} {/*se imprime el numero de la cantidad */}
            </button>
        </div> 
    );
};