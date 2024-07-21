import React from 'react'
// import { Link } from 'react-router-dom'

const Hero = ({title1, title2, name, image_url}) => {
  return (
    <>
    
    <section>
            <div className="bg-color-8 max-h-[700px] lg:h-[90vh] h-[220px] flex ">
                <div className="w-full pl-8 pt-5 lg:pl-32 lg:pt-32 space-y-5 lg:space-y-20 lg:max-w-fit min-w-fit max-lg:self-center">
                    <div>
                        <div className="text-xs lg:text-4xl font-outfit-extrabold text-color-4">{title1}</div>
                        <div className="font-outfit-extrabold max-lg:text-3xl lg:text-[86px] text-color-3">{title2}</div>
                        <div className="text-2xl lg:text-[56px] text-color-3 font-savoye mt-2">{name}</div>
                    </div>
                    {/* <div className="flex items-center">
                        <span>
                            <svg className="max-lg:hidden" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <mask id="mask0_25_85" style={{maskType:'alpha'}} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                                    <rect width="24" height="24" fill="#D9D9D9" />
                                </mask>
                                <g mask="url(#mask0_25_85)">
                                    <path d="M16.15 13H5C4.71667 13 4.47917 12.9042 4.2875 12.7125C4.09583 12.5208 4 12.2833 4 12C4 11.7167 4.09583 11.4792 4.2875 11.2875C4.47917 11.0958 4.71667 11 5 11H16.15L13.3 8.15C13.1 7.95 13.0042 7.71666 13.0125 7.45C13.0208 7.18333 13.1167 6.95 13.3 6.75C13.5 6.55 13.7375 6.44583 14.0125 6.4375C14.2875 6.42916 14.525 6.525 14.725 6.725L19.3 11.3C19.4 11.4 19.4708 11.5083 19.5125 11.625C19.5542 11.7417 19.575 11.8667 19.575 12C19.575 12.1333 19.5542 12.2583 19.5125 12.375C19.4708 12.4917 19.4 12.6 19.3 12.7L14.725 17.275C14.525 17.475 14.2875 17.5708 14.0125 17.5625C13.7375 17.5542 13.5 17.45 13.3 17.25C13.1167 17.05 13.0208 16.8167 13.0125 16.55C13.0042 16.2833 13.1 16.05 13.3 15.85L16.15 13Z" fill="#E8B923" />
                                </g>
                            </svg>

                            <svg className="lg:hidden" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <mask id="mask0_153_7" style={{maskType:'alpha'}} maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="20">
                                <rect width="20" height="20" fill="#D9D9D9"/>
                                </mask>
                                <g mask="url(#mask0_153_7)">
                                <path d="M13.4583 10.8333H4.16665C3.93054 10.8333 3.73262 10.7534 3.5729 10.5937C3.41317 10.434 3.33331 10.2361 3.33331 9.99997C3.33331 9.76386 3.41317 9.56594 3.5729 9.40622C3.73262 9.2465 3.93054 9.16664 4.16665 9.16664H13.4583L11.0833 6.79164C10.9166 6.62497 10.8368 6.43052 10.8437 6.2083C10.8507 5.98608 10.9305 5.79164 11.0833 5.62497C11.25 5.4583 11.4479 5.3715 11.6771 5.36455C11.9062 5.35761 12.1041 5.43747 12.2708 5.60414L16.0833 9.41664C16.1666 9.49997 16.2257 9.59025 16.2604 9.68747C16.2951 9.78469 16.3125 9.88886 16.3125 9.99997C16.3125 10.1111 16.2951 10.2152 16.2604 10.3125C16.2257 10.4097 16.1666 10.5 16.0833 10.5833L12.2708 14.3958C12.1041 14.5625 11.9062 14.6423 11.6771 14.6354C11.4479 14.6284 11.25 14.5416 11.0833 14.375C10.9305 14.2083 10.8507 14.0139 10.8437 13.7916C10.8368 13.5694 10.9166 13.375 11.0833 13.2083L13.4583 10.8333Z" fill="#E8B923"/>
                                </g>
                                </svg>
                                

                        </span>
                        <span>
                            <Link to="ranking" className="text-color-1 underline decoration-color-1 lg:text-xl font-outfit-medium text-sm">Full Ranking</Link>
                        </span>
                    </div> */}
                </div>
                <div className="flex-grow-0">
                    <img src={image_url} alt="" className="w-full h-full"/>
                </div>
            </div>
        </section>
    
    </>
  )
}

export default Hero