import { BsCart2 } from "react-icons/bs"
import { Link, useNavigate } from "react-router-dom"
import logo from '../assets/logo.jpg'
import { useAppSelector } from "../redux/hooks"
import { KEY_ACCESS_TOKEN, getItem, removeItem } from "../Utils/localStorageManagement"
const Navbar = () => {
  const cartItems = useAppSelector(state => state.cartReducer.cart)
  const totalItems = cartItems.reduce((item,x) => item + x.quantity, 0)
   const navigate = useNavigate()


   const handleLogout = () =>{
     removeItem(KEY_ACCESS_TOKEN)
     navigate("/login")
   }


  return (
    <>

     

     
     <div className="    shadow-md shadow-gray-300  ">
         <div className="max-w-6xl mx-auto flex justify-between items-center py-4  ">
         <div className="flex items-center gap-x-1">
            <Link to="/">
                <img src={logo} width={50} height={50} alt="" className="rounded-full" />
            </Link>
            <h1 className="text-2xl font-bold text-pink-500 ">LevitecMart</h1>
         </div>

         <div className="flex gap-3"><div className="relative">
         <BsCart2 onClick={() =>navigate("/cart") } className='w-8 h-8 cursor-pointer text-pink-600'/>
         <span className='flex items-center justify-center  absolute -top-2  -right-1 w-4 h-4 rounded-full  bg-pink-700 text-white text-xs'>{totalItems}</span>
         </div>
          </div>
        

           { !getItem(KEY_ACCESS_TOKEN) ?  <div className="flex items-center gap-2">
                <Link to="/login" className="font-medium px-3 py-1 bg-pink-500 text-white rounded-xl">login</Link>
                <Link to="/signup" className=" font-medium px-3 py-1 border-2 rounded-xl">signup</Link>
            </div>:
          <button onClick={handleLogout} className="font-medium px-3 py-1 bg-pink-500 text-white rounded-xl">logout</button>

             }


         </div>
         
     </div>

        
    </>
  )
}

export default Navbar
