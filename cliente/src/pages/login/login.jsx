import React from "react";
import './login.css' //se importa el css
import { useNavigate } from "react-router-dom";//es para redireccionar
import axios from "axios";//es para poder hacer peticiones
import { useState, useEffect } from "react";
import { ShopContext } from "../../context/shop-context";//se importa el contexto
import { useContext } from "react";

const URI = 'http://localhost:3001/users/';//ruta para hacer las peticiones 

const Login = () => {
    const context = useContext(ShopContext);
    const navigate = useNavigate();
    const navigateRegister = () => {//redirige hacia el registro
        navigate(`/register`);
    }

    const navigateLogin = () => {//redirige al login
        navigate(`/login`);
    }

    const navigateShopAddtoCart = () => {//redirige a la pagina principal
        navigate(`/shop`);
    }

    const navigateEditInventory = () => {//redirige hacia el editor del inventario
        navigate(`/editInventory`);
    }

    const [entrada, SetEntrada] = useState(''); //este hook representa la entrada del usuario 
    const [entradaP, SetEntradaP] = useState('');//este es el hook para el password 
    const [users, setUsers] = useState([]);//aqui se almacenan los usuarios para comparar con la entrada
    
    useEffect(() => {
        getUsers();
    }, [])

    const getUsers = async() => {//aqui se soolicitan los usurios
        const res = await axios.get(URI)
        console.log(res.data);
        setUsers(res.data)
    }



    const compare = () => {//funcion para comparar si la entrada del usurio es igual a un usuario ya existente y poder logearse
            if (users.find(e => e.user_name === entrada && e.password === entradaP))
                return true;
            else
                return false;
    }

    return (
        <div className="login-form">
            <h2>Login</h2>
            <form onSubmit={compare()}> {/*al enviar el formulario se llama la funcion compare */}
                <input 
                    value={entrada} //{/*se ingresa dentro de entrada el valor del input */}
                    onChange={(e) => SetEntrada(e.target.value)}
                    type="text" name="user" id="user" placeholder="user" />
                <input 
                    value={entradaP} //se ingresa dentro de entradap el valor del input de la contraseña
                    onChange={(e) => SetEntradaP((e.target.value))}  
                    type="password" name="pass" id="pass" placeholder="password" />
                <input type="submit" className="btn-login" value="Login" onClick={(e) => { //al darle click al si compare es true osea que el login tuvo exito
                    e.preventDefault();
                    if(compare()) //preguntasi la comparacion tuvo exito
                    {
                        if (entrada === 'admin') //si el nombre de la entrada 
                        {
                            navigateEditInventory(); //rediricciona al editor del inventario 
                            context.AdminChanger(true);//se activa el admin dentro del context
                        }
                        else 
                            navigateShopAddtoCart();//de lo contrario es un usuario normal por lo que envia al shop con los botones
                        context.loggedChanger(true);//se cabia a true el hook que pone si esta logeado el usuario
                    }
                    else
                         navigateLogin() }}/>
            </form>
            <div href="register" className="btn-register" onClick={navigateRegister}>register</div> {/*se lleva al registro si se le da click */}
        </div>
    )
}

export default Login;