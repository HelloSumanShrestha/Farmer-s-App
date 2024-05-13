import './App.css'
import Navbar from './components/Navbar'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function Layout({ isLoggedIn, setIsLoggedIn }) {

    return (
        <>
            <ToastContainer />
            <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            <Outlet />
        </>
    )
}

export default Layout
