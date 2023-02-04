import db from "../database/db.js"; //se busca conectarse a la base de datos

import { DataTypes } from "sequelize";//Tipo de datos para cada atributo de la base de datos

//El modelo de todos los productos extrayendo todos sus campos
const ProductModel = db.define ('productos',{
    nombre: {type: DataTypes.STRING},
    precio: {type: DataTypes.NUMBER},
    descripcion: {type: DataTypes.TEXT},
    img1: {type: DataTypes.TEXT},
    img2: {type: DataTypes.TEXT},
    img3: {type: DataTypes.TEXT},
    stockMax: {type: DataTypes.INTEGER},
    stockMin: {type: DataTypes.INTEGER},
    stock: {type: DataTypes.INTEGER}
});

export default ProductModel;