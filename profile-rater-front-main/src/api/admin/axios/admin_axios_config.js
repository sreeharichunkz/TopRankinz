import axios from 'axios';
import Cookies from 'js-cookie';


const axiosAdminInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_API_URL, 
  
});

// request interceptor
axiosAdminInstance.interceptors.request.use(
  (config) => {    
    
    const token = Cookies.get('admin_access_token');
    
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    config.headers['Accept'] = 'application/json';
    if(!config.headers['Content-Type']){
      config.headers['Content-Type'] = 'application/json';    

    }

    return config;
  },
  (error) => {
    
    return Promise.reject(error);
  }
);

// response interceptor (optional)
axiosAdminInstance.interceptors.response.use(
  (response) => {

    return response;
  },
  (error) => {    
    if (error.response && error.response.status === 401) {   
      Cookies.remove('admin_access_token');   
      window.location.href = '/admin';
    }

    return Promise.reject(error);
  }
);

export default axiosAdminInstance;
