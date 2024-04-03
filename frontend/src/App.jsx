import { useEffect, useState } from 'react'
import './App.css'
import Sidebar from './Sidebar/Sidebar'
import Earnings from './dashboard/Earnings'
import Home from './dashboard/Home'
import MyProjects from './dashboard/MyProjects'
import Settings from './dashboard/Settings'
import Login from './login-signup/Login'
import Signup from "./login-signup/Signup"
import { Route, Routes, Navigate } from 'react-router-dom'
import testData from './constant/product';
import { ToastContainer } from 'react-toastify';


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [products, setProducts] = useState([...testData.items]);

  useEffect(() => {
    const userLoggedIn = localStorage.getItem('isLoggedIn')
    if (userLoggedIn === 'true') {
      setIsLoggedIn(true)
    }
  }, [])

  return (
    <>
      <ToastContainer />
      {isLoggedIn ? (
        <>
          <Sidebar />
          <Routes>
            <Route path='/' index element={<Home products={products} />} />
            <Route path='/earnings' element={<Earnings />} />
            <Route path='/settings' element={<Settings />} />
            <Route path='/my-products' element={<MyProjects setProducts={setProducts} products={products} />} />
          </Routes>
        </>
      ) : (
        <Routes>
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path='/*' element={<Navigate to="/login" />} />
        </Routes>
      )}
    </>
  )
}

export default App
