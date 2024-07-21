import React, { useEffect, useState } from 'react'
import userApi from '../api/user/account/userAccountApi';

const Account = () => {

    // const [userData, setUserData] = useState({});
    const [passType, setPassType] = useState('password');
    const [currentPassword, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [userName, setUserName] = useState('');
    const [number, setNumber] = useState('');
    const [save, setSave] = useState(false);
    const [loader, setLoader] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState(false);


    const togglePassword = () => {
        setPassType(passType === 'password' ? 'text' : 'password');
    };
    const fetchUserData = async () => {

        try {
            const response = await userApi.getUser();
            const { name, email, username, number } = response.data;

            setName(name);
            setUserName(username);
            setEmail(email);
            setNumber(number ?? '');
            // setUserData(response.data);
        }
        catch (error) {
            console.error('Error fetching user data:', error.response);
        }
    }

    const handleSave = () => {
        setSave(!save);

    }

    const handleSubmit = async (e, uname = name, uusername = userName, unumber = number, uemail = email, password = currentPassword) => {
        e.preventDefault();
        setMessage('');
        setLoader(true);
        setError(false);

        try {
            const response = await userApi.updateUser({
                name: uname,
                number: unumber,
                email: uemail,
                username: uusername,
                current_password: password
            });

            if(response.status===200){
                const { name, email, username, number } = response.data;

                setName(name);
                setUserName(username);
                setEmail(email);
                setNumber(number ?? '');
                setPassword('');
                setLoader(false);
                setError(false);
                setMessage('Update Successfully');
                setSave(false);
            }
            else if(response.status===401){
                setPassword('');
                setMessage(response.message);
                setError(true);
                setLoader(false);
                setSave(true);
            }
           

            // setUserData(response.data);
        } catch (error) {
            console.error('Error updating user details:', error.response);
            setLoader(false);
            setMessage(error.response.data.message);
            setError(true);
            setPassword('');
            setSave(false);
        }

    }
    const nothing = () => { };

    useEffect(() => {
        fetchUserData();
    }, []);

    useEffect(()=>{
       
            setMessage('');
        
    },[name,userName,number,email]);


    return (
        <>

            <main>
                <section className='min-h-screen'>
                    <div className="h-screen w-full max-lg:px-2 lg:my-16 my-5">
                        <div className="bg-color-9 dark:bg-color-2 min-h-[90vh] w-full lg:w-2/5 mx-auto relative lg:px-16 px-5 py-8 pb-20 text-center space-y-10">

                            <div className="font-outfit-bold text-5xl text-color-3 dark:text-color-6 mt-5">Account</div>
                            <div className="w-full">
                                <form onSubmit={save ? handleSubmit : nothing} action="" className="space-y-4">
                                    {
                                        !save &&

                                        <>
                                            <input
                                                className="bg-transparent outline-none border w-full h-16 px-4 pr-10 placeholder:text-color-4 text-color-3 dark:placeholder:text-color-3 dark:text-color-5 border-color-5"
                                                type="text"
                                                placeholder="Name"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                required
                                            />
                                            <input
                                                className="bg-transparent outline-none border w-full h-16 px-4 pr-10 placeholder:text-color-4 text-color-3 dark:placeholder:text-color-3 dark:text-color-5 border-color-5"
                                                type="text"
                                                placeholder="Name"
                                                value={userName}
                                                onChange={(e) => setUserName(e.target.value)}
                                                required
                                            />
                                            <input
                                                className="bg-transparent outline-none border w-full h-16 px-4 pr-10 placeholder:text-color-4 text-color-3 dark:placeholder:text-color-3 dark:text-color-5 border-color-5"
                                                type="text"
                                                placeholder="Number"
                                                value={number}
                                                onChange={(e) => setNumber(e.target.value)}

                                            />
                                            <input
                                                className="bg-transparent outline-none border w-full h-16 px-4 pr-10 placeholder:text-color-4 text-color-3 dark:placeholder:text-color-5 dark:text-color-5 border-color-5"
                                                type="email"
                                                placeholder="Email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />
                                        </>

                                    }
                                    {
                                        save &&
                                        <div className="relative select-none">
                                            <input
                                                className="bg-transparent outline-none border w-full h-16 px-4 pr-10 placeholder:text-color-4 text-color-4 dark:placeholder:text-color-5 dark:text-color-5 border-color-5 appearance-none app"
                                                type={passType}
                                                placeholder="Password"
                                                value={currentPassword}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                            />
                                            <div onClick={togglePassword} className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer z-20">
                                                <svg className={`stroke-[#484848] dark:stroke-color-6 ${passType === 'password' ? '' : 'fill-color-1'}`} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M21.544 11.045C21.848 11.4713 22 11.6845 22 12C22 12.3155 21.848 12.5287 21.544 12.955C20.1779 14.8706 16.6892 19 12 19C7.31078 19 3.8221 14.8706 2.45604 12.955C2.15201 12.5287 2 12.3155 2 12C2 11.6845 2.15201 11.4713 2.45604 11.045C3.8221 9.12944 7.31078 5 12 5C16.6892 5 20.1779 9.12944 21.544 11.045Z" stroke="" strokeWidth="1.5" />
                                                    <path d="M15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12Z" stroke="" fill={`${passType === 'password' ? '' : '#F4F4F4'}`} strokeWidth="1.5" />
                                                </svg>
                                            </div>
                                        </div>
                                    }

                                    <div className="text-end text-color-4 dark:text-color-5 cursor-pointer underline">Change Password</div>
                                    {
                                        save && <button  type="submit" className="bg-color-1 w-full text-white py-3 !mt-10 relative">
                                            <span className='relative'>
                                            SAVE
                                            {
                                                loader &&
                                                <span className='absolute -left-8 top-1/2 -translate-y-1/2 '>
                                                    <div
                                                        className="size-5 border-4 border-dashed rounded-full animate-spin border-white mx-auto"
                                                    ></div>
                                                </span>
                                            }
                                            </span>
                                           
                                        </button>
                                    }

                                    <div className='h-12'>
                                        {message && <p className={`mt-4 ${error ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'} `}>{message}</p>}

                                    </div>
                                </form>
                                {
                                    !save &&
                                    <button onClick={save ? nothing : handleSave} type="submit" className="bg-color-1 w-full text-white py-3 !mt-10">EDIT PROFILE</button>
                                }
                            </div>
                            <div className="absolute top-4 right-5 cursor-pointer z-20 max-lg:hidden !mt-0">
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
                                save && <div onClick={handleSave} className="absolute top-4 left-5 cursor-pointer z-20  !mt-0 flex items-center">
                                    <svg className="fill-color-3 dark:fill-color-5" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <mask id="mask0_127_521" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                                            <rect width="24" height="24" fill="#D9D9D9" />
                                        </mask>
                                        <g mask="url(#mask0_127_521)">
                                            <path d="M6.80005 13L9.70005 15.9C9.88338 16.0833 9.97505 16.3167 9.97505 16.6C9.97505 16.8833 9.88338 17.1167 9.70005 17.3C9.51672 17.4833 9.28338 17.575 9.00005 17.575C8.71672 17.575 8.48338 17.4833 8.30005 17.3L3.70005 12.7C3.60005 12.6 3.52922 12.4917 3.48755 12.375C3.44588 12.2583 3.42505 12.1333 3.42505 12C3.42505 11.8667 3.44588 11.7417 3.48755 11.625C3.52922 11.5083 3.60005 11.4 3.70005 11.3L8.30005 6.69999C8.48338 6.51665 8.71672 6.42499 9.00005 6.42499C9.28338 6.42499 9.51672 6.51665 9.70005 6.69999C9.88338 6.88332 9.97505 7.11665 9.97505 7.39999C9.97505 7.68332 9.88338 7.91665 9.70005 8.09999L6.80005 11H20C20.2834 11 20.5209 11.0958 20.7125 11.2875C20.9042 11.4792 21 11.7167 21 12C21 12.2833 20.9042 12.5208 20.7125 12.7125C20.5209 12.9042 20.2834 13 20 13H6.80005Z" fill="" />
                                        </g>
                                    </svg>
                                    <div className='text-color-3 dark:text-color-5'>
                                        Back
                                    </div>
                                </div>
                            }

                        </div>
                    </div>
                </section>
            </main>

        </>
    )
}

export default Account;