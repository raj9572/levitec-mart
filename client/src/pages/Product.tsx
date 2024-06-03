import pizzas from '../../pizza-data'
import ProductItem from '../components/ProductItem'
const Product = () => {
 
  return (
    <div className='py-6'>
          <div className='flex flex-wrap gap-8 justify-center'>
              {
                pizzas?.map(pizza => ( <ProductItem key={pizza._id} product={pizza} /> ))
              }
          </div>
    </div>
  )
}

export default Product
