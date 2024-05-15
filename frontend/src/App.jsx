import { useState, useEffect } from 'react'
import './App.css'
import Layout from './Layout'
import Home from './pages/landing-pages/Home'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Login from "./pages/login/Login"
import ProtectedRoute from "./pages/landing-pages/ProtectedRoute"
import About from "./pages/landing-pages/About"
import AllCategories from "./pages/landing-pages/AllCategories"
import Cart from "./pages/landing-pages/Cart"
import PageNotFound from "./pages/landing-pages/PageNotFound"
import AllProducts from './pages/landing-pages/AllProdcuts'
import ProductsByCategory from './pages/landing-pages/ProductsByCategory'
import SearchPage from "./pages/landing-pages/SearchPage"
import ProductOnDetail from './components/ProductOnDetail'
import ProfileSection from './pages/landing-pages/Profile'
import UserSignup from './pages/login/signup'
import useStore from './zustand/userInfo'
import Buy from './pages/landing-pages/Buy'
import Orders from './pages/landing-pages/Orders'

function App() {

  const setProducts = useStore((state) => state.setProducts);

  useEffect(() => {
    fetch("http://localhost:8000/products")
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error("Failed to fetch products", error));
  }, [setProducts]);

  const [cartItems, setCartItems] = useState([])

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path='/' element={<Home />} />

            <Route path='/home' element={<Home />} />

            <Route path="/products" element={<AllProducts />} />
            <Route path="/products/:productId" element={
              <ProductOnDetail cartItems={cartItems} setCartItems={setCartItems} />} />

            <Route path="/categories" element={<AllCategories />} />
            <Route path="/categories/:categoryName" element={
              <ProductsByCategory />} />

            <Route path="/about" element={<About />} />
            <Route path="/search/:query" element={<SearchPage />} />

            <Route path="/login" element={<Login />} />

            <Route path="/buy" element={<Buy />} />
            <Route path="/orders" element={<Orders />} />

            <Route path="/signup" element={<UserSignup />} />


            {/* Protected Route */}
            <Route element={<ProtectedRoute />}>

              <Route path="/cart" element={<Cart cartItems={cartItems} setCartItems={setCartItems} />} />

              <Route path="/profile" element={<ProfileSection />} />

            </Route>
            <Route path="/*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
