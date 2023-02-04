import React from "react";
import './register.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useState, useEffect } from "react";

const URI = 'http://localhost:3001/users/'; //direccion en la que se hacen peticiones 

const Register = () => {
    const [name, setName] = useState(''); //todo esto son valores que se registran en la base de datos
    const [password, setPassword] = useState('');
    const [adress, setAdress] = useState('');
    const [telephone, setTelephone] = useState('');
    const [email, setEmail] = useState('');
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const navigateLogin = () => {
        navigate(`/login`);//envia al login
    }

    const navigateRegister = () => {
        navigate(`/register`);//envia al resgiter
    }

    useEffect(() => {
        getUsers();
    }, [])

    const getUsers = async() => {//se obtienen todos los usuarios
        const res = await axios.get(URI)
        setUsers(res.data)
    }

    const store = async (e) => { //hace un metodo post para ingresar el usuario a la base de taods
        e.preventDefault();
        await axios.post(URI, {user_name: name, password: password, adress: adress, telephone: telephone, email: email });
        navigateLogin();
    }

    return (
        <div className="register-form">
            <h2>register</h2>
            <form onSubmit={store} action="/auth" method="post"> {/*se llama a store en el momento de enviar el formulario */}
                <input 
                value={name}
                onChange={ (e) => users.find(event => event.username === e.target.value) ? navigateRegister() : setName(e.target.value)}
                type="text" name="user" id="user" placeholder="user"/>
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
                <input type="submit" className="btn-login" value="register" />
            </form>
        </div>
    )
}

export default Register;