// protect route if not login
import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { Outlet } from 'react-router-dom';

const LoginProtectedRoute = ({ element: Component, ...rest }) => {
    const { currentUser } = useAuth();
    
    return currentUser ? <Outlet/>:<Navigate to="/login" />;
};

export default LoginProtectedRoute;
