import "./sidebar.scss"
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import {Link} from "react-router-dom"

const Sidebar = () => {
    return (
        <div className='sidebar'>
            <div className="top">
                <Link to ="/" style={{textDecoration:"none"}}>
                <span className="logo">Sajha Baari</span>
                </Link>
            </div>
            <hr />
            <div className="center">
                <ul>
                <p className="title">MAIN</p>
                <Link to ="/" style={{textDecoration:"none"}}>
                    <li>
                    <DashboardIcon className="icon" />                    
                        <span>Dashboard</span>
                    </li>
                    </Link>
                    <Link to ="/users" style={{textDecoration:"none"}}>
                    <li>
                    <PersonOutlineIcon className="icon" />      
                        <span>Customers</span>
                    </li>
                    </Link>
                    <p className="title">STORE</p>
                    <Link to ="/products" style={{textDecoration:"none"}}>
                    <li>
                    <StoreIcon className="icon" />
                        <span>Products</span>
                    </li>
                    </Link>
                    <li>
                    <CreditCardIcon className="icon" /> 
                        <span>Orders</span>
                    </li>
                    <p className="title">PREFERENCES</p>
                    <li>
                    <ExitToAppIcon className="icon" />
                        <span>Logout</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Sidebar;