import React from 'react'
import { addToCart, removeFromCart } from '../redux/slice/cartSlice'
import { useAppDispatch,  } from '../redux/hooks'
import { CartProduct } from '../types/Product'

export interface Product {
  _id:string
  name:string,
  description:string,
  image:string,
  category:string,
  price:string,
  quantity:number
}



interface ProductItemProps{
 product:CartProduct
}

const ProductItem:React.FC<ProductItemProps> = ({product}) => {
  const dispatch = useAppDispatch()
 
  return (
    <div  className='px-2 md:w-1/4 sm:w-[45%]   py-6  rounded-lg shadow-lg overflow-hidden '>
       <img className='   object-cover  rounded-sm transition delay-150 hover:scale-105 mx-auto ' src={product.image} alt="" />
       {/* <img className='h-[75%] rounded-sm hover:block ' src={changeImage} alt="" /> */}
       <h3 className='text-gray-400 font-medium text-xl mt-1 '>{product?.category}</h3>
       <p className='text-lg text-black font-medium tracking-wide '>{product?.name.slice(0,20)}....</p>
       <div className='flex justify-between'>
       <p className='text-black text-base font-medium '> <span className='text-gray-500  font-medium'> </span> ₹{product?.price}</p>
       </div>

       <div className='flex justify-between gap-2 mx-auto w-28 border-2 border-black'>
                    <div onClick={() => dispatch(addToCart(product))}   className='text-xl cursor-pointer w-1/2  px-3 bg-gray-300 text-black flex justify-center items-center'>+</div>
                    <div onClick={() => dispatch(removeFromCart(product))}  className='text-xl w-1/2  cursor-pointer px-3 bg-gray-300 text-black flex justify-center items-center'>-</div>
          </div>

    </div>
  )
}

export default ProductItem
