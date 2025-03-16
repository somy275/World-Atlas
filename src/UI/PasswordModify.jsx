import { useForm } from "react-hook-form";
import { useEffect, useState } from 'react'
import { ResetPassword } from './ResetPassword'
import { UserEnterOtp } from './UserEnterOtp'
import { notifyOnError, notifyOnSuccess } from '../Pages/NotifyOnForm'
import { ToastContainer } from "react-toastify";

export const PasswordModify = () => {
    const [OTPSend, setOTPSend] = useState(false)
    const [OTPSuccess, setOTPSuccess] = useState(false)
    const [OTP, setOTP] = useState()
    const [UserOTP, setUserOTP] = useState()
    const { register, handleSubmit, formState: { errors } } = useForm()
    useEffect(() => {
        if (OTP != undefined && UserOTP != undefined) { //This condition is not executed until the user not entered the OTP
            if (OTP != UserOTP) {  //If the otp is not math with the user otp notifyOnError is called
                notifyOnError("Please enter correct OTP")
            }
            else if (OTP == UserOTP) { //If the otp is  math with the user otp notifyOnSuccess is called
                notifyOnSuccess("OTP verification successful")
                setTimeout(() => {
                    setOTPSuccess(true); //If the otp is math with the user then setOTPSuccess state to true
                }, 1400)
            }
        }
        else if (OTP == undefined && UserOTP != undefined) {  //If the otp is empty and the user entered otp, then this condition is executed and called notifyOnError
            notifyOnError("Please enter correct OTP")
        }
    }, [OTP, UserOTP]);
    let onPasswordUpdate = (e) => {  //When the user update their password with new password, then this function is executed
        if (e.NewPswd != e.ConfirmPswd) { //If the User new password and confirm password is not match then notifyOnError is called 
            notifyOnError("Password does not match")
        }
        else {  //If the user new password and confirm password is match then this condition is executed
            notifyOnSuccess("Password updated successfully")
            localStorage.setItem("UserPassword", e.NewPswd)
            localStorage.setItem("UserExists", true)
            setTimeout(() => {
                // setOTPSuccess(false); // If the user update their password successfully then setOTPSuccess state to false and remove the update password page
                // setOTPSend(false);
                window.history.back();  //If the user update their password successfully then user is directed back to the previous page 
            }, 1400)
            setTimeout(() => {
                window.location.reload(); //When the user directed back to the previous page, then window reload
            }, 1500)
        }
        console.log(e);

    }
    return (
        <>
            {
                //If the OTPSuccess is true, then create new password page show
                OTPSuccess ? <div className="h-screen w-screen flex items-center justify-center ">
                    <form onSubmit={handleSubmit(onPasswordUpdate)} className="bg-white w-[80%] h-[43%] min-h-[500px] lg:h-[65%] min-[450px]:max-w-[500px] min-[450px]:h-[47%] lg:min-h-[400px] lg:max-h-[700px]  lg:w-[max(60vh,26vw)] lg:max-w-[750px] mt-[4rem] rounded-md flex flex-col items-center justify-around py-2.5">
                        <span className="text-center px-[1.5rem]">
                            <h1 className="font-bold text-[max(1.6rem,6.4vw)]  min-[450px]:text-[max(1.7rem,4.4vw)] md:text-[max(2.2rem,3.4vw)] lg:text-[max(clamp(1.0875rem,0.3727rem+1.4418vw,2.45rem),3.4vh)]">Change your Password</h1>
                            <h4 className="text-center text-[1rem] min-[450px]:text-[max(clamp(1.120rem,0.7710rem+1.2577vw,1.360rem),2vh)] lg:text-[max(clamp(0.8rem,0.1087rem+1.127vw,1.0875rem),2.5vh)] opacity-[.9] lg:px-[1rem]">Enter a new Password below to change your password</h4>
                        </span>
                        <span className="w-[80%] flex flex-col items-center">
                            <span className="w-full h-auto  flex flex-col gap-y-0.5">
                                <label htmlFor="new password" className="font-semibold  text-[1rem] min-[450px]:text-[max(clamp(1.120rem,0.7710rem+1.2577vw,1.360rem),2vh)] lg:text-[max(clamp(0.8rem,0.1087rem+1.127vw,1.0875rem),2.5vh)]">New password</label>
                                <input id="new password" name="NewPswd" className="w-full py-[3%] lg:py-[max(1.3vh,0.6vw)]  px-[0.5rem] text-[1rem] min-[450px]:text-[max(clamp(1.120rem,0.7710rem+1.2577vw,1.360rem),2vh)] lg:text-[max(clamp(0.8rem,0.1087rem+1.127vw,1.0875rem),2.5vh)]  bg-gray-300 rounded-md mb-4 border-none outline-none" type="password" autoFocus placeholder="New password" {...register("NewPswd", {
                                    required: true,
                                    pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@&!])[A-Za-z0-9@&!]{8,}$/,
                                    minLength: 8
                                })}></input>
                                {errors.NewPswd && errors.NewPswd.type === "required" && (
                                    notifyOnError("Password is required")

                                )
                                }
                                {errors.NewPswd && errors.NewPswd.type === "pattern" && (
                                    notifyOnError("Password must contain capital letters, small letters, numbers and special characters")
                                )
                                }
                                {
                                    errors.NewPswd && errors.NewPswd.type === "minlength" && (
                                        notifyOnError("Password must contain atleast 8 characters")
                                    )
                                }
                                <span className="w-full flex flex-col gap-y-0.5">
                                    <label className="font-semibold relative text-[1rem] min-[450px]:text-[max(clamp(1.120rem,0.7710rem+1.2577vw,1.360rem),2vh)] lg:text-[max(clamp(0.8rem,0.1087rem+1.127vw,1.0875rem),2.5vh)]">Confirm password</label>
                                    <input type="password" name="ConfirmPswd" className="w-full py-[3%] lg:py-[max(1.3vh,0.6vw)]  px-[0.5rem] text-[1rem] min-[450px]:text-[max(clamp(1.120rem,0.7710rem+1.2577vw,1.360rem),2vh)] lg:text-[max(clamp(0.8rem,0.1087rem+1.127vw,1.0875rem),2.5vh)] bg-gray-300 rounded-md mb-4 border-none outline-none" placeholder="Confirm your password" {...register("ConfirmPswd", { required: true })}></input>
                                    {errors.ConfirmPswd && errors.ConfirmPswd.type === "required" && (
                                        notifyOnError("Confirm Password is required")
                                    )
                                    }
                                </span>
                            </span>

                            <button className="w-full mt-[0.5rem] py-[3%] lg:py-[max(1.3vh,0.6vw)] px-[0.5rem] text-[1rem] min-[450px]:text-[max(clamp(1.120rem,0.7710rem+1.2577vw,1.360rem),2vh)] lg:text-[max(clamp(0.8rem,0.1087rem+1.127vw,1.0875rem),2.5vh)] font-semibold text-white bg-[#573B8A] rounded-md mb-4 border-none outline-none cursor-pointer active:scale-[.8] active:transition-transform active:text-[#FFD380] active:duration-[400ms] active:ease-out" type="submit">CHANGE PASSWORD</button>
                        </span>
                    </form>
                    <ToastContainer />
                </div>
                    //If the OTPSucceess is false, then this condition is executed immediately
                    //When the condition is executed, another condition is executed
                    : !OTPSend ? <ResetPassword setOTPSend={setOTPSend} setOTP={setOTP} /> : <UserEnterOtp setOTP={setOTP} setOTPSend={setOTPSend} setUserOTP={setUserOTP} />
            }

        </>
    )
}
