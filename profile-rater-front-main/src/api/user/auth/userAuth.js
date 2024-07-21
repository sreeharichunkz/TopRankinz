import axiosInstance from '../axios/axios_config';
import axiosAdminInstance from '../../admin/axios/admin_axios_config';
import Cookies from 'js-cookie';

export async function register(userData){
  const response = await axiosInstance.post(`/register`, userData);
  return response.data;
};

export async function login(username, password){  
  
  const response = await axiosInstance.post(`/login`, { username, password });
  if (response.data.access_token) {
    Cookies.set('access_token', response.data.access_token, { expires: 7 });
  }

  return response.data;
};
export async function adminLogin(username, password){  
  
  const response = await axiosInstance.post(`/admin/login`, { username, password });
  if (response.data.admin_access_token) {
    Cookies.set('admin_access_token', response.data.admin_access_token, { expires: 1 });
  }

  return response.data;
};

export async function logout(){
  const token = Cookies.get('access_token');
  
  if (token) {
    
    const response = await axiosInstance.post(`/logout`);
    if(response.data){
      Cookies.remove('access_token');
    }
  }
  
};

export async function adminLogout(){
  const token = Cookies.get('admin_access_token');
  
  if (token) {
    
    const response = await axiosAdminInstance.post(`/logout`);
    if(response.data){
      Cookies.remove('admin_access_token');
    }
  }
  
};

export function getToken(){
  let token= Cookies.get('access_token');  
  return token??false;
};

export function getAdminToken(){
  let token= Cookies.get('admin_access_token');  
  return token??false;
};


export async function getSocialLoginUrl(provider){
  const response  = await axiosInstance.get(`/auth/${provider}/url`);

  return response.data;
}


