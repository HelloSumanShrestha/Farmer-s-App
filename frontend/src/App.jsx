import { useEffect, useState } from 'react'

import { Route, Routes, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import testData from './constant/product';

import Home from './pages/Home';
import Earnings from "./pages/Earnings"
import Sidebar from './components/Sidebar/Sidebar';
import Settings from "./pages/Settings"
import MyProducts from './pages/MyProducts';

import Signup from "./pages/login-signup/Signup"
import Login from "./pages/login-signup/Login"

import "./assets/css/App.scss"

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [products, setProducts] = useState([...testData.items]);
  const [userId, setUserId] = useState({})

  useEffect(() => {
    const userLoggedIn = localStorage.getItem('isLoggedIn')
    if (userLoggedIn === 'true') {
      setIsLoggedIn(true)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('userId', userId)
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
            <Route path='/my-products' element={<MyProducts setProducts={setProducts} products={products} />} />
          </Routes>
        </>
      ) : (
        <Routes>
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login setIsLoggedIn={setIsLoggedIn} />}
            setUserId={setUserId} />
          <Route path='/*' element={<Navigate to="/login" />} />
        </Routes>
      )}
    </>
  )
}

export default App
