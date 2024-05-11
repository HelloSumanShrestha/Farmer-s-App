import React, { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ isUserLoggedIn }) => {
    const location = useLocation();
    return (
        isUserLoggedIn ?
            <Outlet />
            : <Navigate
                to={'/login'}
                state={{ from: location }} />
    );
};

export default ProtectedRoute;