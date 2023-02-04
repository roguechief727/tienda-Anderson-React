import db from "../database/db.js";//se importa la base de datos para extraer info

import { DataTypes } from "sequelize";//tipo de dato extraido de la base de datos

//El modelo de todos los usuarios extrayendo todos sus campos
const UserModel = db.define ('users',{
    user_name: {type: DataTypes.STRING},
    password: {type: DataTypes.STRING},
    adress: {type: DataTypes.STRING},
    telephone: {type: DataTypes.STRING},
    email: {type: DataTypes.STRING},
});

export default UserModel;