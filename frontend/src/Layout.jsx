import './App.css'
import Navbar from './components/Navbar'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function Layout() {

    return (
        <>
            <ToastContainer />
            <Navbar />
            <Outlet />
        </>
    )
}

export default Layout
