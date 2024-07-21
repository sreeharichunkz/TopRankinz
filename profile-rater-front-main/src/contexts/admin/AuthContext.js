
import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken, logout } from '../../api/admin/auth/userAuth';
import Cookies from 'js-cookie';

export const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
    
    const token = getToken();
    const [currentUser, setCurrentUser] = useState(token);
    const navigate = useNavigate();
    
    
    useEffect(() => {
        let token =Cookies.get('admin_access_token');
        
        setCurrentUser(token ? true : false);   
        
    }, []);
    useEffect(() => {
       
        setCurrentUser(token ? true : false);   
        
    }, [token,currentUser]);

    const handleLogout = async () => {
        await logout();
        setCurrentUser(null);       
        navigate('/admin');
       
    };

    return (
        <AdminAuthContext.Provider value={{ currentUser, setCurrentUser,handleLogout }}>
            {children}
        </AdminAuthContext.Provider>
    );
};
