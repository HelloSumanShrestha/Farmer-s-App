import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

function Layout() {
    return (
        <>
            <main>
                <Sidebar />
            </main>
        </>
    );
}

export default Layout;
