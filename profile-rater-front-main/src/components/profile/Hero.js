import React, { useEffect, useState } from 'react';
import {getToken} from '../../api/user/auth/userAuth';
import profile from '../../api/user/profile/profileLike';
import { useNavigate } from 'react-router-dom';



const Hero = ({image_url,name,industry,about,like_status, like_count=0,dislike_count=0,id}) => {

    

    const [currentUser, setCurrentUser]=useState(null);    
    const [profile_like_status, setProfileLikeStatus]=useState(like_status); 
    const [profile_like_count, setProfileLikeCount]=useState(0); 
    const [profile_dislike_count, setProfileDislikeCount]=useState(0);
                
    
    const navigate = useNavigate();

    useEffect(()=>{
        if(getToken()){
            setCurrentUser(true);
        }
        else{            
            setCurrentUser(false);
        }
        
    },[]);

    useEffect(()=>{
       
        setProfileLikeCount(Number(like_count));
        setProfileDislikeCount(Number(dislike_count));

    },[like_count,dislike_count]);

    const userCheck=()=>{
        
        return currentUser?true:false;
    }      

    const like=()=>{
        if(userCheck()){
            if(profile_like_status === 'dislike' || profile_like_status==='nolike'){
                setProfileLikeStatus('like');
                profile.like(id);
                if(profile_like_status === 'dislike'){
                    setProfileDislikeCount(profile_dislike_count-1);
                }
                setProfileLikeCount(profile_like_count+1)
            }
            else{
                setProfileLikeStatus('nolike');
                profile.nolike(id);
                setProfileLikeCount(profile_like_count-1)
            }
        }
        else{
            navigate('/login');
        }
    }

    const dislike=()=>{
        if(userCheck()){
            if(profile_like_status === 'like' || profile_like_status==='nolike'){
                setProfileLikeStatus('dislike');
                profile.dislike(id);

                if(profile_like_status === 'like'){
                    setProfileLikeCount(profile_like_count-1);
                }
                setProfileDislikeCount(profile_dislike_count+1);
            }
            else{
                setProfileLikeStatus('nolike');
                profile.nolike(id);                
                setProfileDislikeCount(profile_dislike_count-1);
            }
        }
        else{
            navigate('/login');
        }
    }
   

   useEffect(()=>{
    if(like_status==='like'){
        setProfileLikeStatus('like');        
    }
    else if(like_status==='dislike'){
        setProfileLikeStatus('dislike');        
    }
    else{
        setProfileLikeStatus('nolike');        
    }
    
   },[like_status]);

 
   
   

  return (
   <>
  

   <section className='bg-color-6 dark:bg-black'>
            <div className="lg:mx-28 bg-white lg:flex dark:bg-color-2 lg:rounded-lg overflow-hidden h-max">
                <div className="max-lg:h-[245px] w-screen lg:min-h-[342px] lg:w-[370px] bg-color-5 overflow-hidden">
                    <img src={image_url} alt="" className="w-full h-full"/>
                </div>
                <div className="max-lg:px-4 py-5 lg:pl-10 lg:pr-5 lg:py-8 lg:space-y-10 space-y-6 lg:w-2/3 w-full h-fit">
                    <div className="flex justify-between w-full">
                        <div className="w-full">
                            <div className="flex justify-between w-full">
                                <div className="text-[24px] h-fit lg:text-[48px] font-outfit-bold text-color-3 dark:text-color-6">{name}</div>
                                <div className="flex text-color-4 gap-5 dark:text-color-5">
                                    <div>
                                        <div onClick={like}  className="flex gap-1 cursor-pointer select-none">
                                            <div>
                                                <svg className={`${profile_like_status==='like'?'fill-green-500':''}`} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M2 12.5C2 11.3954 2.89543 10.5 4 10.5C5.65685 10.5 7 11.8431 7 13.5V17.5C7 19.1569 5.65685 20.5 4 20.5C2.89543 20.5 2 19.6046 2 18.5V12.5Z" stroke="#07DA63" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M15.4787 7.80626L15.2124 8.66634C14.9942 9.37111 14.8851 9.72349 14.969 10.0018C15.0369 10.2269 15.1859 10.421 15.389 10.5487C15.64 10.7065 16.0197 10.7065 16.7791 10.7065H17.1831C19.7532 10.7065 21.0382 10.7065 21.6452 11.4673C21.7145 11.5542 21.7762 11.6467 21.8296 11.7437C22.2965 12.5921 21.7657 13.7351 20.704 16.0211C19.7297 18.1189 19.2425 19.1678 18.338 19.7852C18.2505 19.8449 18.1605 19.9013 18.0683 19.9541C17.116 20.5 15.9362 20.5 13.5764 20.5H13.0646C10.2057 20.5 8.77628 20.5 7.88814 19.6395C7 18.7789 7 17.3939 7 14.6239V13.6503C7 12.1946 7 11.4668 7.25834 10.8006C7.51668 10.1344 8.01135 9.58664 9.00069 8.49112L13.0921 3.96056C13.1947 3.84694 13.246 3.79012 13.2913 3.75075C13.7135 3.38328 14.3652 3.42464 14.7344 3.84235C14.774 3.8871 14.8172 3.94991 14.9036 4.07554C15.0388 4.27205 15.1064 4.37031 15.1654 4.46765C15.6928 5.33913 15.8524 6.37436 15.6108 7.35715C15.5838 7.46692 15.5488 7.5801 15.4787 7.80626Z" stroke="#07DA63" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>

                                            </div>
                                            <div>Like</div>
                                        </div>
                                        <div className='text-center mt-1'>
                                            {profile_like_count}
                                        </div>
                                    </div>
                                   <div>
                                        <div onClick={dislike}  className="flex gap-1 cursor-pointer select-none">
                                            <div>
                                                <svg className={`${profile_like_status==='dislike'?'fill-red-500':''}`} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M2 11.5C2 12.6046 2.89543 13.5 4 13.5C5.65685 13.5 7 12.1569 7 10.5V6.5C7 4.84315 5.65685 3.5 4 3.5C2.89543 3.5 2 4.39543 2 5.5V11.5Z" stroke="#F01E2C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M15.4787 16.1937L15.2124 15.3337C14.9942 14.6289 14.8851 14.2765 14.969 13.9982C15.0369 13.7731 15.1859 13.579 15.389 13.4513C15.64 13.2935 16.0197 13.2935 16.7791 13.2935H17.1831C19.7532 13.2935 21.0382 13.2935 21.6452 12.5327C21.7145 12.4458 21.7762 12.3533 21.8296 12.2563C22.2965 11.4079 21.7657 10.2649 20.704 7.9789C19.7297 5.88111 19.2425 4.83222 18.338 4.21485C18.2505 4.15508 18.1605 4.0987 18.0683 4.04586C17.116 3.5 15.9362 3.5 13.5764 3.5H13.0646C10.2057 3.5 8.77628 3.5 7.88814 4.36053C7 5.22106 7 6.60607 7 9.37607V10.3497C7 11.8054 7 12.5332 7.25834 13.1994C7.51668 13.8656 8.01135 14.4134 9.00069 15.5089L13.0921 20.0394C13.1947 20.1531 13.246 20.2099 13.2913 20.2493C13.7135 20.6167 14.3652 20.5754 14.7344 20.1577C14.774 20.1129 14.8172 20.0501 14.9036 19.9245C15.0388 19.728 15.1064 19.6297 15.1654 19.5323C15.6928 18.6609 15.8524 17.6256 15.6108 16.6429C15.5838 16.5331 15.5488 16.4199 15.4787 16.1937Z" stroke="#F01E2C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>

                                            </div>
                                            <div>Dislike</div>
                                        </div>
                                        <div className='text-center mt-1'>
                                            {profile_dislike_count}
                                        </div>
                                   </div>
                                </div>
                            </div>
                            <div className="text-sm lg:text-xl text-color-4 dark:text-color-5 lg:px-2">{industry}</div>
                        </div>

                    </div>
                    <div className="px-2">
                        <div className="text-color-3 text-xs lg:text-sm font-outfit-semibold border-b py-3 dark:text-color-5">ABOUT</div>
                        <div className="text-[15px] pt-3 text-color-4 dark:text-color-5">
                           {about}
                        </div>
                    </div>

                </div>
            </div>
        </section>
   </>
  )
}

export default Hero