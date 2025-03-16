import footerData from '../UI/footerData.json'
import { FaLocationDot } from "react-icons/fa6";
import { IoCall } from "react-icons/io5";
import { LuMailPlus } from "react-icons/lu";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { memo } from 'react';
const Footer = () => {
  const font = {
    "location": <FaLocationDot />,
    "call": <IoCall />,
    "email": <LuMailPlus />
  }
  return (
    <footer className=" h-auto w-screen">
      <div className=' bg-[#003f5c] text-white relative  h-fit w-screen text-[1rem] flex items-center justify-between py-[0.8rem] flex-wrap gap-y-[1rem] px-[2em] lg:px-[3rem]'>
        {
          footerData.map(footerData => {
            return (
              <a href={footerData.link} key={footerData.id} className='flex items-center gap-3 w-auto h-auto '>
                <span className=' text-[#ffd380] text-[1rem] min-[450px]:text-[max(clamp(1.120rem,0.7710rem+1.2577vw,1.360rem),2vh)] lg:text-[max(clamp(1rem,0.2787rem+1.127vw,1.6875rem),2.7vh)]'>
                  {
                    font[footerData.icon]
                  }
                </span>
                <span>
                  <h4 className='font-[600] text-[1rem] min-[450px]:text-[max(clamp(1.120rem,0.7710rem+1.2577vw,1.360rem),2vh)] lg:text-[max(clamp(1rem,0.2787rem+1.127vw,1.6875rem),2.7vh)]'>{footerData.find}</h4>
                  <p className='text-[0.8rem] min-[450px]:text-[max(clamp(0.9375rem,0.5837rem+1.2579vw,1.1875rem),1.7vh)] lg:text-[max(clamp(0.8125rem,0.2223rem+0.9221vw,1.375rem),2.2vh)]  text-white opacity-[0.5]'>
                    {footerData.place}</p>
                </span>
              </a>
            )
          }
          )
        }
      </div>
      <div className='bg-[#ffd380] h-fit w-screen px-[2em] lg:px-[3rem] flex justify-between items-center py-[0.8rem] flex-wrap'>
        <span className='w-full md:w-[60%]'>
          <h5 className=' text-[#003f5c] text-[0.9rem] text-center md:text-left min-[450px]:text-[max(clamp(0.9375rem,0.5837rem+1.2579vw,1.1875rem),1.7vh)] lg:text-[max(clamp(0.8125rem,0.2223rem+0.9221vw,1.375rem),2.2vh)]'>Copyright © 2024. All Rights Reserved.</h5>
        </span>
        <span className='w-full text-[#003f5c] flex md:w-[40%] lg:w-[30%] pt-4 md:pt-0 justify-around text-[1.3rem] min-[450px]:text-[max(clamp(1.720rem,0.7710rem+1.2577vw,1.960rem),2.2vh)] lg:text-[max(clamp(1.2625rem,0.4723rem+0.9221vw,1.625rem),2.7vh)] font-[600]'>
          <FaInstagram />
          <FaFacebook />
          <FaLinkedin />
          <FaGithub />
        </span>
      </div>
    </footer>
  )
}
export default memo(Footer)