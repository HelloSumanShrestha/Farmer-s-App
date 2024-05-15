import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import MyProducts from './pages/MyProducts';
import Home from './pages/Home';
import Orders from './pages/Orders';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Settings from './pages/Settings';
import Layout from './pages/Layout';
import useStore from './zustand/userInfo';
import './App.css';

function App() {
  const { isLoggedIn } = useStore();

  return (
    <BrowserRouter>
      <Routes>
        {isLoggedIn ? (
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/products" element={<MyProducts />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        ) : (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
