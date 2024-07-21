
import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken, logout } from '../api/user/auth/userAuth';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    
    const token = getToken();
    
    const [currentUser, setCurrentUser] = useState(token);
    const navigate = useNavigate();
    
    
    useEffect(() => {
        let token =Cookies.get('access_token')??false;        
        
        setCurrentUser(token ? true : false);          
        
    }, []);
    useEffect(() => {
       
        setCurrentUser(token ? true : false);   
        
    }, [token,currentUser]);

    const handleLogout = async () => {
        await logout();
        setCurrentUser(null);
       
        navigate('/login');
        
    };

    return (
        <AuthContext.Provider value={{ currentUser, setCurrentUser,handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};
