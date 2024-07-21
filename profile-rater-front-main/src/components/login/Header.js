import React, { useEffect, useState } from 'react';


import Cookies from 'js-cookie';


import {Link} from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

 function Header(){
    

    const darkmode = Cookies.get('darkTheme') === 'true';
    const [darkMode, setDarkMode] = useState(darkmode);

    const { currentUser, handleLogout } = useAuth();



  useEffect(() => {
    document.body.classList.add('bg-gradient-to-b');
    document.body.classList.add('from-[#0E3750]');
    document.body.classList.add('to-[#050509]');

    if (document.body.classList.contains('dark')) {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
      Cookies.set('darkTheme', true,{ expires: 365 });
    } else {
      document.body.classList.remove('dark');
      Cookies.set('darkTheme', false,{ expires: 365 });
    }
  }, [darkMode]);

  const dark_theme_toggle = () => {
    setDarkMode(!darkMode);
  };

  function menu_toggle() {
    document.getElementById('menu').classList.toggle('-right-full');
    document.getElementById('menu').classList.toggle('right-0');
    document.getElementById('menu').classList.toggle('animate__fadeInRight');
    document.getElementById('menu').classList.toggle('animate__fadeOutRight');
  }

    
  return (
   <>
         <header className="bg-transparent py-1 lg:py-4">
        <nav className="">
            <div className="mx-4 lg:mx-14 flex justify-between items-center py-3 lg:py-4 ">
                <Link to="/" className="">
                    <div>
                        <img src={`${process.env.PUBLIC_URL}/assets/images/logo.png`} alt="" className="w-20 lg:w-32"/>
                    </div>
                </Link>
                <div className="flex items-center gap-3 lg:gap-10 *:cursor-pointer">


                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" value="" className="sr-only peer" onClick={dark_theme_toggle} onChange={dark_theme_toggle} checked={darkMode}/>
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
                    
                    <div onClick={menu_toggle} className="flex rounded-full items-center p-3 lg:px-3 lg:py-2 gap-2  group/menu h-12">
                        <div className="">
                            <svg className="stroke-color-6" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 12H14" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M4 5H20" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M4 19H20" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <div className=" max-lg:hidden text-white">Menu</div>
                    </div>
                </div>
            </div>

            <div id="menu" className="bg-gradient-to-b from-[#0E3750] to-[#050509] min-h-screen w-4/5 lg:w-2/5 fixed -right-full top-0 z-50 transition-all duration-700 overflow-y-hidden overflow-x-hidden animate__animated animate__fast animate__fadeOutRight pt-5 max-lg:pl-7">
                <div className="px-4 lg:px-8 py-8">
                    <div className="w-full flex lg:justify-end lg:pr-10 group">
                        <button onClick={menu_toggle} className="group cursor-pointer outline-none space-x-3 duration-300 flex group-hover:text-color-1">
                            <svg className='fill-white group-hover:fill-color-1' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <mask id="mask0_135_600" style={{maskType:'alpha'}} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                                    <rect width="24" height="24" transform="matrix(-1 0 0 1 24 0)" fill="#D9D9D9" />
                                </mask>
                                <g mask="url(#mask0_135_600)">
                                    <path d="M17.2 13L14.3 15.9C14.1166 16.0833 14.025 16.3167 14.025 16.6C14.025 16.8833 14.1166 17.1167 14.3 17.3C14.4833 17.4833 14.7166 17.575 15 17.575C15.2833 17.575 15.5166 17.4833 15.7 17.3L20.3 12.7C20.4 12.6 20.4708 12.4917 20.5125 12.375C20.5541 12.2583 20.575 12.1333 20.575 12C20.575 11.8667 20.5541 11.7417 20.5125 11.625C20.4708 11.5083 20.4 11.4 20.3 11.3L15.7 6.69999C15.5166 6.51665 15.2833 6.42499 15 6.42499C14.7166 6.42499 14.4833 6.51665 14.3 6.69999C14.1166 6.88332 14.025 7.11665 14.025 7.39999C14.025 7.68332 14.1166 7.91665 14.3 8.09999L17.2 11H3.99995C3.71662 11 3.47912 11.0958 3.28745 11.2875C3.09578 11.4792 2.99995 11.7167 2.99995 12C2.99995 12.2833 3.09578 12.5208 3.28745 12.7125C3.47912 12.9042 3.71662 13 3.99995 13H17.2Z" />
                                </g>
                            </svg>

                            <span className="text-white  group-hover:text-color-1">Back</span>

                        </button>
                    </div>
                    <div className=" lg:pl-20 py-8 text-white text-sm pt-10 lg:pt-32">
                        <ul>

                            <Link to="/" className="group" onClick={menu_toggle}>
                                <li>
                                    <div className="flex items-center w-full py-4 cursor-pointer space-x-4 group-hover:text-color-1">
                                        <span>
                                            <svg className="group-hover:stroke-color-1 stroke-white" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M9.06165 4.82633L3.23911 9.92134C2.7398 10.3583 3.07458 11.1343 3.76238 11.1343C4.18259 11.1343 4.52324 11.4489 4.52324 11.8371V15.0806C4.52324 17.871 4.52324 19.2662 5.46176 20.1331C6.40029 21 7.91082 21 10.9319 21H13.0681C16.0892 21 17.5997 21 18.5382 20.1331C19.4768 19.2662 19.4768 17.871 19.4768 15.0806V11.8371C19.4768 11.4489 19.8174 11.1343 20.2376 11.1343C20.9254 11.1343 21.2602 10.3583 20.7609 9.92134L14.9383 4.82633C13.5469 3.60878 12.8512 3 12 3C11.1488 3 10.4531 3.60878 9.06165 4.82633Z" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M12 16H12.009" stroke="" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>

                                        </span>
                                        <span>Home</span>
                                    </div>
                                </li>
                            </Link>
                            {
                                currentUser && 
                                <Link to={`${currentUser?'/account':'/login'}`} className="group" onClick={menu_toggle}>
                                <li>
                                    <div className="flex items-center w-full py-4 cursor-pointer space-x-4 group-hover:text-color-1">
                                        <span>
                                            <svg className="group-hover:stroke-color-1 stroke-white" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6.57757 15.4816C5.1628 16.324 1.45336 18.0441 3.71266 20.1966C4.81631 21.248 6.04549 22 7.59087 22H16.4091C17.9545 22 19.1837 21.248 20.2873 20.1966C22.5466 18.0441 18.8372 16.324 17.4224 15.4816C14.1048 13.5061 9.89519 13.5061 6.57757 15.4816Z" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M16.5 6.5C16.5 8.98528 14.4853 11 12 11C9.51472 11 7.5 8.98528 7.5 6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5Z" stroke="" strokeWidth="1.5" />
                                            </svg>

                                        </span>
                                        <span>Account</span>
                                    </div>
                                </li>
                            </Link>
                            }
                            <Link to="/ranking" className="group" onClick={menu_toggle}>
                                <li>
                                    <div className="flex items-center w-full py-4 cursor-pointer space-x-4 group-hover:text-color-1">
                                        <span>
                                            <svg className="group-hover:stroke-color-1 stroke-white" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M15 5C15 6.65685 13.2418 8.5 12 8.5C10.7582 8.5 9 6.65685 9 5C9 3.34315 10.3431 2 12 2C13.6569 2 15 3.34315 15 5Z" stroke="" strokeWidth="1.5" />
                                                <path d="M16.0415 9C17.5645 10.3353 18.5513 12.5969 17.6651 14.7052C17.4742 15.1594 17.0361 15.4539 16.5514 15.4539C16.0585 15.4539 15.2489 15.296 15.0917 15.9374L13.9944 20.4123C13.7656 21.3454 12.9433 22 12 22C11.0567 22 10.2344 21.3454 10.0056 20.4123L8.90833 15.9374C8.75103 15.296 7.94149 15.4539 7.44862 15.4539C6.9639 15.4539 6.52582 15.1594 6.33488 14.7052C5.44866 12.5969 6.43558 10.3353 7.95857 9" stroke="" strokeWidth="1.5" strokeLinecap="round" />
                                            </svg>

                                        </span>
                                        <span>People</span>
                                    </div>
                                </li>
                            </Link>
                            {
                                currentUser && 
                                <Link to={`${currentUser?'/activities':'/login'}`} className="group" onClick={menu_toggle}>
                                <li>
                                    <div className="flex items-center w-full py-4 cursor-pointer space-x-4 group-hover:text-color-1">
                                        <span>
                                            <svg className="group-hover:stroke-color-1 stroke-white" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M7.6525 4.7864L7.47496 5.34293C7.32949 5.79895 7.25675 6.02697 7.31268 6.20705C7.35794 6.35273 7.45729 6.47831 7.59267 6.56093C7.76001 6.66306 8.01314 6.66306 8.51941 6.66306H8.78875C10.5021 6.66306 11.3588 6.66306 11.7634 7.15531C11.8097 7.21157 11.8508 7.27139 11.8864 7.33414C12.1977 7.88315 11.8438 8.62273 11.136 10.1019C10.4865 11.4593 10.1617 12.138 9.55868 12.5375C9.50031 12.5761 9.44032 12.6126 9.37886 12.6468C8.74403 13 7.95744 13 6.38427 13H6.04306C4.13715 13 3.18419 13 2.59209 12.4432C2 11.8864 2 10.9902 2 9.19784V8.56787C2 7.62594 2 7.15498 2.17223 6.72392C2.34445 6.29285 2.67424 5.93842 3.3338 5.22955L6.06141 2.29801C6.12982 2.22449 6.16403 2.18772 6.19418 2.16225C6.47569 1.92448 6.91015 1.95124 7.15627 2.22152C7.18264 2.25047 7.21145 2.29112 7.26908 2.37241C7.35922 2.49956 7.40429 2.56314 7.44357 2.62613C7.79522 3.19003 7.90162 3.85988 7.74053 4.4958C7.72254 4.56683 7.69918 4.64006 7.6525 4.7864Z" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M16.3475 19.2136L16.525 18.6571C16.6705 18.201 16.7433 17.973 16.6873 17.793C16.6421 17.6473 16.5427 17.5217 16.4073 17.4391C16.24 17.3369 15.9869 17.3369 15.4806 17.3369H15.2113C13.4979 17.3369 12.6412 17.3369 12.2366 16.8447C12.1903 16.7884 12.1492 16.7286 12.1136 16.6659C11.8023 16.1168 12.1562 15.3773 12.864 13.8981C13.5135 12.5407 13.8383 11.862 14.4413 11.4625C14.4997 11.4239 14.5597 11.3874 14.6211 11.3532C15.256 11 16.0426 11 17.6157 11H17.9569C19.8629 11 20.8158 11 21.4079 11.5568C22 12.1136 22 13.0098 22 14.8022V15.4321C22 16.3741 22 16.845 21.8278 17.2761C21.6555 17.7071 21.3258 18.0616 20.6662 18.7705L17.9386 21.702C17.8702 21.7755 17.836 21.8123 17.8058 21.8378C17.5243 22.0755 17.0898 22.0488 16.8437 21.7785C16.8174 21.7495 16.7885 21.7089 16.7309 21.6276C16.6408 21.5004 16.5957 21.4369 16.5564 21.3739C16.2048 20.81 16.0984 20.1401 16.2595 19.5042C16.2775 19.4332 16.3008 19.3599 16.3475 19.2136Z" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>

                                        </span>
                                        <span>Activities</span>
                                    </div>
                                </li>
                            </Link>
                            }
                            <Link to="/contact" className="group" onClick={menu_toggle}>
                                <li>
                                    <div className="flex items-center w-full py-4 cursor-pointer space-x-4 group-hover:text-color-1">
                                        <span>
                                            <svg className="group-hover:stroke-color-1 stroke-white" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M14.1706 20.8905C18.3536 20.6125 21.6856 17.2332 21.9598 12.9909C22.0134 12.1607 22.0134 11.3009 21.9598 10.4707C21.6856 6.22838 18.3536 2.84913 14.1706 2.57107C12.7435 2.47621 11.2536 2.47641 9.8294 2.57107C5.64639 2.84913 2.31441 6.22838 2.04024 10.4707C1.98659 11.3009 1.98659 12.1607 2.04024 12.9909C2.1401 14.536 2.82343 15.9666 3.62791 17.1746C4.09501 18.0203 3.78674 19.0758 3.30021 19.9978C2.94941 20.6626 2.77401 20.995 2.91484 21.2351C3.05568 21.4752 3.37026 21.4829 3.99943 21.4982C5.24367 21.5285 6.08268 21.1757 6.74868 20.6846C7.1264 20.4061 7.31527 20.2668 7.44544 20.2508C7.5756 20.2348 7.83177 20.3403 8.34401 20.5513C8.8044 20.7409 9.33896 20.8579 9.8294 20.8905C11.2536 20.9852 12.7435 20.9854 14.1706 20.8905Z" stroke="" strokeWidth="1.5" strokeLinejoin="round" />
                                                <path d="M11.9953 12H12.0042M15.9908 12H15.9998M7.99976 12H8.00873" stroke="" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>

                                        </span>
                                        <span>Contact Us</span>
                                    </div>
                                </li>
                            </Link>
                            <Link to="/helpcenter" className="group" onClick={menu_toggle}>
                                <li>
                                    <div className="flex items-center w-full py-4 cursor-pointer space-x-4 group-hover:text-color-1">
                                        <span>
                                            <svg className="group-hover:stroke-color-1 stroke-white" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="" strokeWidth="1.5" />
                                                <path d="M10 9C10 7.89543 10.8954 7 12 7C13.1046 7 14 7.89543 14 9C14 9.39815 13.8837 9.76913 13.6831 10.0808C13.0854 11.0097 12 11.8954 12 13V13.5" stroke="" strokeWidth="1.5" strokeLinecap="round" />
                                                <path d="M11.992 17H12.001" stroke="" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>

                                        </span>
                                        <span>Help Center</span>
                                    </div>
                                </li>
                            </Link>
                            {
                            currentUser ?   
                            (<li onClick={handleLogout} className='group'>
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
                        :   (<Link to="/login" className="group" >
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
                            </Link> )
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