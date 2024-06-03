import { Outlet } from 'react-router-dom'

const Home = () => {
  return (
    <>
      
       <div className='max-w-6xl mx-auto'>
        <Outlet/>
       </div>
    </>
  )
}

export default Home
