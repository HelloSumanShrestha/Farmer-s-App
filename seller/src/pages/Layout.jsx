import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';


function Layout() {
    return (
        <>
            <Navbar />
            <main>
                <Sidebar />
            </main>
        </>
    );
}

export default Layout;
