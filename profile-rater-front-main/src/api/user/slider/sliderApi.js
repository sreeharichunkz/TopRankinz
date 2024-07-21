import axiosInstance from '../axios/axios_config';


const getHomeSlider=async ()=>{
    
    const response = await axiosInstance.get(`/homeslider`);   
    return response.data;
}

const slider = {
   
    getHomeSlider,
   
}
export default slider;