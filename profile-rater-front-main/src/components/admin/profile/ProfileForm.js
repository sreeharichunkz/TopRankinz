import React, { useState, useEffect } from 'react';
import profileApi from '../../../api/admin/profile/profileApi'
import AwardRecognition from './AwardRecognition';

const ProfileForm = ({ onClose, isEditMode, profile, fetchProfiles }) => {
    const [formData, setFormData] = useState({
        name: '',
        industry: '',
        about: '',
        image: '',
        age: '',
        height: '',
        net_worth: '',
        marital_status: '',
        children: '',
        education: '',
        citizenship: '',
        residence: '',
        state: '',
        district: '',
        career_status: '',
        active_status: 'true',
    });

    const [profileSection, setProflieSection] = useState(true);
    useEffect(() => {
        if (isEditMode && profile) {
            setFormData({
                ...profile,
                image: '', // Reset image field for file input
            });
        }
    }, [isEditMode, profile]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: files[0],
        }));
        console.log(formData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = new FormData();
        for (const key in formData) {
            form.append(key, formData[key] ?? '');

        }
        console.log(formData);
        if (isEditMode) {

            try {
                await profileApi.update(form, profile.id);
                fetchProfiles();
                onClose();

            } catch (error) {
                console.error('Error:',error.response);
            }

        } else {

            try {
                await profileApi.create(form);
                fetchProfiles();
                onClose();

            } catch (error) {
                console.error('Error:',error.response);
            }

        }
       

    };


    return (
        <div className="h-screen fixed top-0 z-50 overflow-y-auto w-full max-lg:px-2 lg:py-16 py-5 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-lg dark:bg-color-2 min-h-[90vh] w-full lg:w-1/2 mx-auto relative lg:px-16 px-5 py-8 text-center space-y-10">
                <div onClick={onClose} className="absolute top-4 right-5 cursor-pointer z-20  !mt-0">
                    <svg className="fill-[#767676] dark:fill-color-6" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <mask id="mask0_154_290" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                            <rect width="24" height="24" fill="#D9D9D9" />
                        </mask>
                        <g mask="url(#mask0_154_290)">
                            <path d="M12 13.4L7.1 18.3C6.91667 18.4834 6.68334 18.575 6.4 18.575C6.11667 18.575 5.88334 18.4834 5.7 18.3C5.51667 18.1167 5.425 17.8834 5.425 17.6C5.425 17.3167 5.51667 17.0834 5.7 16.9L10.6 12L5.7 7.10005C5.51667 6.91672 5.425 6.68338 5.425 6.40005C5.425 6.11672 5.51667 5.88338 5.7 5.70005C5.88334 5.51672 6.11667 5.42505 6.4 5.42505C6.68334 5.42505 6.91667 5.51672 7.1 5.70005L12 10.6L16.9 5.70005C17.0833 5.51672 17.3167 5.42505 17.6 5.42505C17.8833 5.42505 18.1167 5.51672 18.3 5.70005C18.4833 5.88338 18.575 6.11672 18.575 6.40005C18.575 6.68338 18.4833 6.91672 18.3 7.10005L13.4 12L18.3 16.9C18.4833 17.0834 18.575 17.3167 18.575 17.6C18.575 17.8834 18.4833 18.1167 18.3 18.3C18.1167 18.4834 17.8833 18.575 17.6 18.575C17.3167 18.575 17.0833 18.4834 16.9 18.3L12 13.4Z" fill="" />
                        </g>
                    </svg>

                </div>
                {
                    isEditMode && (
                        <div className='flex justify-between gap-2 lg:gap-10 max-lg:flex-wrap'>
                            <div onClick={() => { setProflieSection(true) }} className={`${profileSection ? 'bg-color-1 dark:text-color-6' : 'bg-color-5 dark:text-color-2'} max-lg:min-w-max cursor-pointer hover:bg-color-1  w-full text-white  py-3 col-span-2 rounded-md px-2`}>Profile</div>
                            <div onClick={() => { setProflieSection(false) }} className={`${profileSection ? 'bg-color-5 dark:text-color-2' : 'bg-color-1 dark:text-color-6'} max-lg:min-w-max cursor-pointer hover:bg-color-1  w-full text-white py-3 col-span-2 rounded-md px-2`}>Award & Recognition</div>
                        </div>
                    )
                }

                <div className="font-outfit-bold text-5xl text-color-3 dark:text-color-6">
                    {isEditMode ? 'Edit Profile' : 'Add Profile'}
                </div>
                <div className="w-full">
                    {
                        profileSection ? (
                            <form onSubmit={handleSubmit} className="space-y-0 flex flex-col lg:grid lg:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-color-4 dark:text-color-5 text-start">Name:</label>
                                    <input
                                        className="bg-transparent outline-none rounded-md border w-full h-10 px-4 pr-10 placeholder:text-color-4 text-color-4 dark:placeholder:text-color-5 dark:text-color-5 border-color-5"
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-color-4 dark:text-color-5 text-start">Industry:</label>
                                    <input
                                        className="bg-transparent outline-none rounded-md border w-full h-10 px-4 pr-10 placeholder:text-color-4 text-color-4 dark:placeholder:text-color-5 dark:text-color-5 border-color-5"
                                        type="text"
                                        name="industry"
                                        value={formData.industry}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-color-4 dark:text-color-5 text-start">About:</label>
                                    <textarea
                                        className="bg-transparent outline-none rounded-md border w-full px-4 pr-10 placeholder:text-color-4 text-color-4 dark:placeholder:text-color-5 dark:text-color-5 border-color-5"
                                        name="about"
                                        value={formData.about}
                                        onChange={handleChange}
                                        maxLength="2000"
                                        required
                                    ></textarea>
                                </div>
                                <div>
                                    <label className="block text-color-4 dark:text-color-5 text-start">Image:</label>
                                    <input
                                        className="bg-transparent outline-none rounded-md border w-full h-10 px-4 placeholder:text-color-4 text-color-4 dark:placeholder:text-color-5 dark:text-color-5 border-color-5"
                                        type="file"
                                        name="image"
                                        onChange={handleFileChange}
                                        accept="image/jpeg,image/png,image/jpg,image/svg"
                                    />
                                </div>
                                <div>
                                    <label className="block text-color-4 dark:text-color-5 text-start">Age:</label>
                                    <input
                                        className="bg-transparent outline-none rounded-md border w-full h-10 px-4 pr-10 placeholder:text-color-4 text-color-4 dark:placeholder:text-color-5 dark:text-color-5 border-color-5"
                                        type="text"
                                        name="age"
                                        value={formData.age}
                                        onChange={handleChange}
                                        maxLength="3"
                                    />
                                </div>
                                <div>
                                    <label className="block text-color-4 dark:text-color-5 text-start">Height:</label>
                                    <input
                                        className="bg-transparent outline-none rounded-md border w-full h-10 px-4 pr-10 placeholder:text-color-4 text-color-4 dark:placeholder:text-color-5 dark:text-color-5 border-color-5"
                                        type="text"
                                        name="height"
                                        value={formData.height}
                                        onChange={handleChange}
                                        maxLength="20"
                                    />
                                </div>
                                <div>
                                    <label className="block text-color-4 dark:text-color-5 text-start">Net Worth:</label>
                                    <input
                                        className="bg-transparent outline-none rounded-md border w-full h-10 px-4 pr-10 placeholder:text-color-4 text-color-4 dark:placeholder:text-color-5 dark:text-color-5 border-color-5"
                                        type="text"
                                        name="net_worth"
                                        value={formData.net_worth}
                                        onChange={handleChange}
                                        maxLength="10"
                                    />
                                </div>
                                <div>
                                    <label className="block text-color-4 dark:text-color-5 text-start">Marital Status:</label>
                                    <input
                                        className="bg-transparent outline-none rounded-md border w-full h-10 px-4 pr-10 placeholder:text-color-4 text-color-4 dark:placeholder:text-color-5 dark:text-color-5 border-color-5"
                                        type="text"
                                        name="marital_status"
                                        value={formData.marital_status}
                                        onChange={handleChange}
                                        maxLength="50"
                                    />
                                </div>
                                <div>
                                    <label className="block text-color-4 dark:text-color-5 text-start">Children:</label>
                                    <input
                                        className="bg-transparent outline-none rounded-md border w-full h-10 px-4 pr-10 placeholder:text-color-4 text-color-4 dark:placeholder:text-color-5 dark:text-color-5 border-color-5"
                                        type="text"
                                        name="children"
                                        value={formData.children}
                                        onChange={handleChange}
                                        maxLength="50"
                                    />
                                </div>
                                <div>
                                    <label className="block text-color-4 dark:text-color-5 text-start">Education:</label>
                                    <input
                                        className="bg-transparent outline-none rounded-md border w-full h-10 px-4 pr-10 placeholder:text-color-4 text-color-4 dark:placeholder:text-color-5 dark:text-color-5 border-color-5"
                                        type="text"
                                        name="education"
                                        value={formData.education}
                                        onChange={handleChange}
                                        maxLength="100"
                                    />
                                </div>
                                <div>
                                    <label className="block text-color-4 dark:text-color-5 text-start">Citizenship:</label>
                                    <input
                                        className="bg-transparent outline-none rounded-md border w-full h-10 px-4 pr-10 placeholder:text-color-4 text-color-4 dark:placeholder:text-color-5 dark:text-color-5 border-color-5"
                                        type="text"
                                        name="citizenship"
                                        value={formData.citizenship}
                                        onChange={handleChange}
                                        maxLength="50"
                                    />
                                </div>
                                <div>
                                    <label className="block text-color-4 dark:text-color-5 text-start">Residence:</label>
                                    <input
                                        className="bg-transparent outline-none rounded-md border w-full h-10 px-4 pr-10 placeholder:text-color-4 text-color-4 dark:placeholder:text-color-5 dark:text-color-5 border-color-5"
                                        type="text"
                                        name="residence"
                                        value={formData.residence}
                                        onChange={handleChange}
                                        maxLength="100"
                                    />
                                </div>
                                <div>
                                    <label className="block text-color-4 dark:text-color-5 text-start">State:</label>
                                    <input
                                        className="bg-transparent outline-none rounded-md border w-full h-10 px-4 pr-10 placeholder:text-color-4 text-color-4 dark:placeholder:text-color-5 dark:text-color-5 border-color-5"
                                        type="text"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleChange}
                                        maxLength="150"
                                    />
                                </div>
                                <div>
                                    <label className="block text-color-4 dark:text-color-5 text-start">District:</label>
                                    <input
                                        className="bg-transparent outline-none rounded-md border w-full h-10 px-4 pr-10 placeholder:text-color-4 text-color-4 dark:placeholder:text-color-5 dark:text-color-5 border-color-5"
                                        type="text"
                                        name="district"
                                        value={formData.district}
                                        onChange={handleChange}
                                        maxLength="150"
                                    />
                                </div>
                                <div>
                                    <label className="block text-color-4 dark:text-color-5 text-start">Career Status:</label>
                                    <input
                                        className="bg-transparent outline-none rounded-md border w-full h-10 px-4 pr-10 placeholder:text-color-4 text-color-4 dark:placeholder:text-color-5 dark:text-color-5 border-color-5"
                                        type="text"
                                        name="career_status"
                                        value={formData.career_status}
                                        onChange={handleChange}
                                        maxLength="20"
                                    />
                                </div>
                                <div>
                                    <label className="block text-color-4 dark:text-color-5 text-start">Profile Active Status:</label>
                                    <select
                                        name="active_status"
                                        value={formData.active_status}
                                        onChange={handleChange}
                                        className="bg-transparent outline-none rounded-md border w-full h-10 px-4 pr-10 placeholder:text-color-4 text-color-4 dark:placeholder:text-color-5 dark:text-color-5 border-color-5"
                                        required
                                    >
                                        <option value="true">True</option>
                                        <option value="false">False</option>
                                    </select>
                                </div>
                                <button type="submit" className="bg-color-1 w-full text-white py-3 col-span-2 rounded-md"> {isEditMode ? 'Update' : 'Submit'}</button>

                            </form>
                        ) : (
                            <AwardRecognition
                                profile_id={formData.id}
                            />
                        )
                    }


                </div>
            </div>
        </div>
    );
};

export default ProfileForm;