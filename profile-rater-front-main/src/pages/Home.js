import React from "react";
// import Hero from '../components/home/Hero'r;
import HeroSlider from '../components/home/HeroSlider';
import Card from "../components/home/Card";
import { Link } from "react-router-dom";
import profile from '../api/user/profile/profileGet';
import { useState, useEffect } from 'react';
import RankCard from "../components/home/RankCard";


export default function Home() {

    const [profileData, setProfileData] = useState(null);
    const [stateProfileData, setStateProfileData] = useState(null);
    const [state, setState] = useState('');
    const [basePath, setBasePath] = useState('');
    const [filter, setFilter] = useState(null);

    useEffect(() => {
        fetchProfileData(6);
    }, []);

    const fetchProfileData = async (get_quantity) => {
        try {
            const response = await profile.get(get_quantity);
            const { data, base_path } = response;
            const profile_data = data.data;
            setProfileData(profile_data);
            setBasePath(base_path);
        } catch (error) {
            console.error('Error fetching profile data:', error.response);
        }
    };

    const handleStateChange = (e, reset = false) => {

        const fetchStateProfileData = async (get_quantity = 5, state) => {
            try {
                const response = await profile.getFilterData(get_quantity, 1, {state:state,order_by_dir:'desc'});
                const { data } = response;
                const profile_data = data.data;
                setStateProfileData(profile_data);
            } catch (error) {
                console.error('Error fetching profile data:', error.response);
            }
        };

        if (reset) {
            setState('');
            fetchStateProfileData(5, '');
        }
        else {
            const state = e.target.value;
            setState(state);

            fetchStateProfileData(5, state);


        }

    };
    const fetchFilter = async () => {
        try {
            const response = await profile.getFilter();
            setFilter(response);

        } catch (error) {
            console.error('Error fetching Filter:', error.response);
        }
    };

    useEffect(() => {
        fetchFilter();
    }, []);



    return (
        <>
            <main className="bg-color-6 dark:bg-black max-lg:py-3 lg:pt-3 min-h-screen">
                <HeroSlider />

                <section>
                    <div className="lg:px-14 w-full lg:flex gap-x-8 h-max">
                        <div className="px-4 lg:px-8 py-6 lg:py-8 space-y-6 lg:space-y-8 lg:w-[65%] my-3 lg:my-8 bg-white dark:bg-color-2 min-h-max">
                            <div className="text-2xl font-outfit-bold text-color-3 dark:text-color-6">Featured This Week</div>
                            <div className=" grid grid-cols-2 md:grid-cols-3 gap-3 lg:gap-x-6 lg:gap-y-5 w-full">

                                {
                                    profileData ? (
                                        <>
                                            {
                                                profileData.map((profile, index) => {

                                                    return <Card key={index} industry={profile.industry} name={profile.name} image_url={`${basePath}/${profile.image}`} id={profile.id} />;
                                                })

                                            }

                                        </>
                                    ) : (
                                        <>
                                            <Card loading={true} />
                                            <Card loading={true} />
                                            <Card loading={true} />
                                            <Card loading={true} />
                                            <Card loading={true} />
                                            <Card loading={true} />
                                        </>
                                    )

                                }

                            </div>
                        </div>
                        <div className="px-4 lg:px-8 py-6 lg:py-8 space-y-7 lg:space-y-8 lg:flex-grow my-4 lg:my-8 bg-white dark:bg-color-2">

                            <div className="text-2xl font-outfit-bold text-color-3 dark:text-color-6">Current Top 5</div>
                            <div className="flex gap-3">
                                <button onClick={() => { handleStateChange(this, true) }} className="text-sm bg-color-1 text-white px-6 py-2 rounded-full">Overall</button>
                                <div className="flex items-center   cursor-pointer relative text-color-2">
                                    <select name="" id="state" onChange={handleStateChange} value={state} className="appearance-none bg-transparent outline-none text-sm  cursor-pointer px-6 py-2 pr-10 border  rounded-full relative z-20 dark:text-color-5 w-28">
                                        <option className="dark:text-color-3" value="">State</option>
                                        {
                                                filter ?

                                                    Object.keys(filter.state).map((state, index) => {
                                                        return <option key={index} className="dark:text-color-3" value={state}>{state}</option>
                                                    })

                                                    :
                                                    <>
                                                    </>
                                            }
                                    </select>
                                    <span className="absolute right-4 z-10">
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="fill-[#1C1B1F] dark:fill-color-5">
                                            <mask id="mask0_99_183" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="20">
                                                <rect width="20" height="20" fill="#D9D9D9" />
                                            </mask>
                                            <g mask="url(#mask0_99_183)">
                                                <path d="M10.0001 12.4792C9.88897 12.4792 9.7848 12.4618 9.68758 12.4271C9.59036 12.3924 9.50008 12.3333 9.41675 12.25L5.58341 8.41666C5.43064 8.26388 5.35425 8.06944 5.35425 7.83333C5.35425 7.59722 5.43064 7.40277 5.58341 7.24999C5.73619 7.09722 5.93064 7.02083 6.16675 7.02083C6.40286 7.02083 6.5973 7.09722 6.75008 7.24999L10.0001 10.5L13.2501 7.24999C13.4029 7.09722 13.5973 7.02083 13.8334 7.02083C14.0695 7.02083 14.264 7.09722 14.4167 7.24999C14.5695 7.40277 14.6459 7.59722 14.6459 7.83333C14.6459 8.06944 14.5695 8.26388 14.4167 8.41666L10.5834 12.25C10.5001 12.3333 10.4098 12.3924 10.3126 12.4271C10.2154 12.4618 10.1112 12.4792 10.0001 12.4792Z" fill="" />
                                            </g>
                                        </svg>

                                    </span>
                                </div>
                            </div>
                            <div>
                                <div className="w-full space-y-2">
                                    <div className="flex justify-between  text-[11px] text-color-4 dark:text-color-5">
                                        <span className="flex items-center gap-5">
                                            <div className="w-10"></div>
                                            <div>NAME</div>
                                        </span>
                                        <span>INDUSTRY</span>
                                    </div>
                                    <div className="text-color-3 *:flex *:justify-between *:border-b-[0.5px] *:border-b-gray-100  *:py-3 dark:text-color-6 *:dark:border-color-4">

                                        {
                                            profileData ? (
                                                stateProfileData ?
                                                    (
                                                        <>
                                                            {
                                                                stateProfileData.length > 0 ? stateProfileData.slice(0, 5).map((profile, index) => {

                                                                    return <RankCard key={index} industry={profile.industry} name={profile.name} image_url={`${basePath}/${profile.image}`} id={profile.id} />
                                                                })
                                                                    :
                                                                    (
                                                                        <>
                                                                            <div className=" h-[285px]">
                                                                                <div className="text-center w-full">
                                                                                No Profile Found

                                                                                </div>
                                                                                
                                                                            </div>
                                                                           
                                                                        </>
                                                                    )
                                                            }

                                                        </>


                                                    ) :
                                                    (
                                                        <>
                                                            {
                                                                profileData.slice(0, 5).map((profile, index) => {

                                                                    return <RankCard key={index} industry={profile.industry} name={profile.name} image_url={`${basePath}/${profile.image}`} id={profile.id} />
                                                                })
                                                            }
                                                        </>
                                                    )
                                            ) : (
                                                <>

                                                    <RankCard loading={true} />
                                                    <RankCard loading={true} />
                                                    <RankCard loading={true} />
                                                    <RankCard loading={true} />
                                                    <RankCard loading={true} />

                                                </>
                                            )
                                        }


                                    </div>
                                </div>
                            </div>
                            <div className="text-center lg:text-end">
                                <Link to="ranking" className="text-color-1 underline decoration-color-1">View full ranking</Link>
                            </div>


                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
