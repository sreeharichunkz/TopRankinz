import React from 'react';
import { useState } from 'react';

const QAns = ({question, answer}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAnswer = () => {
      setIsOpen(!isOpen);
    };
  
  return (
    <>
     <div className=''>


     <div onClick={toggleAnswer} className="question  flex justify-between items-center cursor-pointer py-3 border-b-[0.5px] border-t-[0.5px] border-gray-300">
                            <span className='text-color-3 dark:text-color-5'>{question}</span>

                                                                                   
                                <span className={`questionplus ${isOpen?'hidden':''}`}>
                                    <svg className='fill-color-3 dark:fill-color-5' width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <mask id="mask0_135_683" style={{maskType:'alpha'}} maskUnits="userSpaceOnUse" x="0" y="0" width="21" height="20">
                                        <rect x="0.27832" width="20" height="20" fill="#D9D9D9"/>
                                        </mask>
                                        <g mask="url(#mask0_135_683)">
                                        <path d="M9.44531 10.8333H5.27865C5.04253 10.8333 4.84462 10.7535 4.6849 10.5937C4.52517 10.434 4.44531 10.2361 4.44531 10C4.44531 9.76389 4.52517 9.56597 4.6849 9.40625C4.84462 9.24653 5.04253 9.16666 5.27865 9.16666H9.44531V5C9.44531 4.76389 9.52517 4.56597 9.6849 4.40625C9.84462 4.24653 10.0425 4.16666 10.2786 4.16666C10.5148 4.16666 10.7127 4.24653 10.8724 4.40625C11.0321 4.56597 11.112 4.76389 11.112 5V9.16666H15.2786C15.5148 9.16666 15.7127 9.24653 15.8724 9.40625C16.0321 9.56597 16.112 9.76389 16.112 10C16.112 10.2361 16.0321 10.434 15.8724 10.5937C15.7127 10.7535 15.5148 10.8333 15.2786 10.8333H11.112V15C11.112 15.2361 11.0321 15.434 10.8724 15.5937C10.7127 15.7535 10.5148 15.8333 10.2786 15.8333C10.0425 15.8333 9.84462 15.7535 9.6849 15.5937C9.52517 15.434 9.44531 15.2361 9.44531 15V10.8333Z" fill=""/>
                                        </g>
                                    </svg>

                                </span>

                                
                                <span className={`questionminus mx-1 w-3 h-0.5 mr-1 rounded-full bg-color-3 dark:bg-color-5 ${isOpen?'':'hidden'}`}></span>
                        </div>
                        <div id="answer1" className={`answers ${isOpen?'':'hidden'} text-sm text-color-3 dark:text-color-5 border-b-[0.5px] border-gray-300 py-5 px-0`}>                           
                            {answer}
                        </div>

                        </div>
    
    </>
  )
}

export default QAns