import React from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useState } from "react";

const URIADMIN = 'http://localhost:3001/users/3/'; //aqui se hacen las peticiones para el admin

const EditAdmin = () => {
    const [password, setPassword] = useState('');//se guarda la contrasena
    const [adress, setAdress] = useState('');//nueva direccion
    const [telephone, setTelephone] = useState('');//nuevo telefono
    const [email, setEmail] = useState('');//nuevo email
    const navigate = useNavigate();
    const navigateShop = () => {
        navigate(`/editInventory`);//redirecciona a editar el inventario
    }

    const update = async (e) => { //se hace una peticion para actualizar al admin
        e.preventDefault();
        await axios.put(URIADMIN, { password: password, adress: adress, telephone: telephone, email: email });
        navigateShop();
    }


    return (
        <div className="register-form"> {/*este es el formulario que pide la info del admin para poder cambiar su info */}
            <h2>Edit Profile</h2>
            <form onSubmit={update} action="/auth" method="post">
                <input 
                value={password}
                onChange={ (e) => setPassword((e.target.value))}
                type="password" name="pass" id="pass" placeholder="password"/>
                <input 
                value={adress}
                onChange={ (e) => setAdress(e.target.value)}
                type="text" name="pass" id="pass" placeholder="adress"/>
                <input 
                value={telephone}
                onChange={ (e) => setTelephone(e.target.value)}
                type="text" name="pass" id="pass" placeholder="telephone"/>
                <input 
                value={email}
                onChange={ (e) => setEmail(e.target.value)}
                type="text" name="pass" id="pass" placeholder="email"/>
                <input type="submit" className="btn-login" value="Edit" />
            </form>
        </div>
    )
}

export default EditAdmin;