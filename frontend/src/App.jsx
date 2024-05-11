import { useState } from 'react'
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

function App() {

  const [isLoggedin, setIsLoggedIn] = useState(false)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout isLoggedIn={isLoggedin} setIsLoggedIn={setIsLoggedIn} />}>
            <Route path='/' element={<Home />} />
            <Route path='/home' element={<Home />} />
            <Route path="/products" element={<AllProducts />} />
            <Route path="/categories" element={<AllCategories />} />
            <Route path="/about" element={<About />} />
            <Route path="/categories/:categoryName" element={
              <ProductsByCategory />} />
            <Route path="/search/:query" element={<SearchPage />} />
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            {/* Protected Route */}
            <Route element={<ProtectedRoute isUserLoggedIn={isLoggedin} />}>
              <Route path="/cart" element={<Cart />} />
            </Route>
            <Route path="/*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
