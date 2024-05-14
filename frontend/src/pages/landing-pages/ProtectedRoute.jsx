import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useStore from '../../zustand/userInfo';

const ProtectedRoute = () => {
    const { isLoggedIn } = useStore()
    const location = useLocation();
    return (
        isLoggedIn ?
            <Outlet />
            : <Navigate
                to={'/login'}
                state={{ from: location }} />
    );
};

export default ProtectedRoute;