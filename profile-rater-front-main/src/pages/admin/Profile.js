import React, { useState, useEffect } from 'react';
import ProfileForm from '../../components/admin/profile/ProfileForm';
import profileApi from '../../api/admin/profile/profileApi';



import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

const Profile = () => {
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [selectedProfile, setSelectedProfile] = useState(null);
    const [profileData, setProfileData] = useState([]);

    const profile_get_quantity = Cookies.get('admin_get_quantity') ?? Cookies.set('admin_get_quantity', 10) ? Cookies.get('admin_get_quantity') : 10;
    let profile_get_page = Cookies.get('admin_get_ppage') ?? Cookies.set('admin_get_ppage', 1) ? Cookies.get('admin_get_ppage') : 1;

   
    const [res_data, setData] = useState(null);
    const [basePath, setBasePath] = useState('');
    const [get_quantity, setGetQuantity] = useState(profile_get_quantity);
    const [rankingPage, setRankingPage] = useState(profile_get_page);

    const [state, setState] = useState('');
    const [district, setDistrict] = useState('');
    const [industry, setIndustry] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [orderBy, setOrderBy] = useState('');
    const [orderByDir, setOrderByDir] = useState('');
    const [filter, setFilter] = useState(null);


    const handleQuantityChange = (event) => {
        const quantity = Number(event.target.value)
        setGetQuantity(quantity);
        handlePage(1);
        Cookies.set('admin_get_quantity', quantity);
        Cookies.set('admin_get_ppage', 1);
    };

    // const fetchProfileData = async (get_quantity = 10, ranking_page = rankingPage) => {
    //     try {
    //         const response = await profileApi.get(get_quantity, ranking_page);
    //         const { data, base_path } = response;
            
    //         if(!data.data.length){
    //             Cookies.set('admin_get_quantity', 10);
    //             Cookies.set('admin_get_ppage', 1);
    //             setRankingPage(1);
    //             setGetQuantity(10);

    //         }

    //         setData(data);
    //         setProfileData(data.data);
    //         setBasePath(base_path);

    //     } catch (error) {
    //         console.error('Error fetching profile data:', error.response);
    //         Cookies.set('admin_get_quantity', 10);
    //         Cookies.set('admin_get_ppage', 1);
    //     }
    // };

    const handlePage = (page) => {
        setRankingPage(page);
        Cookies.set('admin_get_ppage', page);
    }

    // useEffect(() => {
    //     fetchProfileData(get_quantity, rankingPage);

    // }, [get_quantity, rankingPage, showModal]);



    const fetchProfileData = async (get_quantity = 10, ranking_page = rankingPage) => {
        try {
            const response = await profileApi.getFilterData(get_quantity, ranking_page, {

                state: state,
                district: district,
                industry: industry,
                order_by: orderBy,
                order_by_dir: orderByDir,
            });
            const { data, base_path } = response;

            setData(data);
            setProfileData(data.data);
            setBasePath(base_path);
        } catch (error) {
            console.error('Error fetching profile data:', error.response);
        }
    };


    const handleOpenModal = () => {
        setIsEditMode(false);
        setSelectedProfile(null);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleEdit = (profile) => {
        setIsEditMode(true);
        setSelectedProfile(profile);
        setShowModal(true);
    };

    const handleDelete = async (profileId) => {
        try {
            await profileApi.destroy(profileId);
            setShowDeleteModal(false, 0);
            fetchProfileData(); 

        } catch (error) {
            console.error('Error deleting profile:', error);
        }
    };

    const handleDeleteModal = (state = false, id) => {

        setSelectedProfile(id);
        setShowDeleteModal(state);
    };


    const fetchFilter = async () => {
        try {
            const response = await profileApi.getFilter();
            setFilter(response);

        } catch (error) {
            console.error('Error fetching Filter:', error.response);
        }
    };

    const handleStateChange = (e) => {

        const state = e.target.value;
        setState(state);
        handlePage(1);
        Cookies.set('get_page', 1);

    };

    const handleDistrictChange = (e) => {

        const district = e.target.value;
        setDistrict(district);
        handlePage(1);
        Cookies.set('get_page', 1);

    };

    const handleIndustryChange = (e) => {

        const industry = e.target.value;
        setIndustry(industry);
        handlePage(1);
        Cookies.set('get_page', 1);

    };
    const handleSortBy = (e)=>{
        const sort_by = e.target.value;
        setSortBy(sort_by);
        
        if(sort_by==='name'){
            setOrderBy('name');
            setOrderByDir('asc');
        }
        else if(sort_by==='likes_h'){
            setOrderBy('profile_like_count');
            setOrderByDir('desc');
        }
        else if(sort_by==='likes_l'){
            setOrderBy('profile_like_count');
            setOrderByDir('asc');
        }
        else if(sort_by==='dislikes_h'){
            setOrderBy('profile_dislike_count');
            setOrderByDir('desc');
        }
        else if(sort_by==='dislikes_l'){
            setOrderBy('profile_dislike_count');
            setOrderByDir('asc');
        }
    }

   

    const resetFilter = () => {
        setState('');
        setDistrict('');
        setIndustry('');
        setSortBy('');
        handlePage(1);
        Cookies.set('get_page', 1);
    }
    useEffect(() => {


        const fetchFilterProfileData = async (get_quantity = 10, ranking_page = rankingPage) => {
            try {
                const response = await profileApi.getFilterData(get_quantity, ranking_page, {

                    state: state,
                    district: district,
                    industry: industry,
                    order_by: orderBy,
                    order_by_dir: orderByDir,
                });
                const { data, base_path } = response;

                setData(data);
                setProfileData(data.data);
                setBasePath(base_path);
            } catch (error) {
                console.error('Error fetching profile data:', error.response);
            }
        };
        fetchFilterProfileData();

    }, [get_quantity, rankingPage, state, district, industry,orderBy,orderByDir]);

    useEffect(() => {
        fetchFilter();
    }, []);



    return (
        <>
            <div className='w-full max-w-screen overflow-hidden lg:px-28 min-h-screen bg-color-6 dark:bg-color-4 space-y-5'>
                <div className='w-fit mx-auto pt-10'>
                    <button onClick={handleOpenModal} className="bg-color-1 hover:bg-color-1/80 w-fit px-10 rounded-md text-white py-3">Add Profile</button>
                </div>
                <div className="max-lg:mx-5">
                                <div className="lg:flex lg:gap-3 grid grid-cols-2 gap-x-4 gap-y-2">
                                    <div className="flex items-center w-full lg:w-44  cursor-pointer relative text-color-2">
                                        <select value={state} onChange={handleStateChange} name="" className="appearance-none bg-transparent outline-none text-sm font-outfit-semibold  cursor-pointer px-5 w-full py-3 border-2 relative z-20 dark:text-color-5">
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
                                    <div className="flex items-center w-full lg:w-44  cursor-pointer relative text-color-2">
                                        <select onChange={handleDistrictChange} value={district} name="" className="appearance-none bg-transparent outline-none text-sm font-outfit-semibold  cursor-pointer px-5 w-full py-3 border-2 relative z-20 dark:text-color-5">
                                            <option className='dark:text-color-3' value="" >District</option>
                                            {
                                                filter && state ?

                                                    filter.state[state].map((district, index) => {
                                                        return <option key={index} className="dark:text-color-3" value={district}>{district}</option>
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
                                    <div className="flex items-center w-full lg:w-44  cursor-pointer relative text-color-2">
                                        <select onChange={handleIndustryChange} value={industry} name="" className="appearance-none bg-transparent outline-none text-sm font-outfit-semibold  cursor-pointer px-5 w-full py-3 border-2 relative z-20 dark:text-color-5">
                                            <option className='dark:text-color-3' value="">Industry</option>
                                            {
                                                filter ?

                                                    filter.industry.map((industry, index) => {
                                                        return <option key={index} className="dark:text-color-3" value={industry}>{industry}</option>
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
                                    <div className="flex items-center w-full lg:w-44  cursor-pointer relative text-color-2">
                                        <select value={sortBy} onChange={handleSortBy} name="" className="appearance-none bg-transparent outline-none text-sm font-outfit-semibold  cursor-pointer px-5 w-full py-3 border-2 relative z-20 dark:text-color-5">
                                            <option className='dark:text-color-3' value="">Sort by</option>
                                            <option className='dark:text-color-3' value="name">Name</option>
                                            <option className='dark:text-color-3' value="likes_h">Likes (High)</option>
                                            <option className='dark:text-color-3' value="likes_l">Likes (Low)</option>
                                            <option className='dark:text-color-3' value="dislikes_h">Dislikes (High)</option>
                                            <option className='dark:text-color-3' value="dislikes_l">Dislikes (Low)</option>
                                          
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
                                    <div className="flex items-center w-full lg:w-44  cursor-pointer relative text-color-2">
                                        <select name="" onChange={handleQuantityChange} value={get_quantity} className="appearance-none bg-transparent outline-none text-sm font-outfit-semibold  cursor-pointer px-5 w-full py-3 border-2 relative z-20 dark:text-color-5">
                                            <option className='dark:text-color-3' value="">Items</option>                                            
                                            <option className='dark:text-color-3' value="10">10</option>
                                            <option className='dark:text-color-3' value="25">25</option>
                                            <option className='dark:text-color-3' value="50">50</option>
                                            <option className='dark:text-color-3' value="100">100</option>
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
                                    <div className="flex items-center w-full lg:w-44  cursor-pointer relative text-color-2">

                                        <button onClick={resetFilter} type="submit" className="bg-color-1 w-full lg:w-28 flex items-center justify-center gap-3 rounded-md text-white py-3">
                                            <svg className='fill-none scale-90' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
                                            <span>Reset</span>
                                        </button>
                                    </div>

                                </div>
                            </div>
                <div className="bg-white dark:bg-color-2">

                    <div className="lg:px-5 py-6 w-full overflow-x-auto">
                        <table className="table table-auto max-lg:w-max w-full overflow-x-auto">
                            <thead>
                                <tr className=" border-b-[0.5px] border-gray-100 dark:border-color-4">
                                    <td className="text-xs text-color-4 dark:text-color-5 py-3 px-2 ">S No.</td>
                                    <td className="text-xs text-color-4 dark:text-color-5 py-3 px-2">
                                        <span className="flex items-center gap-6">
                                            <div className="w-10"></div>
                                            <div>NAME</div>
                                        </span>
                                    </td>
                                    <td className="text-xs text-color-4 dark:text-color-5 py-3 px-2 max-lg:hiddenn">INDUSTRY</td>
                                    <td className="text-xs text-color-4 dark:text-color-5  py-3 px-2 max-lg:hidden">STATE</td>
                                    {/* <td className="py-3 px-2 max-lg:hidden"></td>
                                <td className="py-3 px-2 max-lg:hidden"></td> */}
                                    <td className="text-xs text-color-4 dark:text-color-5 py-3 px-2">LIKES</td>
                                    <td className="text-xs text-color-4 dark:text-color-5 py-3 px-2">DISLIKES</td>
                                    <td className="text-xs text-color-4 dark:text-color-5 py-3 px-2 text-center">ACTIVE</td>
                                    <td className="text-xs text-color-4 dark:text-color-5 py-3 px-2 sticky right-0 bg-white dark:bg-color-2">ACTIONS</td>
                                </tr>
                            </thead>
                            <tbody className='w-[500px] overflow-x-auto'>
                                {profileData.length > 0 ? (

                                    profileData.map((profile, index) => {
                                        let rank = res_data.from;

                                        return <tr key={index} className=" border-b-[0.5px] border-gray-100 dark:border-color-4 *:py-3 *:px-2 group hover:bg-color-6 hover:dark:bg-color-4">
                                            <td className=" text-color-3 dark:text-color-5  font-outfit-medium">{rank + index}.</td>

                                            <td className=" text-color-3 dark:text-color-5 max-lg:text-sm font-outfit-medium">
                                                <span className="flex items-center gap-6">
                                                    <div className="size-10 rounded-full overflow-hidden bg-color-5">
                                                        <img src={`${basePath}/${profile.image}`} alt="" className="w-full h-full" />
                                                    </div>
                                                    <div>{profile.name}</div>
                                                </span>
                                            </td>
                                            <td className=" text-color-3 dark:text-color-5 max-lg:hiddenn font-outfit-medium">{profile.industry}</td>
                                            <td className=" text-color-3 dark:text-color-5 max-lg:hidden font-outfit-medium">{profile.state}</td>
                                           
                                            <td className=" text-color-3 dark:text-color-5 font-outfit-medium">{profile.profile_like_count}</td>
                                            <td className=" text-color-3 dark:text-color-5 font-outfit-medium">{profile.profile_like_count}</td>
                                            <td className="">
                                                {
                                                    profile.active_status === 'true' ? (
                                                        <div className='size-3 rounded-full bg-green-500 mx-auto '></div>
                                                    )
                                                        :
                                                        (
                                                            <div className='size-3  rounded-full bg-red-500 mx-auto'></div>

                                                        )
                                                }
                                            </td>

                                            <td className=' w-fit sticky right-0 bg-white dark:bg-color-2 group-hover:bg-color-6 group-hover:dark:bg-color-4'>
                                                <div className='invisible group-hover:visible flex gap-2 bg-inherit w-20'>
                                                    <Link to="/profile" state={{ admin:true, profile_id: profile.id }} className="text-color-1 underline decoration-color-1  hover:text-color-1/75">
                                                        <svg className='max-lg:size-5 stroke-color-1 hover:fill-color-1 hover:stroke-white' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                                    </Link>
                                                    <button onClick={() => handleEdit(profile)}>
                                                        <svg className='max-lg:size-5 stroke-blue-500 hover:fill-blue-500 hover:stroke-white' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                                                    </button>
                                                    <button onClick={() => handleDeleteModal(true, profile.id)}>
                                                        <svg className='max-lg:size-5 fill-none stroke-red-500 hover:fill-red-500 hover:stroke-white ' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                                                    </button>

                                                </div>
                                            </td>
                                        </tr>
                                    })

                                ) : (
                                    <>
                                        {
                                            
                                            <tr className=" border-b-[0.5px] border-gray-100 dark:border-color-4 *:py-3 *:px-2">
                                            <td className='text-color-3 dark:text-color-6'>
                                                 No Profile Found
                                            </td>
                                         </tr>
                                        }

                                    </>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <div className="px-5 pb-6 pt-3 flex items-center gap-1">

                            {
                                res_data ?
                                    Array.from({ length: res_data.last_page }, (page, index) => {

                                        let cpage = res_data.current_page;
                                        let lpage = res_data.last_page;
                                        let ipage = index+1;

                                        if(ipage===1 && cpage> 6){
                                            return  <>
                                                <div key={index} onClick={()=>{handlePage(ipage)}} className="text-color-3 dark:text-color-5 hover:text-white hover:bg-color-1 h-9 w-7 flex items-center justify-center select-none cursor-pointer">{ipage}</div>
                                                 <div key={index+1} className="text-color-3 dark:text-color-4 h-9 w-7 flex items-center justify-center select-none cursor-pointer">...</div>
                                               </>
                                        }

                                         if(ipage===cpage){
                                            return <div key={index} className="text-white bg-color-1 h-9 w-7 flex items-center justify-center select-none cursor-pointer">{index+1}</div>

                                        }
                                        if(ipage >cpage-5 && ipage < cpage+5){
                                            
                                            return <div key={index} onClick={()=>{handlePage(ipage)}} className="text-color-3 dark:text-color-5 hover:text-white hover:bg-color-1 h-9 w-7 flex items-center justify-center select-none cursor-pointer">{ipage}</div>;
                                        }

                                        if(ipage===lpage && cpage!==ipage){
                                            return <>
                                             <div key={index} className="text-color-3 dark:text-color-4 h-9 w-7 flex items-center justify-center select-none cursor-pointer">...</div>
                                            <div key={index+1} onClick={()=>{handlePage(ipage)}} className="text-color-3 dark:text-color-5 hover:text-white hover:bg-color-1 h-9 w-7 flex items-center justify-center select-none cursor-pointer">{ipage}</div>
                                            
                                            </>;
                                            
                                        }
                                        return < ></>;
                                    })
                                    :
                                    <div className="text-white bg-color-1 h-9 w-7 flex items-center justify-center select-none cursor-pointer">1</div>
                            }


                        </div>
                    </div>
                </div>

            </div>
            {showModal && (
                <ProfileForm
                    onClose={handleCloseModal}
                    isEditMode={isEditMode}
                    profile={selectedProfile}
                    fetchProfiles={fetchProfileData}
                    basePath={basePath}
                    
                />
            )}

            {
                showDeleteModal && (
                    <div className='w-full h-screen fixed top-0 bg-black/50 z-50'>
                        <div
                            className="group absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none w-[250px] flex flex-col p-4 items-center justify-center bg-gray-800 border border-gray-800 shadow-lg rounded-2xl"
                        >
                            <div className="">
                                <div className="text-center p-3 flex-auto justify-center">
                                    <svg
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        className="group-hover:animate-bounce w-12 h-12 flex items-center text-gray-600 fill-red-500 mx-auto"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            clipRule="evenodd"
                                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                            fillRule="evenodd"
                                        ></path>
                                    </svg>
                                    <h2 className="text-xl font-bold py-4 text-gray-200">Are you sure?</h2>
                                    <p className="font-bold text-sm text-gray-500 px-2">
                                        Do you really want to continue ? This process cannot be undone
                                    </p>
                                </div>
                                <div className="p-2 mt-2 text-center space-x-1 md:block">
                                    <button
                                        onClick={() => handleDeleteModal(false, 0)}
                                        className="mb-2 md:mb-0 bg-gray-700 px-5 py-2 text-sm shadow-sm font-medium tracking-wider border-2 border-gray-600 hover:border-gray-700 text-gray-300 rounded-full hover:shadow-lg hover:bg-gray-800 transition ease-in duration-300"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={() => handleDelete(selectedProfile)}
                                        className="bg-red-500 hover:bg-transparent px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-red-500 hover:border-red-500 text-white hover:text-red-500 rounded-full transition ease-in duration-300"
                                    >
                                        Confirm
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>


                )
            }
        </>
    );
};

export default Profile;
