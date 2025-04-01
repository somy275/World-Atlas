import { NavLink, useLocation, useRouteError } from "react-router"
import ErrorPage404 from "../assets/ErrorPage404.webp"
export const PageError = () => {
    const errors = useRouteError();
    const location = useLocation();
    // if the page is not available, then page not found image is displayed
    if (errors.status === 404 || location.key == "default") {
        return (
            <div className='h-screen w-screen flex flex-col items-center justify-around '>
                <img className='h-auto min-h-fit w-full min-[450px]:w-[max(60vh,75%)] min-[450px]:h-auto md:w-[max(60vh,70%)] md:min-h-[69vw] lg:w-[max(37vw,60vh)] lg:h-[60%] lg:min-h-fit object-top object-cover relative' src={ErrorPage404}></img>
                <span className='flex gap-20 relative text-[max(clamp(0.8rem,0.8308rem+0.8734vw,1.25rem),2vh)] md:text-[max(clamp(1.25rem,0.125rem+2.3438vw,1.625rem),2.3vh)] lg:text-[max(clamp(0.9375rem,0.5441rem+0.6148vw,1.3125rem),2.3vh)] lg:bottom-[5%]'>
                    <NavLink to="/" className="text-[#F6F8FB] font-[600] bg-[#48459C] py-1 px-2 rounded-2xl active:scale-[0.85] active:text-[#F68A1E] active:transition-transform active:duration-[200ms]">Go to HomePage</NavLink>
                    <button className='text-[#F6F8FB] font-[600] bg-[#48459C] px-2 py-1 lg:px-3 rounded-2xl active:scale-[0.85] active:text-[#F68A1E] active:transition-transform active:duration-[200ms] cursor-pointer' onClick={() => window.history.back()} >Go Back</button>
                </span>
            </div>
        )
    }
    return (
        <>

        </>
    )
}
