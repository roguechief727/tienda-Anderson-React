import Express from 'express';//conexion con la api
import cors from 'cors';//Intercambio de recursos de origen cruzado, permite evitar errores
import db from './database/db.js';//conexion base de datos
import productRoutes from './routes/routesProducts.js';//rutas de los productos
import userRoutes from './routes/routesUser.js';//rutas de los usuarios
import ProductModel from './models/ProductModel.js';//modelo de los productos
import {pay} from './routes/pay.js';//ruta para pagar
const app = Express();//la app se conecta con express

app.use(cors());//prevenir fallas de conexcion
app.use(Express.json());//permite obtener el paquete express en un json
app.use('/products', productRoutes);//se generalizan las rutas de los productso
app.use('/users', userRoutes);//se generalizan las rutas de los usuarios
app.use('/payment',pay);//se generalizan las rutas de los pagos

//se busca conectarse a la base de datos
try {
    db.authenticate()
    console.log('conexion exitosa a la bd');
} catch (error) {
    console.log(`el error de conexion fue ${error}`);
}

const PORT = process.env.PORT || 3001;//conexion al servidor backend

app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`);//info de donde esta corriendo el server
})

//usando el modelo de productos, encuentra a todos los productos y devuelve sus correspondientes atributos y se guarda en el objeto en products
const products = await ProductModel.findAll({
    attributes: ['id', 'stock', 'stockMin', 'nombre']
})


let productsStock = {}//objeto para guardar el stock minmo de los productos
let productMinStock = {}//objeto para guardar el stock minimo de los productos

//para cada producto obtenido, 
products.forEach(product => {
    productsStock[product.dataValues.id] = product.dataValues.stock;//se le asigna el id correspondiente al producto y a su vez el valor del stock en forma de objeto
});
products.forEach(product => {
    productMinStock[product.dataValues.id] = {stockMin: product.dataValues.stockMin, nombre: product.dataValues.nombre};//se le asigna el id correspondiente al producto y a su vez el valor minimo del stock en forma de objeto, junto con el nomrbe
});
console.log(productMinStock);
export {productsStock, productMinStock};//exportation de los objetos

