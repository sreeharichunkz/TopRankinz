
import { useContext } from 'react';
import { AdminAuthContext } from '../../contexts/admin/AuthContext';

const useAuth = () => {
    return useContext(AdminAuthContext);
};

export default useAuth;
