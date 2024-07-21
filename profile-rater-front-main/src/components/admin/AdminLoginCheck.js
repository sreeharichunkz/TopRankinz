
import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../../hooks/admin/useAuth';
import { Outlet } from 'react-router-dom';

const AdminLoginCheck = ({ element: Component, ...rest }) => {
    const { currentUser } = useAuth();
    
    return currentUser ? <Navigate to="/admin/dashboard" />:<Outlet/>;
};

export default AdminLoginCheck;
