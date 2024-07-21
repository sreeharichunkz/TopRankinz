import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import passwordApi from '../api/user/password/passwordApi';


const ForgotPassword = () => {

    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState(false);
    const [loader, setLoader] = useState(false);




    const handleResetLink = async (e) => {
        e.preventDefault();
        setMessage('');
        setLoader('true');

        try {
            const response = await passwordApi.sendPasswordResetLink(email);
            setMessage(response.message);
            setEmail('');
            setLoader(false);
            setError(false);

        }
        catch (error) {
            console.error('Error sending reset link:', error.response);
            setMessage(error.response.data.message);
            setLoader(false);
            setError(true);
        }

    };


    return (
        <>

            <main>
                <section className='min-h-screen'>
                    <div className="h-full w-full max-lg:px-2 lg:my-16 my-5">
                        <div className="bg-color-9 dark:bg-color-2 min-h-fit rounded w-full lg:w-2/5 mx-auto relative lg:px-16 px-5 py-8 text-center space-y-10">
                            <div className="font-outfit-bold text-5xl text-color-3 dark:text-color-6">Forgot Password</div>
                            <div className="w-full">
                                <form onSubmit={handleResetLink} className="space-y-4">
                                    <input
                                        className="bg-transparent outline-none border w-full h-16 px-4 pr-10 placeholder:text-color-4 text-color-4 dark:placeholder:text-color-5 dark:text-color-5 border-color-5"
                                        type="email"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />

                                    <button type="submit" className="bg-color-1 w-full text-white py-3 !mt-10">

                                        <span className='relative'>
                                            Send Reset Link
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
                                </form>
                                <div className='h-12'>
                                {message && <p className={`mt-4 ${error?'text-red-600 dark:text-red-400':'text-green-600 dark:text-green-400'} `}>{message}</p>}

                                </div>
                            </div>

                            <div className='flex justify-between'>
                                <Link to="/Login" state={{from:'/forgot-password'}}>
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

export default ForgotPassword;