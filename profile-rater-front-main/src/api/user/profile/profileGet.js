import axiosInstance from '../axios/axios_config';
import axiosAdminInstance from '../../admin/axios/admin_axios_config';


const get=async (get_quantity=10,page=1)=>{
    
    const response = await axiosInstance.get(`/profile?get_quantity=${get_quantity}&page=${page}`);   
    return response.data;
}

const getFilter=async ()=>{
    
    const response = await axiosInstance.get(`/profile/getfilters`);   
    return response.data;
}
const getFilterData=async (get_quantity=10,page=1,filterQuery)=>{
    
    const response = await axiosInstance.post(`/profile/filter?get_quantity=${get_quantity}&page=${page}`,{
        ...filterQuery
    });   
    return response.data;
}

const one = async (admin=false,id)=>{

    let response = '';
    if(admin){
        response = await axiosAdminInstance.get(`/profile/${id}`);

    }
    else{
        response = await axiosInstance.get(`/profile/${id}`);
    }

    return response.data;
}

const getActivities=async ()=>{
    const response = await axiosInstance.get('/user/activities');

    return response.data;
}
const profile= {
    get,
    getFilter,
    getFilterData,
    one,
    getActivities
};
export default profile;

