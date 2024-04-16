import { useEffect, useState } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import UserLogin from './consumer/login-signup/UserLogin';

import Home from './pages/Home';
import Earnings from "./pages/Earnings"
import Sidebar from './components/Sidebar/Sidebar';
import Settings from "./pages/Settings"
import MyProducts from './pages/MyProducts';

import Signup from "./pages/login-signup/Signup"
import Login from "./pages/login-signup/Login"

import "./assets/css/App.scss"
import UserSignup from './consumer/login-signup/userSignup';
import Header from './components/Header/Header';
import Banner from './consumer/landing page/banner';
import Products from './consumer/landing page/products';
import Testimonials from './consumer/landing page/testimonials';
import Blogs from './consumer/landing page/blogs';
import { AboutUs } from './consumer/landing page/aboutus';
import Navbar from './consumer/landing page/navbar';

const Outline = () => {
  return <>
    <Navbar />
    <Banner />
    <Products />
    <Testimonials />
    <Blogs />
    <AboutUs />
  </>
}


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [products, setProducts] = useState([{}]);
  const [userId, setUserId] = useState({})

  useEffect(() => {
    const userLoggedIn = localStorage.getItem('isLoggedIn')
    if (userLoggedIn === 'true') {
      setIsLoggedIn(true)
    }
  }, [])

  useEffect(() => {
    const username = localStorage.getItem("username");
    fetch(`http://localhost:8000/user_id/${username}`, {})
      .then(res => res.json())
      .then(data => {
        localStorage.setItem('userId', data.seller_id);
      });
  }, []);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    fetch(`http://localhost:8000/seller_products/${userId}`, {})
      .then(res => res.json())
      .then(data => {
        setProducts(data)
        console.log(products)
      });
  }, []);

  return (
    <>
      <Routes>
        {/* Landing page routes */}
        <Route path="/" element={<Outline />} />
        <Route path="/products" element={<Products />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/aboutus" element={<AboutUs />} />

        {/* Authenticated routes */}
        {isLoggedIn && (
          <Route
            path="/dashboard/*"
            element={
              <>
                <Header setIsLoggedIn={setIsLoggedIn} />
                <main>
                  <Sidebar />
                  <Routes>
                    <Route path="/" index element={<Home products={products} />} />
                    <Route path="/earnings" element={<Earnings />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/my-products" element={<MyProducts setProducts={setProducts} products={products} />} />
                  </Routes>
                </main>
              </>
            }
          />
        )}

        {/* Unauthenticated routes */}
        {!isLoggedIn && (
          <Route path="/*" element={
            <Routes>
              <Route path="/seller/signup" element={<Signup />} />
              <Route path="/seller/login" element={<Login setIsLoggedIn={setIsLoggedIn} setUserId={setUserId} />} />
              <Route path="/user/signup" element={<UserSignup />} />
              <Route path="/user/login" element={<UserLogin setIsLoggedIn={setIsLoggedIn} setUserId={setUserId} />} />
            </Routes>
          } />
        )}
      </Routes>
    </>
  )
}

export default App