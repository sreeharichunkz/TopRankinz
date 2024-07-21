import axios from 'axios';
import Cookies from 'js-cookie';


const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_API_URL, 
  
});

// request interceptor
axiosInstance.interceptors.request.use(
  (config) => {    
    
    const token = Cookies.get('access_token');
    
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
axiosInstance.interceptors.response.use(
  (response) => {

    return response;
  },
  (error) => {    
    if (error.response && error.response.status === 401) {   
      Cookies.remove('access_token');   
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
