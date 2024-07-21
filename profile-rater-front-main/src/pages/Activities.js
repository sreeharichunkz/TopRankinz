import React, { useEffect,useState } from 'react';
import profile from '../api/user/profile/profileGet';
import { Link } from 'react-router-dom';

const Activities = () => {

    const [totalProfileRated, setTotalProfileRated] = useState(0);
    const [profileLike, setProfileLike] = useState(0);
    const [profileDislike, setProfileDislike] = useState(0);

    const fetchActivities = async ()=>{
        try{
            const response  = await profile.getActivities();
            const {total_profile_rated, profile_like_count, profile_dislike_count} = response.data;
            setTotalProfileRated(total_profile_rated);    
            setProfileLike(profile_like_count);       
            setProfileDislike(profile_dislike_count);       
        }
        catch(error){
            console.error('Error fetching User Activities:',error);

        }
       
    }

    useEffect(()=>{
       
        fetchActivities();
    },[]);


  return (
<>
<main>
        <section className='min-h-screen'>
            <div className=" w-full max-lg:px-2 lg:my-16 my-5">
                <div className="bg-color-9 dark:bg-color-2 min-h-[90vh] w-full lg:w-2/5 mx-auto relative py-10">

                    <div className="font-outfit-bold text-5xl text-color-3 dark:text-color-6 text-center">Activities</div>
                    <div className='text-color-3 dark:text-color-5 mt-10 lg:px-12 px-5'>
                        <div className='text-xs text-color-4 dark:text-color-5'>PEOPLE RATED</div>
                        <div className='text-color-3 font-outfit-medium dark:text-color-5'>{totalProfileRated}</div>
                    </div>
                    <div className='lg:px-12 px-5 mt-5'>
                   
                        <div className='border-b flex justify-evenly pb-6'>
                            <div className='flex justify-center flex-col items-center'>
                                <div className='font-outfit-semibold text-[56px] text-color-3 dark:text-color-6 w-fit'>{profileLike}</div>
                                <div className="flex gap-1 cursor-pointer">
                                        <div>
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M2 12.5C2 11.3954 2.89543 10.5 4 10.5C5.65685 10.5 7 11.8431 7 13.5V17.5C7 19.1569 5.65685 20.5 4 20.5C2.89543 20.5 2 19.6046 2 18.5V12.5Z" stroke="#07DA63" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M15.4787 7.80626L15.2124 8.66634C14.9942 9.37111 14.8851 9.72349 14.969 10.0018C15.0369 10.2269 15.1859 10.421 15.389 10.5487C15.64 10.7065 16.0197 10.7065 16.7791 10.7065H17.1831C19.7532 10.7065 21.0382 10.7065 21.6452 11.4673C21.7145 11.5542 21.7762 11.6467 21.8296 11.7437C22.2965 12.5921 21.7657 13.7351 20.704 16.0211C19.7297 18.1189 19.2425 19.1678 18.338 19.7852C18.2505 19.8449 18.1605 19.9013 18.0683 19.9541C17.116 20.5 15.9362 20.5 13.5764 20.5H13.0646C10.2057 20.5 8.77628 20.5 7.88814 19.6395C7 18.7789 7 17.3939 7 14.6239V13.6503C7 12.1946 7 11.4668 7.25834 10.8006C7.51668 10.1344 8.01135 9.58664 9.00069 8.49112L13.0921 3.96056C13.1947 3.84694 13.246 3.79012 13.2913 3.75075C13.7135 3.38328 14.3652 3.42464 14.7344 3.84235C14.774 3.8871 14.8172 3.94991 14.9036 4.07554C15.0388 4.27205 15.1064 4.37031 15.1654 4.46765C15.6928 5.33913 15.8524 6.37436 15.6108 7.35715C15.5838 7.46692 15.5488 7.5801 15.4787 7.80626Z" stroke="#07DA63" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>

                                        </div>
                                        <div className='text-color-4 dark:text-color-5'>Like</div>
                                    </div>
                            </div>
                            <div className='flex justify-center flex-col items-center'>
                                <div className='font-outfit-semibold text-[56px] text-color-3 dark:text-color-6 w-fit'>{profileDislike}</div>
                                <div className="flex gap-1 cursor-pointer">
                                        <div>
                                        <div>
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M2 11.5C2 12.6046 2.89543 13.5 4 13.5C5.65685 13.5 7 12.1569 7 10.5V6.5C7 4.84315 5.65685 3.5 4 3.5C2.89543 3.5 2 4.39543 2 5.5V11.5Z" stroke="#F01E2C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M15.4787 16.1937L15.2124 15.3337C14.9942 14.6289 14.8851 14.2765 14.969 13.9982C15.0369 13.7731 15.1859 13.579 15.389 13.4513C15.64 13.2935 16.0197 13.2935 16.7791 13.2935H17.1831C19.7532 13.2935 21.0382 13.2935 21.6452 12.5327C21.7145 12.4458 21.7762 12.3533 21.8296 12.2563C22.2965 11.4079 21.7657 10.2649 20.704 7.9789C19.7297 5.88111 19.2425 4.83222 18.338 4.21485C18.2505 4.15508 18.1605 4.0987 18.0683 4.04586C17.116 3.5 15.9362 3.5 13.5764 3.5H13.0646C10.2057 3.5 8.77628 3.5 7.88814 4.36053C7 5.22106 7 6.60607 7 9.37607V10.3497C7 11.8054 7 12.5332 7.25834 13.1994C7.51668 13.8656 8.01135 14.4134 9.00069 15.5089L13.0921 20.0394C13.1947 20.1531 13.246 20.2099 13.2913 20.2493C13.7135 20.6167 14.3652 20.5754 14.7344 20.1577C14.774 20.1129 14.8172 20.0501 14.9036 19.9245C15.0388 19.728 15.1064 19.6297 15.1654 19.5323C15.6928 18.6609 15.8524 17.6256 15.6108 16.6429C15.5838 16.5331 15.5488 16.4199 15.4787 16.1937Z" stroke="#F01E2C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>

                                        </div>

                                        </div>
                                        <div className='text-color-4 dark:text-color-5'>Dislike</div>
                                    </div>
                            </div>
                        </div>
                    </div>
                    <div className='lg:px-16 px-5 mt-44 '>
                       <Link to="/ranking">
                          <button className="bg-color-1 w-full text-white py-3 ">RATE MORE</button>
                          </Link>
                    </div>
                  
                    <div className="absolute top-4 right-5 cursor-pointer z-20 max-lg:hidden !mt-0">
                        <svg className="fill-[#767676] dark:fill-color-6" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <mask id="mask0_154_290" style={{maskType:'alpha'}} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                                <rect width="24" height="24" fill="#D9D9D9" />
                            </mask>
                            <g mask="url(#mask0_154_290)">
                                <path d="M12 13.4L7.1 18.3C6.91667 18.4834 6.68334 18.575 6.4 18.575C6.11667 18.575 5.88334 18.4834 5.7 18.3C5.51667 18.1167 5.425 17.8834 5.425 17.6C5.425 17.3167 5.51667 17.0834 5.7 16.9L10.6 12L5.7 7.10005C5.51667 6.91672 5.425 6.68338 5.425 6.40005C5.425 6.11672 5.51667 5.88338 5.7 5.70005C5.88334 5.51672 6.11667 5.42505 6.4 5.42505C6.68334 5.42505 6.91667 5.51672 7.1 5.70005L12 10.6L16.9 5.70005C17.0833 5.51672 17.3167 5.42505 17.6 5.42505C17.8833 5.42505 18.1167 5.51672 18.3 5.70005C18.4833 5.88338 18.575 6.11672 18.575 6.40005C18.575 6.68338 18.4833 6.91672 18.3 7.10005L13.4 12L18.3 16.9C18.4833 17.0834 18.575 17.3167 18.575 17.6C18.575 17.8834 18.4833 18.1167 18.3 18.3C18.1167 18.4834 17.8833 18.575 17.6 18.575C17.3167 18.575 17.0833 18.4834 16.9 18.3L12 13.4Z" fill="" />
                            </g>
                        </svg>

                    </div>

                   
                </div>
            </div>
        </section>
    </main>
</>  )
}

export default Activities