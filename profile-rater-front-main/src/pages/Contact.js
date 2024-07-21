import React from 'react'

const Login = () => {



 
  
  return (
   <>
   
   <main>
        <section className='min-h-screen'>
            <div className="h-screen w-full max-lg:px-2 lg:my-16 my-5">
                <div className="bg-color-9 dark:bg-color-2 min-h-[90vh] w-full lg:w-2/5 mx-auto relative lg:px-16 px-5 py-10 text-center space-y-10">

                    <div className="font-outfit-bold text-5xl text-color-3 dark:text-color-6">Contact Us</div>
                    <div className="w-full">
                        <form action="" className="space-y-4">
                            <input className="bg-transparent outline-none border w-full h-16 px-4 pr-10 placeholder:text-color-4 text-color-4 dark:placeholder:text-color-5 dark:text-color-5 border-color-5" type="text" placeholder="Name"/>
                            <input className="bg-transparent outline-none border w-full h-16 px-4 pr-10 placeholder:text-color-4 text-color-4 dark:placeholder:text-color-5 dark:text-color-5 border-color-5" type="number" placeholder="Phone Number"/>
                            <input className="bg-transparent outline-none border w-full h-16 px-4 pr-10 placeholder:text-color-4 text-color-4 dark:placeholder:text-color-5 dark:text-color-5 border-color-5" type="email" placeholder="Email"/>

                           
                            <textarea className="bg-transparent outline-none border w-full h-32 pt-5 px-4 pr-10 placeholder:text-color-4 text-color-4 dark:placeholder:text-color-5 dark:text-color-5 border-color-5"  placeholder='Write your message'/>
                            <button type="submit" className="bg-color-1 w-full text-white py-3 !mt-10">SEND MESSAGE</button>
                        </form>
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

                   
                </div>
            </div>
        </section>
    </main>
   </>
  )
}

export default Login;