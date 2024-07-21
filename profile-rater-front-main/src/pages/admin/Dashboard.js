import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axiosAdminInstance from '../../api/admin/axios/admin_axios_config';



const Dashboard = () => {
  const [count,setCount] = useState('');

  useEffect(()=>{
    try{
      axiosAdminInstance('/admin/dashboard').then(
       (res)=>{
        console.log(res);
        //  const {profile_count,user_count}=res.data.profile_count;
         setCount({profile:res.data.data.profile_count,user:res.data.data.user_count});
       }
      ).catch((error)=>{
        console.error(error);
      });
 
   }catch(error){
    console.error(error);
   }
  },[]);

  useEffect(()=>{

  },[count]);
  return (
    <div className='px-4 lg:px-28 min-h-screen bg-color-6 dark:bg-color-3'>
      <div className='text-center text-3xl lg:text-5xl font-outfit-bold text-color-3 dark:text-color-6 pt-10 mb-20'>Dashboard</div>
      <div className='flex flex-col lg:flex-row justify-center items-center lg:gap-20 gap-10'>
          
          <Link to="/admin/profile" className='block w-full lg:w-1/4'>
            <div className=' h-44 bg-color-1 rounded-lg flex justify-center items-center shadow-lg flex-col gap-y-5 cursor-pointer'>
              <div className='text-4xl font-bold text-color-6'>Profiles</div>
              <div className='text-4xl font-bold text-color-6'>{count.profile}</div>            
            </div>                    
          </Link>       
          <Link to="/admin/user" className='block w-full lg:w-1/4'>
            <div className=' h-44 bg-color-1 rounded-lg flex justify-center items-center shadow-lg flex-col gap-y-5 cursor-pointer'>
              <div className='text-4xl font-bold text-color-6'>Users</div>
              <div className='text-4xl font-bold text-color-6'>{count.user}</div>            
            </div>                    
          </Link>       
      </div>
     
    </div>
  )
}

export default Dashboard