import axiosInstance from "../axios/axios_config";

const getUser = async ()=>{
    const response =  await axiosInstance.get('/user');

    return response.data;
}

const updateUser = async (data)=>{
    const response =  await axiosInstance.post('/user',data);

    return response.data;
}

const accountApi = {
    getUser,
    updateUser,
}

export default accountApi;