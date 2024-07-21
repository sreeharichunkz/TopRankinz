import React, { useState, useEffect } from 'react';
import AwardRecognitionForm from './AwardRecognitionForm';
import AwardRecognitionApi from '../../../api/admin/profile/awardRecognitionApi';

const AwardRecognition = ({profile_id}) => {
    
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [selectedAwardRecognition, setSelectedAwardRecognition] = useState(null);
    const [AwardRecognitionData, setAwardRecognitionData] = useState([]);
  
    // const [res_data, setData] = useState(null);
    const [basePath, setBasePath] = useState('');   
   
    const fetchAwardRecognitionData = async (profile_id) => {
        try {
            const response = await AwardRecognitionApi.get(profile_id);
            const { data, base_path } = response;

            // setData(data);
            setAwardRecognitionData(data);
            setBasePath(base_path);

        } catch (error) {
            console.error('Error fetching AwardRecognition data:', error.response);
        }
    };

  

    useEffect(() => {

        if(!showModal){
            setTimeout(() => {
                fetchAwardRecognitionData(profile_id);            
            },200);
        }
        else{            
            fetchAwardRecognitionData(profile_id);            
        }

    }, [profile_id,showModal]);


    const handleOpenModal = () => {
        setIsEditMode(false);
        setSelectedAwardRecognition(null);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleEdit = (AwardRecognition) => {
        setIsEditMode(true);
        setSelectedAwardRecognition(AwardRecognition);
        setShowModal(true);
        
    };

    const handleDelete = async (AwardRecognitionId) => {
        
        try {
            await AwardRecognitionApi.destroy(profile_id,AwardRecognitionId);
            setShowDeleteModal(false);
            fetchAwardRecognitionData(profile_id); // Refresh the AwardRecognition list

        } catch (error) {
            console.error('Error deleting Award Recognition:', error);
        }
    };

    const handleDeleteModal = (state = false, id) => {

        setSelectedAwardRecognition(id);
        setShowDeleteModal(state);        
    };



    return (
        <>
            <div className={`w-full  ${showModal?'h-[500px]':''} overflow-hidden rounded-md lg:px-5 min-h-screen bg-color-6 dark:bg-color-4 space-y-5`}>
                <div className='w-fit mx-auto pt-10'>
                    <button onClick={handleOpenModal} className="bg-color-1 hover:bg-color-1/80 w-fit px-10 rounded-md text-white py-3">Add Award & Recognition</button>
                </div>
              
                <div className="bg-white dark:bg-color-2 overflow-hidden lg:rounded-md">

                    <div className="px-0 py-6 w-full overflow-x-auto">
                        <table className="table table-auto min-w-full max-lg:w-max w-full overflow-x-auto">
                            <thead>
                                <tr className=" border-b-[0.5px] border-gray-100 dark:border-color-4">
                                    <td className="text-xs text-color-4 dark:text-color-5 py-3 px-2 ">S No.</td>
                                    <td className="text-xs text-color-4 dark:text-color-5 py-3 px-2">
                                        <span className="flex items-center gap-6">
                                            <div className="w-10"></div>
                                            <div>NAME</div>
                                        </span>
                                    </td>
                                    <td className="text-xs text-color-4 dark:text-color-5 py-3 px-2 max-lg:hiddenn">DATE</td>                                    
                                    <td className="text-xs text-color-4 dark:text-color-5 py-3 px-2 sticky right-0 bg-white dark:bg-color-2">ACTIONS</td>
                                </tr>
                            </thead>
                            <tbody className='w-[500px] overflow-x-auto'>
                                {AwardRecognitionData.length > 0 ? (

                                    AwardRecognitionData.map((AwardRecognition, index) => {
                                        
                                        return <tr key={index} className=" border-b-[0.5px] border-gray-100 dark:border-color-4 *:py-3 *:px-2 group hover:bg-color-6 hover:dark:bg-color-4">
                                            <td className=" text-color-3 dark:text-color-5  font-outfit-medium">{index+1}.</td>

                                            <td className=" text-color-3 dark:text-color-5 max-lg:text-sm font-outfit-medium">
                                                <span className="flex items-center gap-6">
                                                    <div className="size-10 rounded-full overflow-hidden bg-color-5">
                                                        <img src={`${basePath}/${AwardRecognition.image}`} alt="" className="w-full h-full" />
                                                    </div>
                                                    <div>{AwardRecognition.name}</div>
                                                </span>
                                            </td>
                                            <td className=" text-color-3 dark:text-color-5 max-lg:hiddenn font-outfit-medium">{AwardRecognition.date}</td>
                                          

                                            <td className=' w-fit sticky right-0 bg-white dark:bg-color-2 group-hover:bg-color-6 group-hover:dark:bg-color-4'>
                                                <div className='invisible group-hover:visible flex justify-end gap-2 bg-inherit w-20'>
                                                   
                                                    <button onClick={() => handleEdit(AwardRecognition)}>
                                                        <svg className='max-lg:size-5 stroke-blue-500 hover:fill-blue-500 hover:stroke-white' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                                                    </button>
                                                    <button onClick={() => handleDeleteModal(true, AwardRecognition.id)}>
                                                        <svg className='max-lg:size-5 fill-none stroke-red-500 hover:fill-red-500 hover:stroke-white ' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                                                    </button>

                                                </div>
                                            </td>
                                        </tr>
                                    })

                                ) : (
                                    <>
                                        {
                                            // Array.from({length:AwardRecognition_get_quantity},(v,index)=>{
                                            //     return <RankingCard key={index} loading={true} />
                                            // })
                                            <tr>
                                                <td colSpan={6}>
                                                    <div>No Data Found</div>
                                                </td>
                                            </tr>
                                        }

                                    </>
                                )}
                            </tbody>
                        </table>
                    </div>
                   
                </div>

            </div>
            {showModal && (
                

                    <AwardRecognitionForm
                        onClose={handleCloseModal}
                        isEditMode={isEditMode}
                        awardRecognition={selectedAwardRecognition}
                        profile_id={profile_id}
                        fetchAwardRecognitions={fetchAwardRecognitionData}
                        basePath={basePath}
                        
                    />

                
            )}

            {
                showDeleteModal && (
                    <div className='w-full h-full absolute top-0 left-0 bg-black/50 z-50'>
                        <div
                            className="group absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none w-[250px] flex flex-col p-4 items-center justify-center bg-gray-800 border border-gray-800 shadow-lg rounded-2xl"
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
                                        onClick={() => handleDelete(selectedAwardRecognition)}
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

export default AwardRecognition;
