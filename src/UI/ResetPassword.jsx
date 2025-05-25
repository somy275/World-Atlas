import { useForm } from 'react-hook-form';
import { notifyOnError, notifyOnSuccess } from '../Pages/NotifyOnForm';
import { ToastContainer } from 'react-toastify';
import { useRef } from 'react';
import { OtpGenerator } from './GenerateOtp';
import { IoIosArrowRoundBack } from 'react-icons/io';
// eslint-disable-next-line react/prop-types
export const ResetPassword = ({ setOTPSend, setOTP }) => {
    const { register, handleSubmit, formState } = useForm();
    const { errors } = formState;
    const reset = useRef()
    let onReset = (e) => { //When the form is submitted for reset password then this function is executed
        if (localStorage.getItem("UserEmail") != e.ResetEmail || localStorage.getItem("UserEmail") == null) { //If the user email does not match or does not exist then this condition is executed
            notifyOnError("User does not exist")
        }
        else {   //If the user email matches then user password is reset
            reset.current.reset();
            notifyOnSuccess("4-digit OTP has been sent in your email address")
            setOTP(OtpGenerator())
            setTimeout(() => {
                setOTPSend(false);
            }, 1400)
        }
    }

    return (
        <>
            <IoIosArrowRoundBack title="Back" className="absolute top-[6%] md:top-[12%] left-[3%] text-[clamp(3.4375rem,3.049rem+2.0718vw,4.375rem)] lg:text-[clamp(3.4375rem,2.7818rem+1.0246vw,4.0625rem)] text-[#FFD380] cursor-pointer" onClick={() => { window.history.back() }} />
            <div className="h-screen w-screen flex items-center justify-center">
                <form ref={reset} onSubmit={handleSubmit(onReset)} className="bg-white h-[35%] min-h-[230px] max-h-[300px] lg:h-[40%] w-[80%] max-w-[390px] sm:max-w-[450px] lg:w-[max(27%,50vh)] lg:max-w-[500px] rounded-md flex flex-col items-center justify-around">
                    <span className="">
                        <h1 className="font-bold text-[max(1.6rem,6.5vw)] min-[450px]:text-[max(1.7rem,4.5vw)] md:text-[max(2.2rem,3.5vw)] lg:text-[max(clamp(1.6875rem,0.3727rem+1.7418vw,2.75rem),4vh)]">Forgot Password</h1>
                        <h4 className="text-center text-[1rem] min-[450px]:text-[max(clamp(1.120rem,0.7710rem+1.2577vw,1.360rem),2vh)] lg:text-[max(clamp(1rem,0.1087rem+1.127vw,1.0875rem),2.5vh)]">Enter your email address</h4>
                    </span>
                    <span className="w-[80%] flex flex-col items-center">
                        <input className="w-full py-[3.8%] lg:py-[max(1.3vh,0.7vw)]  px-[0.5rem] text-[1rem] min-[450px]:text-[max(clamp(1.120rem,0.7710rem+1.2577vw,1.360rem),2vh)] lg:text-[max(clamp(0.8rem,0.1087rem+1.127vw,1.0875rem),2.5vh)] bg-gray-300 rounded-md mb-4 border-none outline-none" type="email" autoFocus placeholder="Enter email address" {...register("ResetEmail", {
                            required: true,
                            pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                        })}></input>
                        {errors.ResetEmail && errors.ResetEmail.type === "required" && (
                            notifyOnError("Email is required")

                        )
                        }
                        {errors.ResetEmail && errors.ResetEmail.type === "pattern" && (
                            notifyOnError("Email is not valid")
                        )
                        }
                        <button className="w-full py-[3.3%] lg:py-[max(1.3vh,0.7vw)] px-[0.5rem] text-[1rem] min-[450px]:text-[max(clamp(1.120rem,0.7710rem+1.2577vw,1.360rem),2vh)] lg:text-[max(clamp(0.8rem,0.1087rem+1.127vw,1.0875rem),2.5vh)] font-semibold text-white bg-[#573B8A] rounded-md mb-4 border-none outline-none cursor-pointer active:scale-[.8] active:transition-transform active:text-[#FFD380] active:duration-[400ms] active:ease-out" type="submit">Continue</button>
                    </span>
                </form>
            </div>
            <ToastContainer />
        </>
    )
}
