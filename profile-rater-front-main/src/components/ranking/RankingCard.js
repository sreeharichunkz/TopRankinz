/* eslint-disable no-octal-escape */
import React from 'react';
import { Link } from 'react-router-dom';



const RankingCard = ({ rank, image_url, name, industry, age, like, dislike, rating, id, loading = false }) => {

    if (!loading) {
        return (
            <>
                <tr className=" border-b-[0.5px] border-gray-100 dark:border-color-4 *:py-3 *:px-2">
                    <td className=" text-color-3 dark:text-color-5  font-outfit-medium">{rank}.</td>

                    <td className=" text-color-3 dark:text-color-5 max-lg:text-sm font-outfit-medium">
                        <span className="flex items-center gap-6">
                            <Link to="/profile" state={{ profile_id: id }}>
                                <div className="size-10 rounded-full overflow-hidden bg-color-5">
                                    <img src={image_url} alt="" className="w-full h-full" />
                                </div>
                            </Link>
                            <Link to="/profile" state={{ profile_id: id }}>
                                <div>{name}</div>
                            </Link>
                        </span>
                    </td>
                    <td className=" text-color-3 dark:text-color-5 max-lg:hidden font-outfit-medium">{industry}</td>
                    <td className=" text-color-3 dark:text-color-5 max-lg:hidden font-outfit-medium">{age}</td>
                    <td className="py-3 px-2 max-lg:hidden"></td>
                    <td className="py-3 px-2 max-lg:hidden"></td>
                    <td className=" text-color-3 dark:text-color-5 max-lg:hidden font-outfit-medium">{like}</td>
                    <td className=" text-color-3 dark:text-color-5 max-lg:hidden font-outfit-medium">{dislike}</td>
                    <td className=" text-color-3 dark:text-color-5 max-lg:text-sm font-outfit-medium overflow-hidden">
                        <div className='flex flex-col justify-center items-center'>
                            <div className=''>
                                <div className="flex flex-row-reverse justify-center scale-50">
                                    <div className={` ${rating>=5? 'text-color-1':'text-gray-300'}  transition-colors duration-300 before:content-['\\2605'] before:text-3xl cursor-pointer peer-hover:text-color-1`}></div>
                                    <div className={` ${rating>=4? 'text-color-1':'text-gray-300'}  transition-colors duration-300 before:content-['\\2605'] before:text-3xl cursor-pointer peer-hover:text-color-1`}></div>
                                    <div className={` ${rating>=3? 'text-color-1':'text-gray-300'}  transition-colors duration-300 before:content-['\\2605'] before:text-3xl cursor-pointer peer-hover:text-color-1`}></div>
                                    <div className={` ${rating>=2? 'text-color-1':'text-gray-300'}  transition-colors duration-300 before:content-['\\2605'] before:text-3xl cursor-pointer peer-hover:text-color-1`}></div>
                                    <div className={` ${rating>=1? 'text-color-1':'text-gray-300'}  transition-colors duration-300 before:content-['\\2605'] before:text-3xl cursor-pointer peer-hover:text-color-1`}></div>
                                </div>
                            </div>
                            <div>
                                {rating ?? 0}/5
                            </div>
                        </div>

                    </td>
                    <td className="text-end max-lg:text-sm">
                        <Link to="/profile" state={{ profile_id: id }} className="text-color-1 underline decoration-color-1  hover:text-color-1/75">
                            Explore
                        </Link>
                    </td>
                </tr>
            </>
        )
    }
    else {
        return (
            <>
                <tr className=" border-b-[0.5px] border-gray-100 dark:border-color-4 *:py-3 *:px-2">
                    <td className=" text-color-3 dark:text-color-5 max-lg:hidden font-outfit-medium">
                        <div className='w-5 h-2 bg-color-5 animate-pulse rounded-full'></div>
                    </td>

                    <td className=" text-color-3 dark:text-color-5 max-lg:text-sm font-outfit-medium">
                        <span className="flex items-center gap-6">
                            <div className="size-10 animate-pulse rounded-full overflow-hidden bg-color-5">

                            </div>
                            <div className='w-20 h-3 bg-color-5 animate-pulse rounded-full'></div>
                        </span>
                    </td>
                    <td className=" text-color-3 dark:text-color-5 max-lg:hidden font-outfit-medium">
                        <div className='w-14 h-2 bg-color-5 animate-pulse rounded-full'></div>
                    </td>
                    <td className=" text-color-3 dark:text-color-5 max-lg:hidden font-outfit-medium">
                        <div className='w-5 h-2 bg-color-5 animate-pulse rounded-full'></div>
                    </td>
                    <td className="py-3 px-2 max-lg:hidden"></td>
                    <td className="py-3 px-2 max-lg:hidden"></td>
                    <td className=" text-color-3 dark:text-color-5 max-lg:hidden font-outfit-medium">
                        <div className='w-5 h-2 bg-color-5 animate-pulse rounded-full'></div>
                    </td>
                    <td className="text-color-3 dark:text-color-5 max-lg:hidden font-outfit-medium">
                        <div className='w-5 h-2 bg-color-5 animate-pulse rounded-full'></div>
                    </td>
                    <td className="text-color-3 dark:text-color-5 max-lg:text-sm font-outfit-medium">
                        <div className='w-5 h-2 bg-color-5 animate-pulse rounded-full'></div>
                    </td>
                    <td className="text-end max-lg:text-sm">
                        <div className="text-color-1 underline decoration-color-1  hover:text-color-1/75">
                            Explore
                        </div>
                    </td>
                </tr>
            </>
        )
    }

}

export default RankingCard