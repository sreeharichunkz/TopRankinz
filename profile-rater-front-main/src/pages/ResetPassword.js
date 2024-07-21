import React, { useEffect, useState } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';

import { Link } from 'react-router-dom';
import passwordApi from '../api/user/password/passwordApi';


const ResetPassword = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [loader, setLoader] = useState(false);

    const location = useLocation();
    const [token, setToken] = useState('');    
    const [passType, setPassType] = useState('password');

    const navigate  = useNavigate();
  
    useEffect(() => {
      const searchParams = new URLSearchParams(location.search);

      if(!searchParams.get('token') || !searchParams.get('email')){
        navigate('/login');
      }
      else{
          setToken(searchParams.get('token'));
          setEmail(searchParams.get('email'));

      }
    }, [location,navigate]);
  
   
    const togglePassword = () => {
        setPassType(passType === 'password' ? 'text' : 'password');
      };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setMessage('');
        setLoader('true');

        try {
            const response = await passwordApi.passwordReset({email,token,password,'password_confirmation':confirmPassword});
            setMessage(response.message);
            setEmail('');
            setLoader(false);

        }
        catch (error) {
            console.error('Error sending reset link:', error.response);
            setMessage(error.response.data.message);
            setErrorMessage(true);
        }

    };


    return (
        <>

            <main>
                <section className='min-h-screen'>
                    <div className="h-full w-full max-lg:px-2 lg:my-16 my-5">
                        <div className="bg-color-9 dark:bg-color-2 min-h-fit rounded w-full lg:w-2/5 mx-auto relative lg:px-16 px-5 py-8 text-center space-y-10">
                            <div className="font-outfit-bold text-5xl text-color-3 dark:text-color-6">Reset Password</div>
                            <div className="w-full">
                                {
                                    !message &&
                                    <form onSubmit={handleResetPassword} className="space-y-4">
                                    <div className="relative select-none">
                          <input
                            className="bg-transparent outline-none border w-full h-16 px-4 pr-10 placeholder:text-color-4 text-color-4 dark:placeholder:text-color-5 dark:text-color-5 border-color-5 appearance-none app"
                            type={passType}
                            placeholder="Password"
                            value={password}
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
                        <div className="relative select-none">
                          <input
                            className="bg-transparent outline-none border w-full h-16 px-4 pr-10 placeholder:text-color-4 text-color-4 dark:placeholder:text-color-5 dark:text-color-5 border-color-5 appearance-none app"
                            type={passType}
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                          />
                          <div onClick={togglePassword} className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer z-20">
                            <svg className={`stroke-[#484848] dark:stroke-color-6 ${passType === 'password' ? '' : 'fill-color-1'}`} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M21.544 11.045C21.848 11.4713 22 11.6845 22 12C22 12.3155 21.848 12.5287 21.544 12.955C20.1779 14.8706 16.6892 19 12 19C7.31078 19 3.8221 14.8706 2.45604 12.955C2.15201 12.5287 2 12.3155 2 12C2 11.6845 2.15201 11.4713 2.45604 11.045C3.8221 9.12944 7.31078 5 12 5C16.6892 5 20.1779 9.12944 21.544 11.045Z" stroke="" strokeWidth="1.5" />
                              <path d="M15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12Z" stroke="" fill={`${passType === 'password' ? '' : '#F4F4F4'}`} strokeWidth="1.5" />
                            </svg>
                          </div>
                        </div>
    
                                        <button type="submit" className="bg-color-1 w-full text-white py-3 !mt-10">
    
                                            <span className='relative'>
                                                Reset Password
                                                {
                                                    loader &&
                                                    <span className='absolute -left-8 top-1/2 -translate-y-1/2 '>
                                                        <div
                                                            class="size-5 border-4 border-dashed rounded-full animate-spin border-white mx-auto"
                                                        ></div>
                                                    </span>
                                                }
    
    
                                            </span>
                                        </button>
                                    </form>
                                }
                               
                                <div className='h-12'>
                                {message && <p className={`mt-4 ${errorMessage?'text-red-600 dark:text-red-400':'text-green-600 dark:text-green-400'} `}>{message}</p>}

                                </div>
                            </div>

                            <div className='flex justify-between'>
                                <Link to="/Login" state={{from:'/reset-password'}}>
                                    <div className="text-center font-outfit-medium text-lg text-color-4 dark:text-color-5 cursor-pointer underline mt-2">Login</div>

                                </Link>

                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

export default ResetPassword;