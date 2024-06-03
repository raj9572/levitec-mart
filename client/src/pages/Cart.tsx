import { toast } from "react-toastify"
import { KEY_ACCESS_TOKEN, getItem } from "../Utils/localStorageManagement"
import CartItem from "../components/CartItem"
import { useAppSelector } from "../redux/hooks"
import { ApiResponse } from "../types/ApiResponse"
import  { AxiosError } from "axios"
import { axiosClient } from "../Utils/axiosClient"
import { FiLoader } from "react-icons/fi"
import { useState } from "react"

const Cart:React.FC = () => {
    const cartItems = useAppSelector(state => state.cartReducer.cart)
    const Total = cartItems?.reduce((x,item)=> x + Number(item.price) * item.quantity,0 )
    const GrandTotal = (Total + Total*18/100).toFixed(2)
    const [showLoader , setShowLoader] = useState<boolean>(false)

    const downloadeInvoice = async() =>{
        if(!getItem(KEY_ACCESS_TOKEN)){
          toast.error("sorry only Authenticated user download")
          return 
        }

        try {
            setShowLoader(true)
            const response = await axiosClient.post('/products/download-invoice',{
                cartItems,
            }, {
                responseType: 'blob', // Important for binary data
              });
        
              // Create a link element
              const link = document.createElement('a');
              link.href = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
              link.download = 'invoice.pdf';
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
        } catch (error) {
            const axiosError = error as AxiosError<ApiResponse>
             toast.error(axiosError.response?.data.message)
             
        } finally{
            setShowLoader(false)
        }






    }

    if(cartItems.length === 0) {
        return (
            <h1 className="text-lg text-center my-6 font-medium">No item Added To cart</h1>
        )
    }
  return (
    <div className="py-10 max-w-5xl">
        {
            cartItems?.map(cartItem => (<CartItem  product={cartItem}/>))
        }

            {cartItems.length > 0 && (<div className="flex justify-between items-center">
                <div>
                    <button onClick={downloadeInvoice} className="text-base font-medium flex items-center px-3 py-1 bg-pink-500 rounded-lg text-white">
                        {showLoader && <FiLoader className="h-4 w-4 animate-spin"/>}
                         Downloade Invoice
                        
                        </button>
                </div>
              <div className='flex flex-col flex- w-[20rem]  md:mt-5'>
                    <div className="flex justify-between gap-8">
                    <h3 className='text-black font-semibold text-lg'>Total</h3>
                    <h3 className='text-black font-semibold text-lg'>₹ {Total}</h3>
                    </div>
                    <div className="flex justify-between gap-8">
                    <h3 className='text-black font-semibold text-lg'>GST</h3>
                    <h3 className='text-black font-semibold text-lg'>18%</h3>
                    </div>
                    <div className="flex justify-between gap-8  border-t-2 border-gray-400">
                    <h3 className='text-black font-semibold text-lg'>Grand Total</h3>
                    <h3 className='text-black font-semibold text-lg'>₹ {GrandTotal}</h3>
                    </div>

                </div>
              </div>)}

       
    </div>
  )
}

export default Cart
