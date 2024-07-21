import axiosInstance from '../axios/admin_axios_config';
import Cookies from 'js-cookie';


export async function login(username, password){  
  
  const response = await axiosInstance.post(`/admin/login`, { username, password });
  if (response.data.admin_access_token) {
    Cookies.set('admin_access_token', response.data.admin_access_token, { expires: 1 });
  }

  return response.data;
};



export async function logout(){
  const token = Cookies.get('admin_access_token');
  
  if (token) {
    
    const response = await axiosInstance.post(`/logout`);
    if(response.data){
      Cookies.remove('admin_access_token');
    }
  }
  
};


export function getToken(){
  let token= Cookies.get('admin_access_token');  
  return token;
};



