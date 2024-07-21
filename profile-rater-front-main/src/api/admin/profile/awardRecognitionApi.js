import axiosAdminInstance from "../axios/admin_axios_config";

const get = async (profile_id)=>{
    const response = await axiosAdminInstance.get(`/profile/${profile_id}/recognition`,);
    return response.data;
}
const create =async (profile_id,data)=>{
    const response = await axiosAdminInstance.post(`/profile/${profile_id}/recognition`,data,{
        
        headers:{
            'Content-Type':'multipart/form-data',
        }
    })
    return response.data;
}

const update = async (profile_id,id,data)=>{
    const response  = await axiosAdminInstance.post(`/profile/${profile_id}/recognition/${id}`,data,{
        headers:{
            'Content-Type':'multipart/form-data',
        }
    })

    return response.data;
}

const destroy = async (profile_id,id)=>{
    const response = await axiosAdminInstance.delete(`/profile/${profile_id}/recognition/${id}`);
    return response.data;
}

const ProfileRecognition={
    get,
    create,
    update,
    destroy,
};

export default ProfileRecognition;