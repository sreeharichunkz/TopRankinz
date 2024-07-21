import React from "react";
import { Link } from "react-router-dom";

const Card = ({industry, name, image_url,id,loading=false}) => {

  if(!loading){
    return (
      <>
        <div className="lg:w-fit outline-none">
          <Link to="/profile" state={{profile_id:id}}>
            <div className="h-[110px] w-full lg:w-[244px] lg:h-[130px] bg-gray-300 rounded-md overflow-hidden">
              {
                image_url ? (
                  <img
                  src={image_url}
                  alt=""
                  className="w-full h-full outline-none border-none"
                />
                ):""
              }
            
            </div>
          </Link>
          <div className="py-2 lg:p-2">
            <div className="text-xs text-color-4 font-outfit dark:text-color-5">
              {industry}
            </div>
            <div className="max-lg:text-sm font-outfit-medium text-color-3 dark:text-color-6">
              {name}
            </div>
          </div>
        </div>
      </>
    );
  }
  else{

    return (
      <>
        <div className="lg:w-fit outline-none">
         
            <div className="h-[110px] w-full lg:w-[244px] lg:h-[130px] bg-gray-300 rounded-md overflow-hidden animate-pulse">
             
            </div>
         
          <div className="py-2 lg:p-2">
            <div className="w-10 h-1 bg-color-5 rounded-full text-xs text-color-4 font-outfit dark:text-color-5 animate-pulse">
              
            </div>
            <div className="w-1/2 mt-2 animate-pulse h-2 bg-color-5 rounded-full max-lg:text-sm font-outfit-medium text-color-3 dark:text-color-6">
              
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default Card;
