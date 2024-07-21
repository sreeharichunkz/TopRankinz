import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';
import {login} from '../../api/admin/auth/userAuth';
import useAuth from '../../hooks/admin/useAuth';


const Login = () => {
 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passType, setPassType] = useState('password');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  
  const { setCurrentUser } = useAuth();
      

  const togglePassword = () => {
    setPassType(passType === 'password' ? 'text' : 'password');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');    
   
    login(username, password).then((response) => {     
        setMessage('Login successful');
       
          setCurrentUser(true);
          navigate('/admin/profile',{state:{from:'login'}});       
       
  }).catch((error) => {
    setMessage(error.response?.data?.message || 'Login failed');
  });
  };
 
  
  return (
   <>
   
   <main>
        <section className='min-h-screen bg-color-5 dark:bg-color-4'>
            <div className="h-full w-full max-lg:px-2 lg:py-16 py-5">
                <div className="bg-color-9 dark:bg-color-2 min-h-[90vh] w-full lg:w-2/5 mx-auto relative lg:px-16 px-5 py-8 text-center space-y-10">
              <div className="font-outfit-bold text-5xl text-color-3 dark:text-color-6">Admin Login</div>
              <div className="w-full">
                <form onSubmit={handleLogin} className="space-y-4">
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
                  <Link to="/forgot-password">
                  <div className="text-end text-color-4 dark:text-color-5 cursor-pointer mt-4">Forgot Password?</div>
                  
                  </Link>
                  <button type="submit" className="bg-color-1 w-full text-white py-3 !mt-10">LOGIN</button>
                </form>
                {message && <p className="mt-4 text-color-4 dark:text-color-5">{message}</p>}
              </div>
                   
                  
                </div>
            </div>
        </section>
    </main>
   </>
  )
}

export default Login;