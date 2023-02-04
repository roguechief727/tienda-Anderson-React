import express from "express";//Se importa express para facilitar la comunicacion con el servidor
import { getAllUsers, createUser, updateUser, getUser } from "../controllers/UserController.js";//obteniendo todos los controladores ya creados para ser usados
const router = express.Router();
//generacion de rutas para usa la api creada para interactuar con la base de datos
//diferentes rutas a usar con las diferentes funcionalidades
router.get('/', getAllUsers)
router.get('/:id', getUser)
router.post('/', createUser)
router.put('/:id', updateUser)

export default router;