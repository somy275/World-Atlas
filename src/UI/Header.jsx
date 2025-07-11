/* eslint-disable react/prop-types */
import { NavLink } from "react-router";
import { CiMenuFries } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import { useLenis } from "lenis/react";
import { memo, useEffect, useState } from "react";
import { Profile } from "./Profile";
import { LoginSignup } from "./LoginSignup";
const Header = ({ data, navValue }) => {
  const [Nav, setNav] = useState();
  const [Registered, setRegistered] = useState(false);
  const [UserExist, setUserExist] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("UserExists") == "true") { //if the user exists then set the user exist state to true
      setUserExist(true);
    } else if (localStorage.getItem("UserExists") == "false") { //if the user not exists then set the user exist state to false
      setUserExist(false);
    }
    if (localStorage.getItem("Registered") == "true") { //if the user is already registered then set the registered state to true
      setRegistered(true);
    } else if (localStorage.getItem("Registered") == "false") { //if the user is not registered then set the registered state to false
      setRegistered(false);
    }
  }, []);
  let handleUserExists = () => { //when the user clicks on the login button then this function is executed
    localStorage.setItem("UserExists", !UserExist);
    setUserExist(!UserExist);
  };

  useLenis((e) => { //for smooth scrolling
    // called every scroll
    let { direction } = e;
    setNav(direction); //set the direction of the scroll
  });

  const navbarAnimation =
    "absolute left-0 right-0 transition-transform w-auto h-fit duration-[1.2s] text-center ease-in-out delay-100 lg:relative lg:text-[max(clamp(1.0625rem,0.0789rem+1.5369vw,2rem),2.6vh)]  before:absolute before:bottom-0 before:border-b-[1.6px] before:border-solid before:w-full before:border-[#ff6361] before:scale-x-[0] before:origin-right before:transition-transform before:duration-[400ms] before:ease-linear hover:before:origin-left hover:before:scale-x-[1]";
  const navbar =
    "relative h-[max(7vw,5vh)] min-[450px]:h-[max(6vw,4.5vh)] md:h-[max(4vw,4.5vh)] min-h-[30px] inline-block overflow-hidden w-full  lg:w-auto lg:h-auto";
  return (
    <>
      <header
        className={`fixed bg-[#003F5C] text-[white] w-screen h-[min(13vw,7.5vh)] min-h-[48px] min-[h-[max(10vw,7.3vh)]] md:h-[max(4.2rem,7.3vh)] lg:h-[max(4rem,8.1vh)]  z-[100] font-[serif] flex justify-between items-center px-[2rem] transition-transform duration-[350ms] ${Nav === 1 ? "translate-y-[-100%]" : "translate-y-[0%]"
          }`}
      >
        <NavLink
          to="/"
          className=" font-bold  text-[max(1.6rem,6.5vw)] min-[450px]:text-[max(1.7rem,4.5vw)] md:text-[max(2.2rem,3.5vw)] lg:text-[max(clamp(1.6875rem,0.5727rem+1.7418vw,2.75rem),4vh)] text-[#FFD380] drop-shadow-[-2px_-2px_1px_#000]"
        >
          WorldAtlas
        </NavLink>
        <span
          className="relative z-[1] cursor-pointer lg:hidden text-[clamp(1.4375rem,1.1267rem+1.6575vw,2.1875rem)]"
          onClick={data}
        >
          {navValue ? <CiMenuFries /> : <IoClose />}
        </span>

        <nav
          className={`lg:relative  lg:bg-transparent lg:w-auto lg:flex lg:h-auto text-[max(clamp(1.375rem,1.0144rem+1.9231vw,1.9375rem),3.7vh)] lg:text-[19px] absolute bg-[#003f5cb6] backdrop-blur-4xl top-[100%] lg:top-0  right-0 h-screen justify-center transition-[width] duration-[650ms]  ease-in-out ${navValue ? "w-0 delay-600" : "flex w-[100%]"
            }`}
        >
          <span
            onClick={window.innerWidth < 1024 && data}
            className="lg:flex-row lg:justify-around lg:w-[max(40vw,55vh)] w-full   flex gap-[max(1.2rem,3.5vh)] items-center  lg:items-center flex-col pt-[5rem] lg:pt-0"
          >
            <span className={navbar}>
              <NavLink
                to="/"
                className={`${navbarAnimation} ${navValue ? "translate-y-[100%]" : " translate-y-[0%]"
                  } `}
                style={({ isActive }) => {
                  return { color: isActive ? "#ffd380" : "" };
                }}
              >
                Home
              </NavLink>
            </span>
            <span className={navbar}>
              <NavLink
                to="/about"
                className={` ${navbarAnimation} ${navValue ? "translate-y-[100%]" : " translate-y-[0%]"
                  }`}
                style={({ isActive }) => {
                  return { color: isActive ? "#ffd380" : "" };
                }}
              >
                About
              </NavLink>
            </span>
            <span className={navbar}>
                <NavLink
                  to={"/country"}
                  className={`${navbarAnimation} ${navValue ? "translate-y-[100%]" : " translate-y-[0%]"
                    }`}
                  style={({ isActive }) => {
                    return { color: isActive ? "#ffd380" : "" };
                  }}
                >
                  Country 
              </NavLink>
            </span>
            <span className={navbar}>
              <NavLink
                to="/contact"
                className={`${navbarAnimation} ${navValue ? "translate-y-[100%]" : " translate-y-[0%]"
                  }`}
                style={({ isActive }) => {
                  return { color: isActive ? "#ffd380" : "" };
                }}
              >
                Contact
              </NavLink>
            </span>
            {Registered ? (
              <span className="relative h-[max(7vw,5vh)] min-[450px]:h-[max(6vw,5.7vh)] md:h-[max(4.7vw,4vh)] min-h-[30px] overflow-hidden w-full  lg:w-auto lg:h-fit">
                {" "}
                <Profile
                  navbarAnimation={navbarAnimation}
                  navValue={navValue}
                  setRegistered={setRegistered}
                />
              </span>
            ) : (
              <span
                className={`inline-block overflow-hidden w-full  lg:w-auto lg:h-auto drop-shadow-[-1px_-1px_7px_#000] h-[max(10vw,6vh)] min-[450px]:h-[max(5vw,6vh)] md:h-[max(6vw,6vh)]  `}
              >
                <span
                  className={`bg-[#FFD380] flex mx-auto justify-center  h-[max(10vw,6vh)] min-[450px]:h-[max(6vw,6vh)] md:h-[max(6vw,6vh)] min-h-[30px] w-[max(6rem,16vh)] min-[450px]:w-[max(22vw,18vh)] min-[450px]:max-w-[190px] md:w-[max(18vw,16vh)] md:max-w-none lg:w-auto lg:h-auto lg:px-[0.6rem] cursor-pointer rounded-full  text-[#003F5C] font-semibold  active:scale-[0.8] active:text-[#CC6A27] active:transition-transform active:duration-[350ms] active:ease-out  lg:translate-y-0 absolute left-0 right-0 transition-transform duration-[1.2s] lg:transition-none text-center ease-in-out  lg:relative lg:text-[max(clamp(1.0625rem,0.0789rem+1.5369vw,2rem),2.6vh)] delay-0 ${navValue ? "translate-y-[100%] " : " translate-y-[0%]"
                    }`}
                  onClick={handleUserExists}
                >
                  Sign in
                </span>
              </span>
            )}
          </span>
        </nav>
      </header>
      {UserExist ? (
        <LoginSignup
          setUserExist={setUserExist}
          setRegistered={setRegistered}
        />
      ) : (
        ""
      )}
    </>
  );
};
export default memo(Header);