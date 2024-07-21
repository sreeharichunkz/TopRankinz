import axiosAdminInstance from '../axios/admin_axios_config';

const get=async (get_quantity=10,page=1)=>{
    
    const response = await axiosAdminInstance.get(`/admin/user?get_quantity=${get_quantity}&page=${page}`);   
    return response.data;
}



const update = async (userData,id)=>{
    
    
    const response = await axiosAdminInstance.post(`/admin/user/${id}`, userData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      return response.data;
    
}

const destroy = async (id)=>{
    
    const response = await axiosAdminInstance.delete(`/admin/user/${id}`);

    return response.data;
}
const userApi = {
    get,    
    update,
    destroy,
}
export default userApi;