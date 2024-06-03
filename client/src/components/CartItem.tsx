import { useAppDispatch } from "../redux/hooks"
import { addToCart, removeFromCart } from "../redux/slice/cartSlice"
import { Product } from "./ProductItem"

interface CartItemsProps {
    product:Product
}

const CartItem:React.FC<CartItemsProps> = ({product}) => {
  const dispatch = useAppDispatch()
  return (
    <>
        <div className='py-4 flex justify-between items-center gap-4 border-b-2 border-gray-300'>

            <div>
                <img className='w-24 h-24' src={product.image} alt="" />
            </div>
            <div>
            <p className='text-base text-gray-500 font-medium leading-normal'>{product.name} ...</p>
             <p className="text-base text-gray-500 font-medium leading-normal">{product.description}</p>
            </div>

             <div>
                <p className='text-lg font-medium '>₹ {product.price} </p>
                <div className='flex justify-between  border-2 border-black'>
                    <div onClick={() => dispatch(addToCart(product))}  className='text-xl cursor-pointer  px-3 bg-gray-300 text-black flex justify-center items-center'>+</div>
                    <div className='text-xl  px-2  text-black flex justify-center items-center '>{product.quantity}</div>
                    <div onClick={() => dispatch(removeFromCart(product))}  className='text-xl  cursor-pointer px-3 bg-gray-300 text-black flex justify-center items-center'>-</div>
                </div>
                <p className=' font-medium mt-2'>subTotal: ₹ {Number(product.price) * product.quantity} </p>
             </div>

            

        </div> 
    </>
  )
}

export default CartItem
