import axiosAdminInstance from '../axios/admin_axios_config';

const get=async (get_quantity=10,page=1)=>{
    
    const response = await axiosAdminInstance.get(`/profile?get_quantity=${get_quantity}&page=${page}`);   
    return response.data;
}


const getFilter=async ()=>{
    
    const response = await axiosAdminInstance.get(`/profile/getfilters`);   
    return response.data;
}
const getFilterData=async (get_quantity=10,page=1,filterQuery)=>{
    
    const response = await axiosAdminInstance.post(`/profile/filter?get_quantity=${get_quantity}&page=${page}`,{
        ...filterQuery
    });   
    return response.data;
}


const create = async (profileData)=>{
        
    const response = await axiosAdminInstance.post('/profile',profileData,{
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    });

    return response.data;
}


const update = async (profileData,id)=>{
    
    const response = await axiosAdminInstance.post(`/profile/${id}`,profileData,{
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    });

    return response.data;
}

const destroy = async (id)=>{
    
    const response = await axiosAdminInstance.delete(`/profile/${id}`);

    return response.data;
}
const profilePost = {
    get,
    getFilter,
    getFilterData,
    create,
    update,
    destroy,
}
export default profilePost;