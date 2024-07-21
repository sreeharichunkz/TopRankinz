/* eslint-disable no-octal-escape */
import React from 'react';

import Hero from '../components/profile/Hero';
import profile from '../api/user/profile/profileGet';
import profileRating from '../api/user/profile/profileLike';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import CommentCard from '../components/comment/CommentCard';
import AddComment from '../components/comment/AddComment';


const Profile = () => {

    const location = useLocation();
    const [profileData, setProfileData] = useState(null);
    const [profile_like_status, setProfileLikeStatus] = useState('like');
    const [basePath, setBasePath] = useState('');
    const [rating, setRating] = useState(0);
    const [profileUserMetaData, setProfileUserMetaData] = useState(null);
    const [fetchProfileData, setFetchProfileData] = useState(false);
    const profileId = location.state.profile_id || null;
    const isAdmin = location.state.admin || false;

    const { currentUser } = useAuth();
    const navigate = useNavigate();


    const handleBack = () => {
        if (location.state?.from !== '/signup') {
            navigate(location.state?.from || -1);
        } else {
            navigate('/');
        }
    }

    const handleRating = async (rating) => {

        if (currentUser) {
            setRating(Number(rating));

            try {
                profileRating.rating(profileId, rating);

            }
            catch (error) {
                console.error('Error Sending Rating:', error);
            }

        } else {
            navigate('/login');
        }

    }

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await profile.one(isAdmin, profileId);
                const { data, base_path } = response;
                const profile_data = data[0];

                if ('profile_user_meta' in profile_data && profile_data.profile_user_meta.length !== 0) {

                    setProfileUserMetaData(profile_data.profile_user_meta[0]);
                    setRating(Number(profile_data.profile_user_meta[0].rating))
                    setProfileLikeStatus(profile_data.profile_user_meta[0].like_status);
                }
                else {
                    setProfileLikeStatus('null');
                }


                setProfileData(profile_data);

                setBasePath(base_path);
            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        };

        if (profileId) {
            fetchProfileData();
        }
    }, [profileId, isAdmin,fetchProfileData]);


    const refreshData = ()=>{
        setFetchProfileData(!fetchProfileData);
    }




    return (
        <>

            <main className='bg-color-6 dark:bg-black lg:py-10 py-5 min-h-screen'>
                <section className='bg-color-6 dark:bg-black'>

                    <div onClick={handleBack} className="flex items-center gap-2 lg:mx-28 mx-3 lg:mb-10 mb-5 cursor-pointer">
                        <div className="">
                            <svg className="fill-color-3 dark:fill-color-5" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <mask id="mask0_127_521" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                                    <rect width="24" height="24" fill="#D9D9D9" />
                                </mask>
                                <g mask="url(#mask0_127_521)">
                                    <path d="M6.80005 13L9.70005 15.9C9.88338 16.0833 9.97505 16.3167 9.97505 16.6C9.97505 16.8833 9.88338 17.1167 9.70005 17.3C9.51672 17.4833 9.28338 17.575 9.00005 17.575C8.71672 17.575 8.48338 17.4833 8.30005 17.3L3.70005 12.7C3.60005 12.6 3.52922 12.4917 3.48755 12.375C3.44588 12.2583 3.42505 12.1333 3.42505 12C3.42505 11.8667 3.44588 11.7417 3.48755 11.625C3.52922 11.5083 3.60005 11.4 3.70005 11.3L8.30005 6.69999C8.48338 6.51665 8.71672 6.42499 9.00005 6.42499C9.28338 6.42499 9.51672 6.51665 9.70005 6.69999C9.88338 6.88332 9.97505 7.11665 9.97505 7.39999C9.97505 7.68332 9.88338 7.91665 9.70005 8.09999L6.80005 11H20C20.2834 11 20.5209 11.0958 20.7125 11.2875C20.9042 11.4792 21 11.7167 21 12C21 12.2833 20.9042 12.5208 20.7125 12.7125C20.5209 12.9042 20.2834 13 20 13H6.80005Z" fill="" />
                                </g>
                            </svg>

                        </div>
                        <div>
                            <div className="text-[24px] h-fit lg:text-[48px] font-outfit-bold text-color-3 dark:text-color-6">Back</div>
                        </div>
                    </div>

                </section>

                {profileData ? (
                    <Hero
                        image_url={`${basePath}/${profileData.image}`}
                        name={profileData.name}
                        industry={profileData.industry}
                        about={profileData.about}
                        like_status={profile_like_status}
                        id={profileData.id}
                        like_count={profileData.profile_like_count}
                        dislike_count={profileData.profile_dislike_count}
                    />
                ) : (
                    <Hero

                    />
                )}
                <section>
                    <div className="lg:mx-28 max-lg:px-4 lg:mt-16 mt-2">
                        <div className="text-color-3 text-xs lg:text-sm font-outfit-semibold border-b py-3 dark:text-color-5">AWARDS & RECOGNITIONS</div>
                        <div className="py-6 grid lg:grid-cols-2 grid-cols-1 gap-5 max-lg:gap-y-7">

                            {
                                profileData ?
                                    (

                                        profileData.award_recognition.map((ar, index) => {

                                            return (
                                                <div key={index} className="flex gap-5">
                                                    <div className="size-11 bg-color-5 dark:bg-color-2 rounded-full overflow-hidden">
                                                        {
                                                            ar.image ?
                                                                <img src={`${basePath}/${ar.image}`} alt="" className="w-full h-full rounded-full" />
                                                                :
                                                                <></>
                                                        }

                                                    </div>
                                                    <div className="text-color-4 max-lg:text-sm dark:text-color-6 w-3/4">
                                                        <div>{ar.name}</div>
                                                        <div>{ar.date}</div>
                                                    </div>
                                                </div>
                                            );
                                        })

                                    )
                                    :
                                    (
                                        <>

                                            <div className="flex gap-5">
                                                <div className="size-11 bg-color-5 dark:bg-color-2 rounded-full overflow-hidden">

                                                </div>
                                                <div className="text-color-4 max-lg:text-sm dark:text-color-6 w-3/4">
                                                    <div className='w-20 h-2 bg-color-5 rounded-full'></div>
                                                    <div className='w-10 rounded-full h-2 bg-color-5 mt-5'></div>
                                                </div>
                                            </div>
                                            <div className="flex gap-5">
                                                <div className="size-11 bg-color-5 dark:bg-color-2 rounded-full overflow-hidden">

                                                </div>
                                                <div className="text-color-4 max-lg:text-sm dark:text-color-6 w-3/4">
                                                    <div className='w-20 h-2 bg-color-5 rounded-full'></div>
                                                    <div className='w-10 rounded-full h-2 bg-color-5 mt-5'></div>
                                                </div>
                                            </div>
                                        </>
                                    )
                            }

                        </div>
                    </div>
                </section>
                <section className='mt-10'>
                    <div className="lg:px-28 max-lg:px-4 flex w-full h-fit lg:mt-5 lg:mb-14 max-lg:mb-5">
                        <div className="lg:w-1/2 w-full">
                            <div className="text-color-3 text-xs lg:text-sm font-outfit-semibold border-b py-3 dark:text-color-5">PERSONAL STATS</div>
                            <div>

                                {
                                    profileData ?
                                        (
                                            <>
                                                <div className="max-lg:text-sm text-[15px] border-b py-3 px-2 flex justify-between ">
                                                    <div className="font-outfit-semibold text-color-3 dark:text-color-5">Age</div>
                                                    <div className="text-color-4 dark:text-color-5">{profileData.age}</div>
                                                </div>
                                                <div className="max-lg:text-sm text-[15px] border-b py-3 px-2 flex justify-between ">
                                                    <div className="font-outfit-semibold text-color-3 dark:text-color-5">Height</div>
                                                    <div className="text-color-4 dark:text-color-5">{profileData.height}</div>
                                                </div>
                                                <div className="max-lg:text-sm text-[15px] border-b py-3 px-2 flex justify-between ">
                                                    <div className="font-outfit-semibold text-color-3 dark:text-color-5">Net Worth</div>
                                                    <div className="text-color-4 dark:text-color-5">{profileData.net_worth}</div>
                                                </div>
                                                <div className="max-lg:text-sm text-[15px] border-b py-3 px-2 flex justify-between ">
                                                    <div className="font-outfit-semibold text-color-3 dark:text-color-5">Merital Status</div>
                                                    <div className="text-color-4 dark:text-color-5">{profileData.marital_status}</div>
                                                </div>
                                                <div className="max-lg:text-sm text-[15px] border-b py-3 px-2 flex justify-between ">
                                                    <div className="font-outfit-semibold text-color-3 dark:text-color-5">Children</div>
                                                    <div className="text-color-4 dark:text-color-5">{profileData.children}</div>
                                                </div>
                                                <div className="max-lg:text-sm text-[15px] border-b py-3 px-2 flex justify-between ">
                                                    <div className="font-outfit-semibold text-color-3 dark:text-color-5">Education</div>
                                                    <div className="text-color-4 dark:text-color-5">{profileData.education}</div>
                                                </div>
                                                <div className="max-lg:text-sm text-[15px] border-b py-3 px-2 flex justify-between ">
                                                    <div className="font-outfit-semibold text-color-3 dark:text-color-5">Citizenship</div>
                                                    <div className="text-color-4 dark:text-color-5">{profileData.citizenship}</div>
                                                </div>
                                                <div className="max-lg:text-sm text-[15px] border-b py-3 px-2 flex justify-between ">
                                                    <div className="font-outfit-semibold text-color-3 dark:text-color-5">Residence</div>
                                                    <div className="text-color-4 dark:text-color-5">{profileData.residence}</div>
                                                </div>
                                                <div className="max-lg:text-sm text-[15px] py-3 px-2 flex justify-between ">
                                                    <div className="font-outfit-semibold text-color-3 dark:text-color-5">Career Status</div>
                                                    <div className="text-color-4 dark:text-color-5">{profileData.career_status}</div>
                                                </div>
                                            </>
                                        )
                                        :
                                        (
                                            <>
                                                {
                                                    Array.from({ length: 8 }, (v, index) => {

                                                        return (<div key={index} className="max-lg:text-sm text-[15px] py-3 px-2 flex justify-between ">
                                                            <div className="w-20 h-2 animate-pulse bg-color-5 rounded-full font-outfit-semibold text-color-3 dark:text-color-5"></div>
                                                            <div className="w-16 h-2 animate-pulse rounded-full bg-color-5 rounded-fulltext-color-4 dark:text-color-5"></div>
                                                        </div>);
                                                    })
                                                }

                                            </>
                                        )
                                }

                            </div>

                        </div>
                        <div className="lg:w-1/2 max-lg:hidden flex justify-end">
                            <div className="w-4/5 h-full bg-color-5 relative">
                                <div className=" text-3xl text-color-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-fit">Ad</div>
                            </div>
                        </div>

                    </div>
                </section>

                {
                    profileUserMetaData ?
                        (
                            <section className='mt-10'>
                                <div className='lg:px-28 max-lg:px-4 flex w-full h-fit lg:mt-5 lg:mb-14 max-lg:mb-5 items-center gap-5'>
                                    <div className='text-color-3 dark:text-color-5'>Rating:</div>
                                    <div className="rating flex flex-row-reverse justify-center">
                                        <input value="5" name="rating" id="star5" checked={rating === 5 ? true : false} onChange={() => { handleRating(5) }} type="radio" className="hidden peer" />
                                        <label htmlFor="star5" className="peer-checked:text-color-1 text-gray-300 transition-colors duration-300 before:content-['\2605'] before:text-3xl cursor-pointer peer-hover:text-color-1"></label>

                                        <input value="4" name="rating" id="star4" checked={rating === 4 ? true : false} onChange={() => { handleRating(4) }} type="radio" className="hidden peer" />
                                        <label htmlFor="star4" className="peer-checked:text-color-1 text-gray-300 transition-colors duration-300 before:content-['\2605'] before:text-3xl cursor-pointer peer-hover:text-color-1"></label>

                                        <input value="3" name="rating" id="star3" checked={rating === 3 ? true : false} onChange={() => { handleRating(3) }} type="radio" className="hidden peer" />
                                        <label htmlFor="star3" className="peer-checked:text-color-1 text-gray-300 transition-colors duration-300 before:content-['\2605'] before:text-3xl cursor-pointer peer-hover:text-color-1"></label>

                                        <input value="2" name="rating" id="star2" checked={rating === 2 ? true : false} onChange={() => { handleRating(2) }} type="radio" className="hidden peer" />
                                        <label htmlFor="star2" className="peer-checked:text-color-1 text-gray-300 transition-colors duration-300 before:content-['\2605'] before:text-3xl cursor-pointer peer-hover:text-color-1"></label>

                                        <input value="1" name="rating" id="star1" checked={rating === 1 ? true : false} onChange={() => { handleRating(1) }} type="radio" className="hidden peer" />
                                        <label htmlFor="star1" className="peer-checked:text-color-1 text-gray-300 transition-colors duration-300 before:content-['\2605'] before:text-3xl cursor-pointer peer-hover:text-color-1"></label>
                                    </div>
                                    <div className='text-color-3 dark:text-color-5'>
                                        {
                                            rating && (<><span>{rating}</span>/<span>5</span></>)
                                        }

                                    </div>
                                </div>

                            </section>
                        )
                        :
                        (
                            <>
                                <section className='mt-10'>
                                    <div className='lg:px-28 max-lg:px-4 flex w-full h-fit lg:mt-5 lg:mb-14 max-lg:mb-5 items-center gap-5'>
                                        <div className='text-color-3 dark:text-color-5'>Rating:</div>
                                        <div className="rating flex flex-row-reverse justify-center">
                                            <input value="5" name="rating" id="star5" onChange={() => { handleRating(5) }} type="radio" className="hidden peer" />
                                            <label htmlFor="star5" className="peer-checked:text-color-1 text-gray-300 transition-colors duration-300 before:content-['\2605'] before:text-3xl cursor-pointer peer-hover:text-color-1"></label>

                                            <input value="4" name="rating" id="star4" onChange={() => { handleRating(4) }} type="radio" className="hidden peer" />
                                            <label htmlFor="star4" className="peer-checked:text-color-1 text-gray-300 transition-colors duration-300 before:content-['\2605'] before:text-3xl cursor-pointer peer-hover:text-color-1"></label>

                                            <input value="3" name="rating" id="star3" onChange={() => { handleRating(3) }} type="radio" className="hidden peer" />
                                            <label htmlFor="star3" className="peer-checked:text-color-1 text-gray-300 transition-colors duration-300 before:content-['\2605'] before:text-3xl cursor-pointer peer-hover:text-color-1"></label>

                                            <input value="2" name="rating" id="star2" onChange={() => { handleRating(2) }} type="radio" className="hidden peer" />
                                            <label htmlFor="star2" className="peer-checked:text-color-1 text-gray-300 transition-colors duration-300 before:content-['\2605'] before:text-3xl cursor-pointer peer-hover:text-color-1"></label>

                                            <input value="1" name="rating" id="star1" onChange={() => { handleRating(1) }} type="radio" className="hidden peer" />
                                            <label htmlFor="star1" className="peer-checked:text-color-1 text-gray-300 transition-colors duration-300 before:content-['\2605'] before:text-3xl cursor-pointer peer-hover:text-color-1"></label>
                                        </div>
                                        <div className='text-color-3 dark:text-color-5'>
                                        {
                                            rating!==0 && (<><span>{rating}</span>/<span>5</span></>)
                                        }

                                    </div>

                                    </div>

                                </section>
                            </>
                        )
                }

                <section className='mb-10'>
                    <div className='lg:px-28 max-lg:px-4 space-y-5'>
                        <div className="text-color-3 text-xl lg:text-2xl font-outfit-semibold border-b py-3 dark:text-color-5 flex gap-5">
                            <span>
                            {
                            profileData ?
                            (
                                profileData.comment.length
                                
                            )
                            :
                            (
                                <>
                                0
                                </>
                            )
                        }
                            </span>
                            <span>Comments</span>

                        </div>

                        <div>
                            <div >
                                <AddComment profileId={profileId} fetchProfileData={refreshData} />
                            </div>
                        </div>

                        {
                            profileData ?
                            (
                                profileData.comment.length > 0 && 
                                    profileData.comment.map((comment,index)=>{
                                        return <CommentCard key={index} commentData={comment} refreshData={refreshData} />
                                    })
                                
                            )
                            :
                            (
                                <></>
                            )
                        }
                       
                       
                    </div>
                </section>

            </main>

        </>
    );
}

export default Profile;