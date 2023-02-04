//importamos el modelo

import ProductModel from "../models/ProductModel.js";
import { productsStock, productMinStock } from "../main.js";
import { sendMail } from "../mail/mail.js";

//mostrar todos los registros
export const getAllProducts = async (req,res) => {
    try {
        const products  = await ProductModel.findAll()
        res.json(products)
    } catch (error) {
        res.json({message: error.message})
    }
}

//mostrar un registro
export const getProduct = async (req,res) => {
    try {
       const product = await ProductModel.findAll({
            where:{ id:req.params.id }
        })
        res.json(product[0])
    } catch (error) {
        res.json( {message: error.message} )
    }
}

// crear un registro
export const createProduct = async (req,res) => {
    try {
        await ProductModel.create(req.body)
        res.json({
            'message': 'registro creado'
        })
    } catch (error) {
        res.json( {message: error.message})
    }
}

//actualizar registro
export const updateProducts = async (req,res) =>{
    try {
        await ProductModel.update(req.body, {
            where: {id: req.params.id}
        })
        res.json({
            'message': 'registro actualizado'
        })
    } catch (error) {
        res.json( {message: error.message})
    }
}
//eliminar registro

export const deleteProduct = async (req,res) =>{
    try {
        await ProductModel.destroy(req.body, {
            where: {id: req.params.id}
        })
        res.json({
            'message': 'registro borrado'
        })
    } catch (error) {
        res.json( {message: error.message})
    }
}

//reservar o no reservar productos por medio de un click al carr

export const bookProduct = async (req, res) => {
    try {
        console.log(productsStock);
        if (req.query.f === 'unbook'){
            productsStock[req.params.id]++;
            return res.json('Unbooked');
        } else if (req.query.f === 'book') {
            if (productsStock[req.params.id] == 0) return res.json('Stockout')//en caso de que el producto sea igual a 0 se notifica que se acabo
            productsStock[req.params.id]--;
            return res.json('Booked');
        } 
        res.status(400).json('Bad request');
    } catch (error) {
        res.json({message: error.message});
    }
}

//Se actualiza el contenido de la base de datos
const updateContent = async (product, quantity) => {
    const stock = await ProductModel.findAll({
        attributes: ['id', 'stock'],
        where:{ id: product }
    })
    console.log(quantity);
    await ProductModel.update({stock: stock[0].dataValues.stock - quantity[product]}, {
        where: {id: product}
    })
    if (productMinStock[product].stockMin >= (stock[0].dataValues.stock - quantity[product])){
        sendMail({id: product});
    }
}
//Se compran los productos y se usa updatecontent para actualizar el contenido de cada uno
export const buyProducts = async (req, res) => {
    try {
        console.log(typeof(req.body));
        Object.keys(req.body).forEach(product => updateContent(product, req.body));
        res.json("Successful purchase");
    } catch (error) {
        res.json(error.message);   
    }
}