import { Sequelize } from 'sequelize';

//Se conecta a la base de datos usando sequlize, con los parametros de esta misma "nombre base de datos" "usuario" "constrasena"
const db = new Sequelize('tienda', 'root', 'root', {
    host:'localhost',
    dialect:'mysql'
});
export default db;