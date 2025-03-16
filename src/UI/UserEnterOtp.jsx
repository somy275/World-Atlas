/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { InputOtp } from "@heroui/input-otp";
import { useForm } from "react-hook-form";
import { notifyOnError, notifyOnSuccess } from "../Pages/NotifyOnForm";
import { ToastContainer } from "react-toastify";
import { OtpGenerator } from "./GenerateOtp";
import { useEffect, useRef, useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
export const UserEnterOtp = ({ setOTP, setUserOTP, setOTPSend }) => {
    const [value, setvalue] = useState()
    const [Timer, setTimer] = useState(59)
    const { register, handleSubmit, formState: { errors } } = useForm()
    const form = useRef()
    let onSubmit = (e) => {
        setUserOTP(e.otp);
    }
    let handleResendOtp = () => {
        notifyOnSuccess("OTP has been resend successfully")
        setOTP(OtpGenerator())
        form.current.reset();
        setUserOTP()
        setTimer(59)
    }
    useEffect(() => {
        if (Timer > 0) {
            const TimerEnd = setInterval(() => {
                setTimer(prevSeconds => prevSeconds - 1)
            }, 1000);
            return () => clearInterval(TimerEnd)
        }
        else {
            setOTP()
        }
    }, [Timer])
    return (
        <>
            <IoIosArrowRoundBack title="Back" className="absolute z-10 top-[6%] md:top-[12%] left-[3%] text-[clamp(3.4375rem,3.049rem+2.0718vw,4.375rem)] lg:text-[clamp(3.4375rem,2.7818rem+1.0246vw,4.0625rem)] text-[#FFD380] cursor-pointer" onClick={() => setOTPSend(false)} />
            <div className="relative h-screen w-screen  flex items-center justify-center text-white ">
                <form ref={form} onSubmit={handleSubmit(onSubmit)} className="bg-[#003f5cc7] mt-[3.5rem] h-[50%] w-[80%] min-h-[350px] max-h-[400px] min-[450px]:max-h-[500px] min-[450px]:max-w-[430px] min-[450px]:min-h-[400px] lg:h-[67%] lg:w-[max(28%,50vh)] lg:min-h-[380px] lg:max-h-[600px] lg:max-w-[550px] rounded-md flex flex-col justify-between py-[3rem]  items-center ">
                    <span className="text-center ">
                        <h2 className="text-[max(1.6rem,6.5vw)]  min-[450px]:text-[max(1.7rem,4.5vw)] md:text-[max(2.2rem,3.5vw)] lg:text-[max(clamp(1.5625rem,0.71rem+1.332vw,2.375rem),3.5vh)] font-bold">OTP Verfication</h2>
                        <p className="px-[1.5rem] mt-[0.4rem] text-[1rem] min-[450px]:text-[max(clamp(1.120rem,0.7710rem+1.2577vw,1.360rem),2vh)] lg:text-[max(clamp(1rem,0.1087rem+1.127vw,1.0875rem),2.5vh)]">Enter OTP code sent to <span className="text-[#ffd380]"> {localStorage.getItem("UserEmail")} </span></p>
                    </span>
                    <InputOtp value={value} name="otp" classNames={{ segment: "bg-[white] text-black  data-[active=true]:bg-[#c8d0dc] items-center" }} className="items-center" color="primary" length={4} onValueChange={setvalue} {...register("otp", { required: true })} />
                    {
                        Timer < 0 && errors.otp && errors.otp.type === "required" && (
                            notifyOnError("OTP is required")
                        )
                    }
                    <span className="text-center text-[1rem] min-[450px]:text-[max(clamp(1.120rem,0.7710rem+1.2577vw,1.360rem),2vh)] lg:text-[max(clamp(1rem,0.1087rem+1.127vw,1.0875rem),2.5vh)]">
                        <h5 className="">Didn&apos;t receive OTP code</h5>
                        {
                            Timer > 0 ? <h5 className="text-[#ffd380] text-[1rem] min-[450px]:text-[max(clamp(1.120rem,0.7710rem+1.2577vw,1.360rem),2vh)] lg:text-[max(clamp(1rem,0.1087rem+1.127vw,1.0875rem),2.5vh)]">{`0:${Timer < 10 ? "0" + Timer : Timer}`}</h5> : <h5 className="text-[#ffd380] cursor-pointer active:text-orange-500 text-[1rem] min-[450px]:text-[max(clamp(1.120rem,0.7710rem+1.2577vw,1.360rem),2vh)] lg:text-[max(clamp(1rem,0.1087rem+1.127vw,1.0875rem),2.5vh)]" onClick={handleResendOtp}>Resend OTP</h5>
                        }

                    </span>
                    <button type="submit" className="bg-[#ffd380] w-[80%] h-[2.2rem] lg:h-[max(2.2rem,4.5vh)] font-bold rounded-md text-[1rem] min-[450px]:text-[max(clamp(1.120rem,0.7710rem+1.2577vw,1.360rem),2vh)] lg:text-[max(clamp(1rem,0.1087rem+1.127vw,1.0875rem),2.5vh)] text-black active:scale-[.8] active:transition-transform active:text-[#003f5c] active:duration-[400ms] active:ease-out cursor-pointer">Verify & Proceed</button>
                </form>
            </div>
            <ToastContainer />
        </>
    )
}
