import { useForm } from 'react-hook-form';
import { notifyOnError, notifyOnSuccess } from '../Pages/NotifyOnForm';
import { useRef } from 'react';
import { NavLink } from 'react-router';
// eslint-disable-next-line react/prop-types
export const Login = ({ Profile, setProfile, setUserLogin }) => {
    const { register, handleSubmit, formState } = useForm();
    const { errors } = formState;
    const loginForm = useRef()
    let onLogin = (e) => {
        if (localStorage.getItem("UserEmail") != e.loginemail) {
            notifyOnError("User does not exist")
        }
        else if (localStorage.getItem("UserPassword") != e.loginpswd) {
            notifyOnError("Please enter correct password")
        }
        else {
            loginForm.current.reset();
            notifyOnSuccess("You are Login successfully")
            localStorage.setItem("LoginUserEmail", e.loginemail)
            localStorage.setItem("LoginUserPassword", e.loginpswd)
            setUserLogin(true)
        }
    }
    return (
        <div className="login absolute inset-0 bg-gray-100 rounded-t-[6rem]  transform translate-y-[87%] min-[450px]:translate-y-[85%] lg:translate-y-[87%] transition-transform duration-800 ">
            <form ref={loginForm} onSubmit={handleSubmit(onLogin)} className="h-auto w-full flex flex-col items-center justify-between gap-y-[2rem] ">
                <label htmlFor="chk" className="text-[max(1.6rem,6.5vw)] min-[450px]:text-[max(1.7rem,4.5vw)] md:text-[max(2.2rem,3.5vw)] lg:text-[max(clamp(1.6875rem,0.5727rem+1.7418vw,2.75rem),4vh)] font-bold transform scale-75 transition-transform duration-500 text-[#573b8a] py-[0.4rem] cursor-pointer" onClick={() => Profile == "login" ? setProfile("signin") : setProfile("login")}>Login</label>
                <div className="text-[1.3rem] min-[450px]:text-[max(clamp(1.120rem,0.7710rem+1.2577vw,1.360rem),2vh)] lg:text-[max(clamp(1rem,0.2787rem+1.027vw,1.2875rem),2.5vh)] h-auto w-full flex flex-col items-center justify-around gap-y-[1rem] ">
                    <input type="email" name="loginemail" placeholder="Email" {...register("loginemail", {
                        required: true,
                        pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                    })} className="w-[80%] py-[0.5rem]  px-[0.5rem]  bg-gray-300 rounded-md mb-4 border-none outline-none" />
                    {Profile === "login" && errors.loginemail && errors.loginemail.type === "required" && (
                        notifyOnError("Email is required")

                    )
                    }
                    {Profile === "login" && errors.loginemail && errors.loginemail.type === "pattern" && (
                        notifyOnError("Email is not valid")
                    )
                    }
                    <input type="password" name="loginpswd" placeholder="Password" {...register("loginpswd", {
                        required: true,
                        minLength: 8,
                        pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@&!])[A-Za-z0-9@&!]{8,}$/,
                    })} className="w-[80%] py-[0.5rem]  px-[0.5rem]  bg-gray-300 rounded-md mb-4 border-none outline-none" />
                    {
                        Profile === "login" && errors.loginpswd && errors.loginpswd.type === "required" && (
                            notifyOnError("Password is required")
                        )
                    }
                    {
                        Profile === "login" && errors.loginpswd && errors.loginpswd.type === "minLength" && (
                            notifyOnError("Password must be at least 8 characters long")
                        )
                    }
                    {Profile === "login" && errors.loginpswd && errors.loginpswd.type === "pattern" && (
                        notifyOnError("Password must contain capital letter, small letters, numbers, and special characters")
                    )
                    }
                    <span className='w-[80%] h-fit relative'>
                        <NavLink to="/PasswordModify" className='absolute cursor-pointer bottom-[36%] right-0 active:text-[#6d44b8]' onClick={() => setUserLogin(null)}>Forgot password?
                        </NavLink>
                    </span>
                    <button type="submit" className="py-[0.5rem] w-[50%] mt-2 bg-[#573b8a] text-white font-bold rounded-md transition-all duration-200 hover:bg-[#6d44b8]">Login</button>
                </div>
            </form>
        </div>

    )
}
