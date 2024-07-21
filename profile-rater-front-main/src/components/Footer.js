import React from 'react'

export const Footer = () => {
  return (
    <>
     <footer>
        <section>
            <div className="flex justify-center items-center gap-x-4 lg:gap-x-10 py-4 bg-white dark:bg-color-2">
                <a href="/">
                    <div className="text-[12px] text-color-4 hover:text-color-1 w-fit dark:text-color-6">About</div>
                </a>
                <a href="/">
                    <div className="text-[12px] text-color-4 hover:text-color-1 w-fit dark:text-color-6">Contact</div>
                </a>
                <a href="/">
                    <div className="text-[12px] text-color-4 hover:text-color-1 w-fit dark:text-color-6">Privacy Policy</div>
                </a>
                <a href="/">
                    <div className="text-[12px] text-color-4 hover:text-color-1 w-fit dark:text-color-6">Legal</div>
                </a>
                <a href="/">
                    <div className="text-[12px] text-color-4 hover:text-color-1 w-fit dark:text-color-6">Sitemap</div>
                </a>
                
            </div>
        </section>
    </footer>
    <script src='/assets/script/script.js'></script>
    
    </>
  )
}

export default Footer;
