import axiosInstance from "../axios/axios_config";

const sendPasswordResetLink = async (email)=>{
    
        const response  = await axiosInstance.post('/forgot-password',{email});
        return response.data;
   
}
const passwordReset = async (data)=>{
    
    const response  = await axiosInstance.post('/reset-password',data);
    return response.data;

}

const passwordApi = {
    sendPasswordResetLink,
    passwordReset,
}

export default passwordApi;