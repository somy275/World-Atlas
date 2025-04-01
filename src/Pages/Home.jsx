import { NavLink } from "react-router";
import world from "../assets/world.webp";
import { FaArrowRightLong } from "react-icons/fa6";
import gsap from "gsap";
import { useGSAP } from '@gsap/react';
import { useRef } from "react";
export const Home = () => {
    const FirstText = useRef();
    const Secondtext = useRef();
    const button = useRef();
    gsap.registerPlugin(useGSAP);
    useGSAP(() => {
        let tl = gsap.timeline();
        tl.to(FirstText.current, {
            y: 0,
            duration: 0.9,
            ease: "sine"
        })
        tl.to(Secondtext.current, {
            y: 0,
            duration: 0.9,
            ease: "power3"
        })
        tl.to(button.current, {
            opacity: 0.8,
            duration: 1,
            ease: "power3"
        })
    }, {})
    return (
        <section className="font-[urbanist] text-[white] h-screen min-h-[800px] min-[450px]:min-h-[900px] md:min-h-[120vw] lg:min-h-[500px] flex flex-col-reverse lg:flex-row justify-around  items-center px-[2rem] lg:px-[3rem] pt-[8rem] mb-[4rem] lg:mb-[6rem] lg:pt-[9rem]">
            <span className="flex flex-col h-fit gap-y-[1.5rem] relative pt-[min(7vh,13vw)] lg:pt-0 md:gap-y-[2rem] lg:gap-y-[1.5rem] ">
                <span className=" text-[max(3rem,11vw)] leading-[1.15]  text-[#ffd380] min-[450px]:text-[max(clamp(2.8125rem,2.105rem+2.5157vw,3.3125rem),6.2vh)] lg:text-[max(clamp(2.9375rem,2.085rem+1.332vw,3.75rem),7.2vh)] font-bold overflow-hidden">
                    <h3 ref={FirstText} className="translate-y-[100%]">Explore the World, One Country at a Time.</h3>
                </span>
                <span className="text-[1.3rem] min-[450px]:text-[max(clamp(1.120rem,0.7710rem+1.2577vw,1.360rem),2vh)] lg:text-[max(clamp(1rem,0.2787rem+1.127vw,1.6875rem),2.7vh)] leading-[1.4] overflow-hidden">
                    <p ref={Secondtext} className="translate-y-[100%]">
                        Discover the history, culture, and beauty of every nation. Sort, search, and filter through countries to find the details you need.
                    </p>
                </span>
                <NavLink ref={button} to="/country" className="opacity-0 flex gap-x-2 border-2 font-medium min-[450px]:text-[max(clamp(1.120rem,0.7710rem+1.2577vw,1.360rem),2vh)] lg:text-[max(clamp(1rem,0.2787rem+1.127vw,1.6875rem),2.7vh)] border-[#ff8531] text-[#ffd380] items-center rounded-4xl w-fit h-fit px-4 py-2 active:scale-[0.9] active:transition-transform active:duration-[200ms] active-text-[#ff8531]">
                    <button type="button" className=" cursor-pointer ">Start Exploring</button>
                    <FaArrowRightLong />
                </NavLink>
            </span>
            <span className="">
                <img loading="eager" src={world} alt="world" />
            </span>
        </section>
    )
}