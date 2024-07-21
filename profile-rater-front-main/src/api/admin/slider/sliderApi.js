import axiosAdminInstance from '../axios/admin_axios_config';

const get=async (get_quantity=10,page=1)=>{
    
    const response = await axiosAdminInstance.get(`/admin/home/slider?get_quantity=${get_quantity}&page=${page}`);   
    return response.data;
}

const create = async (sliderData)=>{
        
    const response = await axiosAdminInstance.post('/admin/home/slider',sliderData,{
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    });

    return response.data;
}


const update = async (sliderData,id)=>{
    
    const response = await axiosAdminInstance.post(`/admin/home/slider/${id}`,sliderData,{
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    });

    return response.data;
}

const destroy = async (id)=>{
    
    const response = await axiosAdminInstance.delete(`/admin/home/slider/${id}`);

    return response.data;
}
const slider = {
    get,
    create,
    update,
    destroy,
}
export default slider;