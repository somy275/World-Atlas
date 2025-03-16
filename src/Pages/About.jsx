import Facts from "../Pages/Facts.json";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
export const About = () => {
    gsap.registerPlugin(useGSAP, ScrollTrigger);
    const factRef = useRef();
    useGSAP(() => {
        let tl = gsap.timeline();
        Object.keys(Facts).forEach((idx) => {
            gsap.set(factRef.current.children[idx], {
                translateX: "-400%"
            })
            tl.to(factRef.current.children[idx], {
                translateX: "0%",
                ease: "power2.inOut",
                duration: 1.4,
                scrollBehavior: "smooth",
                stagger: 0.1,
                scrollTrigger: {
                    trigger: factRef.current.children[idx],
                    start: "top 50%",
                    end: "top 50%",
                    scrub: 1,
                    
                },
            });
        })
    }, {})

    return (
        <section className="h-auto w-screen py-[6rem]">
            <span className="relative  text-[white] text-center text-[max(clamp(1.625rem,1.1597rem+2.4017vw,2.3125rem),2vh)] lg:text-[max(clamp(2.375rem,1.5881rem+1.2295vw,3.125rem),1.8vh)]  font-[600]">
                <h3 className="px-[2rem] ">Here are the Interesting Facts</h3>
                <h3 className="px-[2rem] ">We&apos;re proud of</h3>
            </span>
            <ul ref={factRef} className="w-screen h-auto grid grid-cols-1 lg:grid-cols-3  text-[#003f5c]  grid-rows-3 gap-9 place-items-center px-[2rem] py-[3rem]">
                {
                    Facts.map((fact) => {
                        return (
                            <li key={fact.id} className=" h-[-webkit-fill-available] max-w-[550px] w-[95%] flex flex-col justify-evenly gap-y-[1rem] pt-[1rem] pb-[2.5rem] px-[2.5rem] lg:px-[1.8rem] inset-shadow-[7px_7px_10px_-5px_rgba(0,0,0,0.75)] shadow-[10px_10px_15px_-5px_rgba(0,0,0,0.75)] bg-[linear-gradient(20deg,#ffa600,white)] relative rounded-4xl overflow-hidden">
                                <h3 className="text-[max(1.6rem,6.5vw)]  min-[450px]:text-[max(1.7rem,4.5vw)] md:text-[max(2.2rem,3.5vw)] lg:text-[max(clamp(1.6875rem,0.5727rem+1.7418vw,2.75rem),4vh)] font-[600]">{fact.Country}</h3>
                                <span className=" font-[500] flex flex-col gap-y-[0.4rem] text-[max(clamp(1rem,0.8308rem+0.8734vw,1.25rem),2.2vh)] md:text-[max(clamp(1.25rem,0.125rem+2.3438vw,1.625rem),2.3vh)] lg:text-[max(clamp(0.9375rem,0.5441rem+0.6148vw,1.3125rem),2.3vh)]">
                                    <p>Capital: {fact.Capital}</p>
                                    <p>Population: {fact.Population}</p>
                                    <p className=" leading-[1.]">Facts: {fact.Facts}</p>
                                </span>
                            </li>
                        )
                    })
                }
            </ul>
        </section>
    )
}
