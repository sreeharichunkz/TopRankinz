import React, { useState, useEffect } from 'react';
import UserApi from '../../api/admin/user/userApi';
import UserForm from '../../components/admin/user/UserForm';

import Cookies from 'js-cookie';
// import { Link } from 'react-router-dom';

const Users = () => {
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [UserData, setUserData] = useState([]);
    

    const User_get_quantity = Cookies.get('admin_get_quantity') ?? Cookies.set('admin_get_quantity', 10) ? Cookies.get('admin_get_quantity') : 10;
    let User_get_page = Cookies.get('admin_get_upage') ?? Cookies.set('admin_get_upage', 1) ? Cookies.get('admin_get_upage') : 1;

   

    const [res_data, setData] = useState(null);
    const [basePath, setBasePath] = useState('');
    const [get_quantity, setGetQuantity] = useState(User_get_quantity);
    const [rankingPage, setRankingPage] = useState(User_get_page);


    const handleQuantityChange = (event) => {
        const quantity = Number(event.target.value)
        setGetQuantity(quantity);
        handlePage(1);
        Cookies.set('admin_get_quantity', quantity);
        Cookies.set('admin_get_upage', 1);
    };

    const fetchUserData = async (get_quantity = 10, rankingPage = 1) => {
        try {
            const response = await UserApi.get(get_quantity, rankingPage);
            const { data, base_path } = response;

            if(!data.data.length){
                Cookies.set('admin_get_quantity', 10);
                Cookies.set('admin_get_spage', 1);
                setRankingPage(1);
                setGetQuantity(10);
            }
            
            setData(data);
            setUserData(data.data);
            setBasePath(base_path);

        } catch (error) {
            console.error('Error fetching User data:', error.response);
        }
    };

    const handlePage = (page) => {
        setRankingPage(page);
        Cookies.set('admin_get_upage', page);
    }

    useEffect(() => {
        fetchUserData(get_quantity, rankingPage);

    }, [get_quantity, rankingPage, showModal]);



    const handleCloseModal = () => {
        setShowModal(false);
    };
   

    const handleEdit = (User) => {
        setIsEditMode(true);
        setSelectedUser(User);
        setShowModal(true);
    };

    const handleDelete = async (UserId) => {
        try {
            await UserApi.destroy(UserId);
            setShowDeleteModal(false, 0);
            fetchUserData(); // Refresh the User list

        } catch (error) {
            console.error('Error deleting User:', error);
        }
    };

    const handleDeleteModal = (state = false, id) => {

        setSelectedUser(id);
        setShowDeleteModal(state);
    };



    return (
        <>
            <div className='w-full max-w-screen overflow-hidden lg:px-28 min-h-screen bg-color-6 dark:bg-color-4 space-y-5 pt-8 lg:pt-16'>
                
                <div className="max-lg:mx-5">
                    <div className="lg:flex lg:gap-3 grid grid-cols-2 gap-x-4 gap-y-2">
                      
                      
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

                    </div>
                </div>
                <div className="bg-white dark:bg-color-2">

                    <div className="lg:px-5 py-6 w-full overflow-x-auto">
                        <table className="table table-auto max-lg:w-max max-lg:min-w-full w-full overflow-x-auto">
                            <thead>
                                <tr className=" border-b-[0.5px] border-gray-100 dark:border-color-4">
                                    <td className="text-xs text-color-4 dark:text-color-5 py-3 px-2 ">S No.</td>                                   
                                    <td className="text-xs text-color-4 dark:text-color-5 py-3 px-2">NAME</td>
                                    <td className="text-xs text-color-4 dark:text-color-5  py-3 px-2">USERNAME</td>
                                    <td className="text-xs text-color-4 dark:text-color-5  py-3 px-2">EMAIL</td>
                                    <td className="text-xs text-color-4 dark:text-color-5  py-3 px-2">NUMBER</td>                                    
                                    <td className="text-xs text-color-4 dark:text-color-5 py-3 px-2 sticky right-0 bg-white dark:bg-color-2">ACTIONS</td>
                                </tr>
                            </thead>
                            <tbody className='w-[500px] overflow-x-auto'>
                                {UserData.length > 0 ? (

                                    UserData.map((User, index) => {
                                        let rank = res_data.from;

                                        return <tr key={index} className=" border-b-[0.5px] border-gray-100 dark:border-color-4 *:py-3 *:px-2 group hover:bg-color-6 hover:dark:bg-color-4">
                                            <td className=" text-color-3 dark:text-color-5  font-outfit-medium">{rank + index}.</td>

                                           
                                            <td className=" text-color-3 dark:text-color-5 font-outfit-medium">{User.name}</td>
                                            <td className=" text-color-3 dark:text-color-5 font-outfit-medium">{User.username}</td>
                                            <td className=" text-color-3 dark:text-color-5 font-outfit-medium">{User.email}</td>
                                            <td className=" text-color-3 dark:text-color-5 font-outfit-medium">{User.number}</td>                                          

                                            <td className=' w-fit sticky right-0 bg-white dark:bg-color-2 group-hover:bg-color-6 group-hover:dark:bg-color-4'>
                                                <div className='invisible group-hover:visible flex gap-2 bg-inherit w-20'>                                                   
                                                    <button onClick={() => handleEdit(User)}>
                                                        <svg className='max-lg:size-5 stroke-blue-500 hover:fill-blue-500 hover:stroke-white' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                                                    </button>
                                                    <button onClick={() => handleDeleteModal(true, User.id)}>
                                                        <svg className='max-lg:size-5 fill-none stroke-red-500 hover:fill-red-500 hover:stroke-white ' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                                                    </button>

                                                </div>
                                            </td>
                                        </tr>
                                    })

                                ) : (
                                    <>
                                        {
                                           
                                            <tr>
                                                <td colSpan={6}>
                                                    <div>No User Found</div>
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
                                                 <div className="text-color-3 dark:text-color-4 h-9 w-7 flex items-center justify-center select-none cursor-pointer">...</div>
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
                                             <div className="text-color-3 dark:text-color-4 h-9 w-7 flex items-center justify-center select-none cursor-pointer">...</div>
                                            <div key={index} onClick={()=>{handlePage(ipage)}} className="text-color-3 dark:text-color-5 hover:text-white hover:bg-color-1 h-9 w-7 flex items-center justify-center select-none cursor-pointer">{ipage}</div>
                                            
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
            {showModal && (
                <UserForm
                    onClose={handleCloseModal}
                    isEditMode={isEditMode}
                    user={selectedUser}
                    fetchUsers={fetchUserData}
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
                                        onClick={() => handleDelete(selectedUser)}
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

export default Users;
