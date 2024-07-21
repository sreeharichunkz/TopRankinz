import React, { useEffect, useState } from 'react';

import Cookies from 'js-cookie';
import useAuth from '../../hooks/admin/useAuth';

import { Link } from 'react-router-dom';

function Header() {

    let darkmode = Cookies.get('darkTheme') === 'true' ? true : false;

    const [darkMode, setDarkMode] = useState(darkmode);


    const { currentUser, handleLogout } = useAuth();


    useEffect(() => {
        if (darkMode) {

            document.body.classList.add('dark');
            Cookies.set('darkTheme', true, { expires: 365 });

        }
        else {

            document.body.classList.remove('dark');
            Cookies.set('darkTheme', false, { expires: 365 });
        }

    }, [darkMode]);

    const dark_theme_toggle = () => {

        if (!darkMode) {
            setDarkMode(true);
        }
        else {
            setDarkMode(false);
        }

    };


    function menu_toggle() {
        document.getElementById('menu').classList.toggle('-right-full');
        document.getElementById('menu').classList.toggle('right-0');
        document.getElementById('menu').classList.toggle('animate__fadeInRight');
        document.getElementById('menu').classList.toggle('animate__fadeOutRight');
    }

    const Logout = () => {
        handleLogout(true);
        menu_toggle();
    }


    return (
        <>
            <header className="bg-white dark:bg-color-2 sticky top-0 z-40 py-1 lg:py-4">
                <nav className="">
                    <div className="mx-4 lg:mx-14 flex justify-between items-center py-3 lg:py-4 ">
                        <Link to="/" className="">
                            <div>
                                <img src={`${process.env.PUBLIC_URL}/assets/images/logo.png`} alt="" className="w-20 lg:w-32" />
                            </div>
                        </Link>
                        <div className="flex items-center gap-3 lg:gap-10 *:cursor-pointer">


                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" value="" className="sr-only peer" onChange={dark_theme_toggle} onClick={dark_theme_toggle} checked={darkMode} />
                                <div className="group peer ring-0 bg-yellow-500   rounded-full outline-none duration-300 after:duration-300 w-16 h-8  shadow-md peer-checked:bg-color-4  peer-focus:outline-none  after:content-[''] after:rounded-full after:absolute after:bg-gray-50 after:outline-none after:size-6 after:top-1 after:left-1 after:flex after:justify-center after:items-center peer-checked:after:translate-x-8 peer-hover:after:scale-95">

                                    <svg xmlns="http://www.w3.org/2000/svg" className="absolute top-1/2 -translate-y-1/2 left-1  size-6 stroke-white" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                                    </svg>

                                    <svg xmlns="http://www.w3.org/2000/svg" className="absolute  top-1/2 -translate-y-1/2 left-9 stroke-white size-5 stroke" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="5"></circle>
                                        <line x1="12" y1="1" x2="12" y2="3"></line>
                                        <line x1="12" y1="21" x2="12" y2="23"></line>
                                        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                                        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                                        <line x1="1" y1="12" x2="3" y2="12"></line>
                                        <line x1="21" y1="12" x2="23" y2="12"></line>
                                        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                                        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                                    </svg>
                                </div>
                            </label>
                            {
                                currentUser &&
                                <>
                                    <div className='flex gap-3'>
                                        <div>
                                            <svg className='stroke-[#767676] dark:stroke-color-6' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M21 21L16.657 16.657M16.657 16.657C17.3999 15.9141 17.9892 15.0321 18.3912 14.0615C18.7933 13.0909 19.0002 12.0506 19.0002 11C19.0002 9.94936 18.7933 8.90905 18.3913 7.93842C17.9892 6.96779 17.3999 6.08585 16.657 5.34296C15.9141 4.60007 15.0322 4.01078 14.0616 3.60874C13.0909 3.20669 12.0506 2.99976 11 2.99976C9.94942 2.99976 8.90911 3.20669 7.93848 3.60874C6.96785 4.01078 6.08591 4.60007 5.34302 5.34296C3.84269 6.84329 2.99982 8.87818 2.99982 11C2.99982 13.1217 3.84269 15.1566 5.34302 16.657C6.84335 18.1573 8.87824 19.0002 11 19.0002C13.1218 19.0002 15.1567 18.1573 16.657 16.657Z" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>

                                        </div>
                                        <div className='text-color-4 dark:text-white max-lg:hidden'>Search</div>
                                    </div>

                                    <div onClick={menu_toggle} className="flex rounded-full items-center p-3 lg:px-3 lg:py-2 gap-2  group/menu h-12">
                                        <div className="">
                                            <svg className="stroke-[#767676] dark:stroke-color-6" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M4 12H14" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M4 5H20" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M4 19H20" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                        <div className=" max-lg:hidden text-color-4 dark:text-white">Menu</div>
                                    </div>

                                </>

                            }
                        </div>
                    </div>

                    <div id="menu" className="bg-gradient-to-b from-[#0E3750] to-[#050509] h-screen w-4/5 lg:w-2/5 fixed -right-full top-0 z-50 transition-all duration-700 overflow-y-hidden overflow-x-hidden animate__animated animate__fast animate__fadeOutRight pt-5 max-lg:pl-7">
                        <div className="px-4 lg:px-8 py-8">
                            <div className="w-full flex lg:justify-end lg:pr-10 group">
                                <button onClick={menu_toggle} className="group cursor-pointer outline-none space-x-3 duration-300 flex group-hover:text-color-1">
                                    <svg className='fill-white group-hover:fill-color-1' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <mask id="mask0_135_600" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                                            <rect width="24" height="24" transform="matrix(-1 0 0 1 24 0)" fill="#D9D9D9" />
                                        </mask>
                                        <g mask="url(#mask0_135_600)">
                                            <path d="M17.2 13L14.3 15.9C14.1166 16.0833 14.025 16.3167 14.025 16.6C14.025 16.8833 14.1166 17.1167 14.3 17.3C14.4833 17.4833 14.7166 17.575 15 17.575C15.2833 17.575 15.5166 17.4833 15.7 17.3L20.3 12.7C20.4 12.6 20.4708 12.4917 20.5125 12.375C20.5541 12.2583 20.575 12.1333 20.575 12C20.575 11.8667 20.5541 11.7417 20.5125 11.625C20.4708 11.5083 20.4 11.4 20.3 11.3L15.7 6.69999C15.5166 6.51665 15.2833 6.42499 15 6.42499C14.7166 6.42499 14.4833 6.51665 14.3 6.69999C14.1166 6.88332 14.025 7.11665 14.025 7.39999C14.025 7.68332 14.1166 7.91665 14.3 8.09999L17.2 11H3.99995C3.71662 11 3.47912 11.0958 3.28745 11.2875C3.09578 11.4792 2.99995 11.7167 2.99995 12C2.99995 12.2833 3.09578 12.5208 3.28745 12.7125C3.47912 12.9042 3.71662 13 3.99995 13H17.2Z" />
                                        </g>
                                    </svg>

                                    <span className="text-white group-hover:text-color-1">Back</span>

                                </button>
                            </div>
                            <div className=" lg:pl-20 py-8 text-white text-sm pt-10 lg:pt-32">
                                <ul>

                                    <Link to="/admin/dashboard" className="group">
                                        <li onClick={menu_toggle}>
                                            <div className="flex items-center w-full py-4 cursor-pointer space-x-4 group-hover:text-color-1">
                                                <span>
                                                    <svg className="group-hover:stroke-color-1 stroke-white" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M9.06165 4.82633L3.23911 9.92134C2.7398 10.3583 3.07458 11.1343 3.76238 11.1343C4.18259 11.1343 4.52324 11.4489 4.52324 11.8371V15.0806C4.52324 17.871 4.52324 19.2662 5.46176 20.1331C6.40029 21 7.91082 21 10.9319 21H13.0681C16.0892 21 17.5997 21 18.5382 20.1331C19.4768 19.2662 19.4768 17.871 19.4768 15.0806V11.8371C19.4768 11.4489 19.8174 11.1343 20.2376 11.1343C20.9254 11.1343 21.2602 10.3583 20.7609 9.92134L14.9383 4.82633C13.5469 3.60878 12.8512 3 12 3C11.1488 3 10.4531 3.60878 9.06165 4.82633Z" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M12 16H12.009" stroke="" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>

                                                </span>
                                                <span>Dashboard</span>
                                            </div>
                                        </li>
                                    </Link>
                                    <Link to="/admin/profile" className="group">
                                        <li onClick={menu_toggle}>
                                            <div className="flex items-center w-full py-4 cursor-pointer space-x-4 group-hover:text-color-1">
                                                <span>
                                                    <svg className="group-hover:stroke-color-1 stroke-white" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M6.57757 15.4816C5.1628 16.324 1.45336 18.0441 3.71266 20.1966C4.81631 21.248 6.04549 22 7.59087 22H16.4091C17.9545 22 19.1837 21.248 20.2873 20.1966C22.5466 18.0441 18.8372 16.324 17.4224 15.4816C14.1048 13.5061 9.89519 13.5061 6.57757 15.4816Z" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M16.5 6.5C16.5 8.98528 14.4853 11 12 11C9.51472 11 7.5 8.98528 7.5 6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5Z" stroke="" strokeWidth="1.5" />
                                                    </svg>

                                                </span>
                                                <span>Profile</span>
                                            </div>
                                        </li>
                                    </Link>
                                    <Link to="/admin/user" className="group">
                                        <li onClick={menu_toggle}>
                                            <div className="flex items-center w-full py-4 cursor-pointer space-x-4 group-hover:text-color-1">
                                                <span>
                                                    <svg className="group-hover:stroke-color-1 stroke-white" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M15 5C15 6.65685 13.2418 8.5 12 8.5C10.7582 8.5 9 6.65685 9 5C9 3.34315 10.3431 2 12 2C13.6569 2 15 3.34315 15 5Z" stroke="" strokeWidth="1.5" />
                                                        <path d="M16.0415 9C17.5645 10.3353 18.5513 12.5969 17.6651 14.7052C17.4742 15.1594 17.0361 15.4539 16.5514 15.4539C16.0585 15.4539 15.2489 15.296 15.0917 15.9374L13.9944 20.4123C13.7656 21.3454 12.9433 22 12 22C11.0567 22 10.2344 21.3454 10.0056 20.4123L8.90833 15.9374C8.75103 15.296 7.94149 15.4539 7.44862 15.4539C6.9639 15.4539 6.52582 15.1594 6.33488 14.7052C5.44866 12.5969 6.43558 10.3353 7.95857 9" stroke="" strokeWidth="1.5" strokeLinecap="round" />
                                                    </svg>

                                                </span>
                                                <span>Users</span>
                                            </div>
                                        </li>
                                    </Link>
                                    <Link to="/admin/slider" className="group">
                                        <li onClick={menu_toggle}>
                                            <div className="flex items-center w-full py-4 cursor-pointer space-x-4 group-hover:text-color-1">
                                                <span>
                                                    <svg className="group-hover:stroke-color-1 stroke-white" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M15 5C15 6.65685 13.2418 8.5 12 8.5C10.7582 8.5 9 6.65685 9 5C9 3.34315 10.3431 2 12 2C13.6569 2 15 3.34315 15 5Z" stroke="" strokeWidth="1.5" />
                                                        <path d="M16.0415 9C17.5645 10.3353 18.5513 12.5969 17.6651 14.7052C17.4742 15.1594 17.0361 15.4539 16.5514 15.4539C16.0585 15.4539 15.2489 15.296 15.0917 15.9374L13.9944 20.4123C13.7656 21.3454 12.9433 22 12 22C11.0567 22 10.2344 21.3454 10.0056 20.4123L8.90833 15.9374C8.75103 15.296 7.94149 15.4539 7.44862 15.4539C6.9639 15.4539 6.52582 15.1594 6.33488 14.7052C5.44866 12.5969 6.43558 10.3353 7.95857 9" stroke="" strokeWidth="1.5" strokeLinecap="round" />
                                                    </svg>

                                                </span>
                                                <span>Slider</span>
                                            </div>
                                        </li>
                                    </Link>
                                  


                                    {
                                        currentUser ?
                                            (<li onClick={Logout} className='group'>
                                                <div className="flex items-center w-full py-4 cursor-pointer space-x-4 group-hover:text-color-1">
                                                    <span>
                                                        <svg className="group-hover:stroke-color-1 stroke-white" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M15 17.625C14.9264 19.4769 13.3831 21.0494 11.3156 20.9988C10.8346 20.987 10.2401 20.8194 9.05112 20.484C6.18961 19.6768 3.70555 18.3203 3.10956 15.2815C3 14.723 3 14.0944 3 12.8373V11.1627C3 9.90561 3 9.27705 3.10956 8.71846C3.70555 5.67965 6.18961 4.32316 9.05112 3.51603C10.2401 3.18064 10.8346 3.01295 11.3156 3.00119C13.3831 2.95061 14.9264 4.52307 15 6.37501" stroke="" strokeWidth="1.5" strokeLinecap="round" />
                                                            <path d="M21 12H10M21 12C21 11.2998 19.0057 9.99153 18.5 9.5M21 12C21 12.7002 19.0057 14.0085 18.5 14.5" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>

                                                    </span>
                                                    <span>Logout</span>
                                                </div>
                                            </li>)
                                            : (<Link to="/admin" className="group">
                                                <li onClick={menu_toggle}>
                                                    <div className="flex items-center w-full py-4 cursor-pointer space-x-4 group-hover:text-color-1">
                                                        <span>
                                                            <svg className="group-hover:stroke-color-1 stroke-white" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M15 17.625C14.9264 19.4769 13.3831 21.0494 11.3156 20.9988C10.8346 20.987 10.2401 20.8194 9.05112 20.484C6.18961 19.6768 3.70555 18.3203 3.10956 15.2815C3 14.723 3 14.0944 3 12.8373V11.1627C3 9.90561 3 9.27705 3.10956 8.71846C3.70555 5.67965 6.18961 4.32316 9.05112 3.51603C10.2401 3.18064 10.8346 3.01295 11.3156 3.00119C13.3831 2.95061 14.9264 4.52307 15 6.37501" stroke="" strokeWidth="1.5" strokeLinecap="round" />
                                                                <path d="M21 12H10M21 12C21 11.2998 19.0057 9.99153 18.5 9.5M21 12C21 12.7002 19.0057 14.0085 18.5 14.5" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                            </svg>

                                                        </span>
                                                        <span>Login</span>
                                                    </div>
                                                </li>
                                            </Link>)
                                    }




                                </ul>
                            </div>



                        </div>
                    </div>
                </nav>
            </header>

        </>
    );

}

export default Header;