import React from 'react'
import { Link } from 'react-router-dom';

import { useState } from 'react';
import {register} from '../api/user/auth/userAuth';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [ConfirmPassword, setConfirmPassword] = useState('');
    const [passType, setPassType] = useState('password');
    const [message, setMessage] = useState('');
    
          
    // const from = location.state?.from?.pathname || '/';
  
    const togglePassword = () => {
      setPassType(passType === 'password' ? 'text' : 'password');
    };
  
    const handleLogin = async (e) => {
      e.preventDefault();
      setMessage('');
     
      register({username, password,email,name,number,'password_confirmation':ConfirmPassword}).then((response) => {     
          setMessage('Signup successful');   
          setName('');
          setNumber('');
          setEmail('');
          setUsername('');
          setPassword('');
          setConfirmPassword('');

    }).catch((error) => {
      setMessage(error.response?.data?.message || 'Signup failed');
       
    });
    };
   
    
    return (
     <>
     
     <main>
          <section className='min-h-screen'>
            <div className="h-full w-full max-lg:px-2 lg:my-16 my-5">
              <div className="bg-color-9 dark:bg-color-2 min-h-[90vh] w-full lg:w-2/5 mx-auto relative lg:px-16 px-5 py-8 text-center space-y-10">
                <div className="font-outfit-bold text-5xl text-color-3 dark:text-color-6">Signup</div>
                <div className="w-full">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <input
                      className="bg-transparent outline-none border w-full h-16 px-4 pr-10 placeholder:text-color-4 text-color-4 dark:placeholder:text-color-5 dark:text-color-5 border-color-5"
                      type="text"
                      placeholder="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                    <input
                      className="bg-transparent outline-none border w-full h-16 px-4 pr-10 placeholder:text-color-4 text-color-4 dark:placeholder:text-color-5 dark:text-color-5 border-color-5"
                      type="text"
                      
                      placeholder="Number"
                      value={number}
                      onChange={(e) => setNumber(e.target.value)}
                      maxLength={10}
                      
                    />
                    <input
                      className="bg-transparent outline-none border w-full h-16 px-4 pr-10 placeholder:text-color-4 text-color-4 dark:placeholder:text-color-5 dark:text-color-5 border-color-5"
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <input
                      className="bg-transparent outline-none border w-full h-16 px-4 pr-10 placeholder:text-color-4 text-color-4 dark:placeholder:text-color-5 dark:text-color-5 border-color-5"
                      type="text"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
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
                        value={ConfirmPassword}
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
                   
                    <button type="submit" className="bg-color-1 w-full text-white py-3 !mt-10">SIGNUP</button>
                  </form>
                  {message && <p className="mt-4 text-color-4 dark:text-color-5">{message}</p>}
                </div>
                      <div className="flex items-center justify-center text-color-3 dark:text-color-6 gap-x-2">
                          <div className="w-20 bg-color-4 h-px dark:bg-color-5"></div>
                          <div>Or</div>
                          <div className="w-20 bg-color-4 h-px dark:bg-color-5"></div>
                      </div>
                      <div>
                          <div className="text-color-3 dark:text-color-6">Login with Social Accounts</div>
                          <div className="flex gap-8 items-center justify-center mt-5">
                              <div>
                                  <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <g clipPath="url(#clip0_154_285)">
                                          <path d="M44 22C44 9.84981 34.1502 0 22 0C9.84981 0 0 9.84981 0 22C0 32.9808 8.04513 42.0824 18.5625 43.7327V28.3594H12.9766V22H18.5625V17.1531C18.5625 11.6394 21.847 8.59375 26.8723 8.59375C29.2793 8.59375 31.7969 9.02344 31.7969 9.02344V14.4375H29.0228C26.2898 14.4375 25.4375 16.1334 25.4375 17.8733V22H31.5391L30.5637 28.3594H25.4375V43.7327C35.9549 42.0824 44 32.9809 44 22Z" fill="#1877F2" />
                                          <path d="M30.5637 28.3594L31.5391 22H25.4375V17.8733C25.4375 16.1332 26.2898 14.4375 29.0228 14.4375H31.7969V9.02344C31.7969 9.02344 29.2792 8.59375 26.8721 8.59375C21.847 8.59375 18.5625 11.6394 18.5625 17.1531V22H12.9766V28.3594H18.5625V43.7327C19.6997 43.9109 20.849 44.0003 22 44C23.151 44.0003 24.3003 43.9109 25.4375 43.7327V28.3594H30.5637Z" fill="white" />
                                      </g>
                                      <defs>
                                          <clipPath id="clip0_154_285">
                                              <rect width="44" height="44" fill="white" />
                                          </clipPath>
                                      </defs>
                                  </svg>
  
                              </div>
                              <div>
                                  <svg width="54" height="54" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M49.0624 22.5934H47.25V22.5H27V31.5H39.7159C37.8608 36.7391 32.8759 40.5 27 40.5C19.5446 40.5 13.5 34.4554 13.5 27C13.5 19.5446 19.5446 13.5 27 13.5C30.4414 13.5 33.5723 14.7982 35.9561 16.9189L42.3203 10.5547C38.3018 6.80962 32.9265 4.5 27 4.5C14.5744 4.5 4.5 14.5744 4.5 27C4.5 39.4256 14.5744 49.5 27 49.5C39.4256 49.5 49.5 39.4256 49.5 27C49.5 25.4914 49.3447 24.0187 49.0624 22.5934Z" fill="#FFC107" />
                                      <path d="M7.09424 16.5274L14.4866 21.9487C16.4869 16.9965 21.3311 13.5 27 13.5C30.4414 13.5 33.5722 14.7982 35.9561 16.9189L42.3202 10.5547C38.3017 6.80962 32.9265 4.5 27 4.5C18.3577 4.5 10.863 9.37912 7.09424 16.5274Z" fill="#FF3D00" />
                                      <path d="M27 49.5C32.8117 49.5 38.0925 47.2759 42.0851 43.659L35.1214 37.7663C32.7865 39.542 29.9334 40.5024 27 40.5C21.1477 40.5 16.1786 36.7684 14.3066 31.5608L6.96936 37.2139C10.6931 44.5005 18.2554 49.5 27 49.5Z" fill="#4CAF50" />
                                      <path d="M49.0624 22.5934H47.25V22.5H27V31.5H39.7159C38.8285 33.9935 37.23 36.1723 35.118 37.7674L35.1214 37.7651L42.0851 43.6579C41.5924 44.1056 49.5 38.25 49.5 27C49.5 25.4914 49.3447 24.0188 49.0624 22.5934Z" fill="#1976D2" />
                                  </svg>
  
                              </div>
                              <div>
                                  <svg className="fill-black dark:fill-white" width="59" height="59" viewBox="0 0 59 59" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M41.9146 49.855C39.5054 52.1904 36.875 51.8217 34.3429 50.7154C31.6633 49.5846 29.205 49.5354 26.3779 50.7154C22.8379 52.2396 20.9696 51.7971 18.8554 49.855C6.85877 37.4896 8.62877 18.6587 22.2479 17.9704C25.5667 18.1425 27.8775 19.7896 29.8196 19.9371C32.7204 19.3471 35.4983 17.6508 38.5958 17.8721C42.3079 18.1671 45.1104 19.6421 46.9542 22.2971C39.2842 26.8942 41.1033 36.9979 48.1342 39.825C46.7329 43.5125 44.9138 47.1754 41.89 49.8796L41.9146 49.855ZM29.5738 17.8229C29.205 12.3408 33.6546 7.8175 38.7679 7.375C39.4809 13.7175 33.0154 18.4375 29.5738 17.8229Z" fill="" />
                                  </svg>
  
                              </div>
                          </div>
                      </div>
                      <div className="absolute top-4 right-5 cursor-pointer z-20 max-lg:hidden !mt-0">
                          <svg className="fill-[#767676] dark:fill-color-6" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <mask id="mask0_154_290" style={{maskType:'alpha'}} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                                  <rect width="24" height="24" fill="#D9D9D9" />
                              </mask>
                              <g mask="url(#mask0_154_290)">
                                  <path d="M12 13.4L7.1 18.3C6.91667 18.4834 6.68334 18.575 6.4 18.575C6.11667 18.575 5.88334 18.4834 5.7 18.3C5.51667 18.1167 5.425 17.8834 5.425 17.6C5.425 17.3167 5.51667 17.0834 5.7 16.9L10.6 12L5.7 7.10005C5.51667 6.91672 5.425 6.68338 5.425 6.40005C5.425 6.11672 5.51667 5.88338 5.7 5.70005C5.88334 5.51672 6.11667 5.42505 6.4 5.42505C6.68334 5.42505 6.91667 5.51672 7.1 5.70005L12 10.6L16.9 5.70005C17.0833 5.51672 17.3167 5.42505 17.6 5.42505C17.8833 5.42505 18.1167 5.51672 18.3 5.70005C18.4833 5.88338 18.575 6.11672 18.575 6.40005C18.575 6.68338 18.4833 6.91672 18.3 7.10005L13.4 12L18.3 16.9C18.4833 17.0834 18.575 17.3167 18.575 17.6C18.575 17.8834 18.4833 18.1167 18.3 18.3C18.1167 18.4834 17.8833 18.575 17.6 18.575C17.3167 18.575 17.0833 18.4834 16.9 18.3L12 13.4Z" fill="" />
                              </g>
                          </svg>
  
                      </div>
                      <Link to="/login" state={{from:'/signup'}}>
                    <div className="text-center text-color-4 dark:text-color-5 cursor-pointer underline mt-5">Login</div>
                    
                    </Link>
                  </div>
                
              </div>
              
          </section>
      </main>
     </>
    )
  
}

export default Signup;