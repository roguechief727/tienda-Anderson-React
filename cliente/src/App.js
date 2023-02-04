import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";//se importa  Routes para rodear las diferentes direcciones que tendra la aplicacion que se definiran con route
import { Navbar } from "./components/navbar.jsx";//se importa la navbar para usar el header
import { Shop } from './pages/shop/shop'//se importa el shop para usar la pagina principal de la pagina
import { Cart } from './pages/cart/cart'//se importa cart para poder usar el carro dentro de la aplicacion 
import { ShopContextProvider } from "./context/shop-context";//se importa el shopCOntextProvider para poder usar el context dentro de todos los componentes hijos de app.js
import { ShopAddtoCart } from "./pages/shopAddtoCart/shopAddtoCart";//se importa el modulo para poder agregar productos al carrito
import Login from "./pages/login/login.jsx";//se importa el login para usarlo en la pagina
import Register from "./pages/register/register.jsx";//se importa el register para usarlo en la pagina
import EditAdmin from "./pages/admin/editProfileAdmin/editProfileAdmin";//se importa para poder editar el administrador de la pagina
import { EditProduct } from "./pages/admin/editProduct/editProduct";//se importa para poder editar los productos
import StripeContainer from "./pages/Payment/stripeContainer";//se usa para poder llamar a la pagina del portal del pago
function App() {
  return (
    <div className="App"> 
      <ShopContextProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Shop />}/> /*la ruta principal sera para la tienda*/
          <Route path="/shop" element={<ShopAddtoCart />}/>/*ruta principal para cuando se a logeado alguien y pueda usar el boton*/
          <Route path="/cart" element={<Cart />}/>/*ruta para el carrito*/
          <Route path="/login" element={<Login />}/>/*ruta para el login*/
          <Route path="/register" element={<Register />}/>/*ruta para el register*/
          <Route path="/editAdmin" element={<EditAdmin />}/>/*ruta para editar el admin*/
          <Route path="/editInventory" element={<EditProduct />}/>/*ruta para poder editar el inventario*/
          <Route path="/stripe" element={<StripeContainer />}/>/*ruta para poder llegar a la pagina de pago */
        </Routes>
      </Router>
      </ShopContextProvider>
    </div>
  )
};

export default App;
