import axiosInstance from '../axios/axios_config';


const like=async (id)=>{
    const response = await axiosInstance.post(`/profile/${id}/likestatus`,{
        like_status:'like'
    });

    return response.data;
}
const dislike=async (id)=>{
    const response = await axiosInstance.post(`/profile/${id}/likestatus`,{
        like_status:'dislike'
    });

    return response.data;
}
const nolike=async (id)=>{
    const response = await axiosInstance.post(`/profile/${id}/likestatus`,{
        like_status:'nolike'
    });

    return response.data;
}
const rating=async (id,rating=0)=>{
    const response = await axiosInstance.post(`/profile/${id}/rating`,{
        rating:rating
    });

    return response.data;
}

const profile= {
    like,
    dislike,
    nolike,
    rating,
    
};
export default profile;

