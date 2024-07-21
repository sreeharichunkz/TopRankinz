import React from 'react';
import RankingCard from '../components/ranking/RankingCard';
import profile from '../api/user/profile/profileGet';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';


const Ranking = () => {

    const profile_get_quantity = Cookies.get('get_quantity') ?? Cookies.set('get_quantity', 10) ? Cookies.get('get_quantity') : 10;
    const profile_get_page = Cookies.get('get_page') ?? Cookies.set('get_page', 1) ? Cookies.get('get_page') : 1;

    const [profileData, setProfileData] = useState(null);
    const [res_data, setData] = useState(null);
    const [basePath, setBasePath] = useState('');
    const [get_quantity, setGetQuantity] = useState(profile_get_quantity);
    const [rankingPage, setRankingPage] = useState(profile_get_page);
    // const [filterProfileData, setFilterProfileData] = useState(null);
    const [state, setState] = useState('');
    const [district, setDistrict] = useState('');
    const [industry, setIndustry] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [orderBy, setOrderBy] = useState('');
    const [orderByDir, setOrderByDir] = useState('desc');
    const [filter, setFilter] = useState(null);


    const handleQuantityChange = (event) => {
        const quantity = Number(event.target.value)
        setGetQuantity(quantity);
        handlePage(1);
        Cookies.set('get_quantity', quantity);
        Cookies.set('get_page', 1);
    };

    // const fetchProfileData = async (get_quantity = 10, ranking_page = rankingPage) => {
    //     try {
    //         const response = await profile.get(get_quantity, ranking_page);
    //         const { data, base_path } = response;

    //         setData(data);
    //         setProfileData(data.data);
    //         setBasePath(base_path);

    //     } catch (error) {
    //         console.error('Error fetching profile data:', error.response);
    //     }
    // };

    const fetchFilter = async () => {
        try {
            const response = await profile.getFilter();
            setFilter(response);

        } catch (error) {
            console.error('Error fetching Filter:', error.response);
        }
    };

    // const fetchFilterProfileData = async (get_quantity = 10, ranking_page = rankingPage) => {
    //     try {
    //         const response = await profile.getFilterData(get_quantity, ranking_page, {

    //             state: state,
    //             district: district,
    //             industry: industry,
    //         });
    //         const { data, base_path } = response;

    //         setData(data);
    //         setProfileData(data.data);
    //         setBasePath(base_path);
    //     } catch (error) {
    //         console.error('Error fetching profile data:', error.response);
    //     }
    // };

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

    const handlePage = (page) => {
        setRankingPage(page);
        Cookies.set('get_page', page);
    }

    const resetFilter = () => {
        setOrderBy('profile_like_count');
        setOrderByDir('desc');
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
                const response = await profile.getFilterData(get_quantity, ranking_page, {

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
        setOrderBy('profile_like_count');
        setOrderByDir('desc');
        fetchFilter();
    }, []);








    return (
        <>

            <main className='bg-color-6 dark:bg-black'>
                <section className='min-h-screen'>
                    <div className="lg:mx-28">
                        <div className=" lg:space-y-8 py-5 space-y-5">
                            <div className="text-[24px] lg:text-[48px] font-outfit-bold text-color-3 dark:text-color-6 max-lg:mx-5">People Ranking</div>
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

                            <div className="bg-white dark:bg-color-2 lg:rounded">
                                <div className="px-2 lg:px-5 py-6 w-full overflow-x-auto">
                                    <table className="table table-auto  max-lg:w-max w-full overflow-x-auto">
                                        <thead>
                                            <tr className=" border-b-[0.5px] border-gray-100 dark:border-color-4">
                                                <td className="text-xs text-color-4 dark:text-color-5 py-3 px-2 ">RANK</td>

                                                <td className="text-xs text-color-4 dark:text-color-5 py-3 px-2">
                                                    <span className="flex items-center gap-6">
                                                        <div className="w-10"></div>
                                                        <div>NAME</div>
                                                    </span>
                                                </td>
                                                <td className="text-xs text-color-4 dark:text-color-5 py-3 px-2 max-lg:hidden">INDUSTRY</td>
                                                <td className="text-xs text-color-4 dark:text-color-5  py-3 px-2 max-lg:hidden">AGE</td>
                                                <td className="py-3 px-2 max-lg:hidden"></td>
                                                <td className="py-3 px-2 max-lg:hidden"></td>
                                                <td className="text-xs text-color-4 dark:text-color-5 py-3 px-2 max-lg:hidden">LIKES</td>
                                                <td className="text-xs text-color-4 dark:text-color-5 py-3 px-2 max-lg:hidden">DISLIKES</td>
                                                <td className="text-xs text-color-4 dark:text-color-5 py-3 px-2 text-center">RATING</td>
                                                <td className="text-xs text-color-4 dark:text-color-5 py-3 px-2 text-center"></td>

                                            </tr>
                                        </thead>
                                        <tbody className='w-[500px] overflow-x-auto'>
                                            {
                                                profileData ? profileData.length > 0 ? (
                                                    <>
                                                        {
                                                            profileData.map((profile, index) => {
                                                                let rank = res_data.from;

                                                                return <RankingCard key={index} rating={profile.rating} industry={profile.industry} name={profile.name} image_url={`${basePath}/${profile.image}`} id={profile.id} rank={rank + index} age={profile.age} like={profile.profile_like_count} dislike={profile.profile_dislike_count} />;
                                                            })

                                                        }

                                                    </>
                                                )
                                                    :
                                                    (
                                                        <>
                                                            <tr className=" border-b-[0.5px] border-gray-100 dark:border-color-4 *:py-3 *:px-2">
                                                               <td className='text-color-3 dark:text-color-6'>
                                                                    No Profile Found
                                                               </td>
                                                            </tr>

                                                        </>
                                                    )

                                                    : (
                                                        <>
                                                            {
                                                                Array.from({ length: profile_get_quantity }, (v, index) => {
                                                                    return <RankingCard key={index} loading={true} />
                                                                })
                                                            }


                                                        </>
                                                    )

                                            }

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
                                                    let ipage = index + 1;

                                                    if (ipage === 1 && cpage > 6) {
                                                        return <>
                                                            <div key={index} onClick={() => { handlePage(ipage) }} className="text-color-3 dark:text-color-5 hover:text-white hover:bg-color-1 h-9 w-7 flex items-center justify-center select-none cursor-pointer">{ipage}</div>
                                                            <div className="text-color-3 dark:text-color-4 h-9 w-7 flex items-center justify-center select-none cursor-pointer">...</div>
                                                        </>
                                                    }

                                                    if (ipage === cpage) {
                                                        return <div key={index} className="text-white bg-color-1 h-9 w-7 flex items-center justify-center select-none cursor-pointer">{index + 1}</div>

                                                    }
                                                    if (ipage > cpage - 5 && ipage < cpage + 5) {

                                                        return <div key={index} onClick={() => { handlePage(ipage) }} className="text-color-3 dark:text-color-5 hover:text-white hover:bg-color-1 h-9 w-7 flex items-center justify-center select-none cursor-pointer">{ipage}</div>;
                                                    }

                                                    if (ipage === lpage && cpage !== ipage) {
                                                        return <>
                                                            <div className="text-color-3 dark:text-color-4 h-9 w-7 flex items-center justify-center select-none cursor-pointer">...</div>
                                                            <div key={index} onClick={() => { handlePage(ipage) }} className="text-color-3 dark:text-color-5 hover:text-white hover:bg-color-1 h-9 w-7 flex items-center justify-center select-none cursor-pointer">{ipage}</div>

                                                        </>;

                                                    }
                                                    return <></>;


                                                })
                                                :
                                                <div className="text-white bg-color-1 h-9 w-7 flex items-center justify-center select-none cursor-pointer">1</div>
                                        }


                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
            </main>

        </>
    )
}

export default Ranking