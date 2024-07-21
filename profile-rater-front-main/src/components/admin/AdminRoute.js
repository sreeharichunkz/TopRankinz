
import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../../hooks/admin/useAuth';
import { Outlet } from 'react-router-dom';


const AdminRoute = ({ element: Component, ...rest }) => {
    const { currentUser } = useAuth();   
    return currentUser ? <Outlet/>:<Navigate to="/admin" />;
};

export default AdminRoute;
