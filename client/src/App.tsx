import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes } from "react-router-dom"
import Product from "./pages/Product"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Cart from "./pages/Cart"
import { ToastContainer } from 'react-toastify';
import Navbar from './components/Navbar';
import Home from './pages/Home';

function App() {

  return (
    <div  >
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route element={<Home/>}>
        <Route path="/" element={<Product />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        </Route>
        

        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>

         
       



      </Routes>


    </div>
  )
}

export default App
