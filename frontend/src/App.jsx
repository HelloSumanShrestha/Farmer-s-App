import { useEffect, useState } from 'react'
import './App.css'
import Sidebar from './Sidebar/Sidebar'
import Earnings from './dashboard/Earnings'
import Home from './dashboard/Home'
import MyProjects from './dashboard/MyProjects'
import Settings from './dashboard/Settings'
import Login from './login-signup/Login'
import Signup from "./login-signup/Signup"
import { Route, Routes } from 'react-router-dom'

function App() {


  const [products, setProducts] = useState([]);

  useEffect(() => {
    console.log(products)
  }, [products])

  return (
    <>
      <Sidebar />
      <Routes>

        <Route path='/' index element={<Home products={products} />} />
        <Route path='/earnings' element={<Earnings />} />
        <Route path='/settings' element={<Settings />} />
        <Route path='/my-products' element={<MyProjects setProducts={setProducts} products={products} />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />

      </Routes>
    </>
  )
}

export default App
