// protect route if login
import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { Outlet } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, ...rest }) => {
    const { currentUser } = useAuth();
    
    return currentUser ? <Navigate to="/" />:<Outlet/>;
};

export default ProtectedRoute;