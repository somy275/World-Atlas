/* eslint-disable react/prop-types */
import { useForm } from 'react-hook-form';
import { notifyOnError, notifyOnSuccess } from '../Pages/NotifyOnForm';
import { ToastContainer } from 'react-toastify';
import { useEffect, useRef, useState } from 'react';
import { Login } from './Login';
import { UserContext } from './Context';
import { IoMdClose } from "react-icons/io";
export const LoginSignup = ({ children, setRegistered, setUserExist }) => {
    const [Profile, setProfile] = useState("signin")
    const { register, handleSubmit, formState } = useForm();
    const [UserLogin, setUserLogin] = useState(false)
    const { errors } = formState;
    const signForm = useRef()
    let onSignin = (e) => { //when the user signin then this function is executed
        if (localStorage.getItem("UserEmail") == e.email) { //if the user is already exists then notify to user, you are already exist
            notifyOnError("User already exists")
        }
        else { //if the user is'nt exist already then user successfully signin and notify to user, You have successfully registered
            notifyOnSuccess("You have successfully registered")
            localStorage.setItem("UserEmail", e.email)
            localStorage.setItem("UserName", e.username)
            localStorage.setItem("UserPassword", e.pswd)
            signForm.current.reset();
            setTimeout(() => {
                alert("Please login to continue")
            }, 2500);
        }
    }

    useEffect(() => {
        if (UserLogin == null) {
            setUserExist(false)
            localStorage.setItem("UserExists", false);
        }
        else if (UserLogin) { //when the user login successfuly the signin & login page closes and shown the user profile
            setTimeout(() => {
                localStorage.setItem("UserExists", false);
                localStorage.setItem("Registered", true);
                setUserExist(false);
                setRegistered(true);
            }, 2000);
        }
    }, [UserLogin, setRegistered, setUserExist]);
    let handleSignin = () => { //when the user clicks the close button this function is excuted
        setUserExist(false) //Close the signin & login page
        localStorage.setItem("UserExists", false);
    }
    return (
        <>
            <UserContext.Provider value={"ok"}>{children}</UserContext.Provider>
            <span className='fixed top-[9%] md:top-[12%] lg:top-[15%] left-[3%] z-[21]' onClick={handleSignin}>
                <IoMdClose className='text-[max(2.5rem,10vw)] min-[450px]:text-[max(2.5rem,7vw)] md:text-[max(3rem,5vw)] lg:text-[max(clamp(1.6875rem,0.8727rem+1.8418vw,2.75rem),4vh)] text-[#FFD380] cursor-pointer' />
            </span>
            <section className={`fixed   z-20 flex backdrop-blur-md h-screen w-screen  justify-center items-center py-[20rem] `}>


                <div className="relative w-[90%] max-w-[450px] min-[45px]:min-h-[450px] min-[450px]:h-[max(62vh,65vw)] min-[450px]:max-h-[500px] lg:max-w-none lg:w-[max(27%,45vh)] lg:h-[max(30vw,55vh)] lg:max-h-none lg:min-h-[400px] rounded-lg shadow-2xl overflow-hidden bg-[#003f5cbe]">

                    <input type="checkbox" id="chk" className="hidden" />

                    {/* <!-- Signup Form --> */}

                    <form ref={signForm} onSubmit={handleSubmit(onSignin)} className="signup space-y-4 h-auto w-full flex flex-col items-center justify-between gap-y-[1.2rem] py-[2rem]">
                        <label htmlFor="chk" className="text-[max(1.6rem,6.5vw)] min-[450px]:text-[max(1.7rem,4.5vw)] md:text-[max(2.2rem,3.5vw)] lg:text-[max(clamp(1.6875rem,0.5727rem+1.7418vw,2.75rem),4vh)] text-white font-bold cursor-pointer transition-transform duration-500" onClick={() => Profile == "signin" ? setProfile("login") : setProfile("signin")}>Sign up</label>
                        <div className="text-[1.3rem] pb-[3rem] min-[450px]:pb-[3.5rem] lg:pb-[1rem] min-[450px]:text-[max(clamp(1.120rem,0.7710rem+1.2577vw,1.360rem),2vh)] lg:text-[max(clamp(1rem,0.2787rem+1.027vw,1.2875rem),2.5vh)] h-auto w-full flex flex-col items-center justify-evenly gap-y-[max(1rem,2vh)] #92E3A9">
                            <input type="text" name="username" placeholder="Enter your name" autoFocus {...register("username")} className="w-[80%] py-[0.5rem] lg:px-[max(0.5rem,0.8vh)] px-[0.5rem] text-[1rem] min-[450px]:text-[max(clamp(1.120rem,0.7710rem+1.2577vw,1.360rem),2vh)] lg:text-[max(clamp(0.8rem,0.1087rem+1.127vw,1.0875rem),2.5vh)]  bg-gray-300 rounded-md  border-none outline-none" />
                            <input type="email" name="email" placeholder="Enter your email" className="w-[80%] py-[0.5rem] lg:py-[max(0.5rem,0.8vh)] text-[1rem] min-[450px]:text-[max(clamp(1.120rem,0.7710rem+1.2577vw,1.360rem),2vh)] lg:text-[max(clamp(0.8rem,0.1087rem+1.127vw,1.0875rem),2.5vh)] px-[0.5rem]  bg-gray-300 rounded-md  border-none outline-none"  {...register("email", {
                                required: true,
                                pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                            })} />
                            {Profile == "signin" && errors.email && errors.email.type === "required" && (
                                notifyOnError("Email is required")

                            )
                            }
                            {Profile == "signin" && errors.email && errors.email.type === "pattern" && (
                                notifyOnError("Email is not valid")

                            )
                            }
                            <input type="password" name="pswd" placeholder="Password" className="w-[80%] py-[0.5rem] lg:py-[max(0.5rem,0.8vh)] px-[0.5rem] text-[1rem] min-[450px]:text-[max(clamp(1.120rem,0.7710rem+1.2577vw,1.360rem),2vh)] lg:text-[max(clamp(0.8rem,0.1087rem+1.127vw,1.0875rem),2.5vh)] bg-gray-300 rounded-md  border-none outline-none" {...register("pswd", {
                                required: true,
                                minLength: 8,
                                pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@&!])[A-Za-z0-9@&!]{8,}$/,
                            })} />
                            {
                                Profile == "signin" && errors.pswd && errors.pswd.type === "required" && (
                                    notifyOnError("Password is required")
                                )
                            }
                            {
                                Profile == "signin" && errors.pswd && errors.pswd.type === "minLength" && (
                                    notifyOnError("Password must be at least 8 characters long")
                                )
                            }
                            {Profile == "signin" && errors.pswd && errors.pswd.type === "pattern" && (
                                notifyOnError("Password must contain capital letter, small letters, numbers, and special characters")
                            )
                            }

                            <button type="submit" className=" py-[0.5rem] lg:py-[max(0.5rem,0.8vh)] w-[50%] mt-2 bg-[#573b8a] text-white font-bold rounded-md transition-all duration-200 hover:bg-[#6d44b8]">Sign in</button>
                        </div>
                    </form>
                    <Login setUserLogin={setUserLogin} Profile={Profile} setProfile={setProfile} />
                    {/* <!-- Login Form --> */}
                </div>
            </section>
            <ToastContainer />

        </>
    )
}
