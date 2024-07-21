import axiosInstance from '../axios/axios_config';


const create=async (id,comment)=>{
    const response = await axiosInstance.post(`/profile/${id}/comment`,{
        comment:comment,
    });

    return response.data;
}

const createReply=async (id,comment_id,comment)=>{
    const response = await axiosInstance.post(`/profile/${id}/comment/${comment_id}/reply`,{
        comment:comment,
    });

    return response.data;
}


const comment= {
   create,
   createReply,
   
    
};
export default comment;

