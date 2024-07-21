import React from 'react'; 
import { Link } from 'react-router-dom';

const RankCard = ({image_url,name,industry,id,loading=false}) => {

  if(!loading){
    return (
      <>
       <Link to="/profile" state={{profile_id:id}} >
       <div className="flex items-center  w-full justify-between">                                    
          <span className="flex items-center gap-5">
              <div className="size-8 rounded-full overflow-hidden bg-color-5">
                  <img src={image_url} alt=""  className="w-full h-full"/>
              </div>
              <div>{name}</div>
          </span>
          <span>{industry}</span>
      </div>
          </Link>
      
      </>
    )
  }
  else{
    return (
      <>
       
       <div className="flex items-center  w-full justify-between">                                    
          <span className="flex items-center gap-5">
              <div className="size-8 animate-pulse rounded-full overflow-hidden bg-color-5">
                  
              </div>
              <div className='w-20 h-2 bg-color-5 rounded-full animate-pulse'></div>
          </span>
          <span className='w-20 h-2 bg-color-5 rounded-full animate-pulse'></span>
      </div>
          
      
      </>
    )

  }
}

export default RankCard;