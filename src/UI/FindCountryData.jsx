
import { useEffect, useRef, useState } from "react";
import { UserContext } from "./Context";
import { FaFilter } from "react-icons/fa6";
import { AiOutlineSortAscending } from "react-icons/ai";
import { AiOutlineSortDescending } from "react-icons/ai";
// eslint-disable-next-line react/prop-types
export const FindCountryData = ({ children }) => {
    const [SearchInputData, setSearchInputData] = useState("");
    const [FilterData, setFilterData] = useState("all")
    const [AscDesc, setAscDesc] = useState("")
    const ref1 = useRef(); //To get the reference of the parent od the asc and desc

    let handleSearchInput = (e) => {
        setSearchInputData(e.target.value.toLowerCase());
    }
    useEffect(() => {
        if (localStorage.getItem("FilterData") === null) {
            setFilterData("all")
        }
        else {
            setFilterData(localStorage.getItem("FilterData"))
        }
        let sortData = localStorage.getItem("SortData");
        setAscDesc(sortData);
        if (localStorage.getItem("SortData") == "Ascending") {
            ref1.current.children[0].style.backgroundColor = "#27272A"
            ref1.current.children[1].style.backgroundColor = "transparent"
        }
        else {
            ref1.current.children[1].style.backgroundColor = "#27272A"
            ref1.current.children[0].style.backgroundColor = "transparent"
        }

    }, [AscDesc])

    let handleFilterData = (filter) => {
        localStorage.setItem("FilterData", filter)
        setFilterData(filter)
    }
    let handleSortAscending = () => {
        localStorage.setItem("SortData", "Ascending")
        setAscDesc("Ascending")

    }
    let handleSortDescending = () => {
        localStorage.setItem("SortData", "Descending")
        setAscDesc("Descending")

    }


    return (
        <>
            <div className="w-screen h-auto flex flex-col justify-between gap-y-[7rem] items-center py-[9rem]  relative">
                <span className="h-fit w-screen flex flex-wrap flex-col sm:flex-row items-center justify-around gap-y-[3rem] sm:gap-x-[1.2rem]">
                    <div className="w-fit h-fit relative">
                        <input
                            className="input rounded-full w-[max(17rem,75vw)] min-[450px]:h-[max(6.3vh,8.8vw)] max-w-[400px] sm:max-w-none sm:w-auto lg:h-[max(3.8vw,7.8vh)] lg:max-h-[88px] lg:w-[max(24vw,42vh)] px-8 py-[0.5rem] border-2 border-[#2E2E2F] text-[1rem] min-[450px]:text-[max(clamp(1.120rem,0.7710rem+1.2577vw,1.360rem),2vh)] lg:text-[max(clamp(0.8rem,0.1087rem+1.127vw,1.0875rem),2.5vh)]  focus:outline-none focus:border-[#FFD380] placeholder-gray-400 transition-all duration-300 shadow-md text-white h-[3rem] sm:h-[max(3.3rem,5.4vh)]"
                            placeholder="Search..."
                            required=""
                            type="text"
                            onChange={handleSearchInput}
                            value={SearchInputData}
                            autoComplete="on"
                            autoCorrect="on"
                        />
                        <button type="reset" className="absolute right-3 -translate-y-1/2 top-1/2 p-1 cursor-pointer " onClick={() => setSearchInputData("")}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-[max(1.4rem,4.2vw)] sm:w-[max(1.8rem,3.1vw)] lg:w-[max(2vw,3.4vh)] h-auto text-[#FFD380]"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                ></path>
                            </svg>
                        </button>
                    </div>
                    <span ref={ref1} className="h-fit w-fit flex gap-x-[4rem] items-center justify-between  text-[#FFD380]  text-[max(1.6rem,6.5vw)]  min-[450px]:text-[max(1.7rem,4.5vw)] md:text-[max(2.2rem,3.5vw)] lg:text-[max(clamp(1.0875rem,0.5727rem+1.4418vw,2.45rem),3.5vh)]">
                        <AiOutlineSortAscending className=" outline-2 outline-[#27272A] w-[max(19vw,8vh)] h-[max(8vw,3.8vh)] min-[450px]:w-[max(5.6rem,16.2vw)] min-[450px]:h-[max(2.5rem,4.3vh)] sm:w-[max(11vw,8vh)] sm:max-w-[95px] sm:max-h-[47px] sm:h-[max(5.7vw,2.8vh)] lg:h-[max(2.6vw,3.9vh)]  lg:w-[max(6.1vw,9.7vh)] rounded-4xl active:outline-amber-200 active:scale-[0.8] active:transition-transform active:duration-[300ms] " title="Ascending order" onClick={handleSortAscending} />
                        <AiOutlineSortDescending className=" outline-2 outline-[#27272A] w-[max(19vw,8vh)] h-[max(8vw,3.8vh)] min-[450px]:w-[max(5.6rem,16.2vw)] min-[450px]:h-[max(2.5rem,4.3vh)] sm:w-[max(11vw,8vh)] sm:max-w-[95px] sm:max-h-[47px] sm:h-[max(5.7vw,2.8vh)] lg:h-[max(2.6vw,3.9vh)] lg:w-[max(6.1vw,9.7vh)]  rounded-4xl  active:outline-amber-200 active:scale-[0.8] active:transition-transform active:duration-[300ms]" title="Descending order" onClick={handleSortDescending} />
                    </span>



                    <span className=" text-white h-fit w-fit flex items-center justify-between gap-x-[1.2rem] ">
                        <label htmlFor="region">
                            <FaFilter className="text-[1.2rem] min-[450px]:text-[max(5vw,2vh)] sm:text-[max(4vw,2.7vh)] md:text-[max(3vw,2.5vh)] lg:text-[max(clamp(0.8rem,0.1087rem+1.427vw,1.0875rem),2.7vh)] text-[#FFD380]" />
                        </label>
                        <select id="region" value={(FilterData.slice(0, 1).toUpperCase()) + (FilterData.slice(1, FilterData.length))} className="w-[max(33vw,15vh)] h-[max(8.5vw,3.8vh)] max-w-[180px] lg:w-[max(13vw,18vh)] lg:h-[max(3.2vw,5vh)] lg:max-h-[70px] lg:max-w-[250px] max-h-[42px] text-[1.2rem] min-[450px]:text-[max(clamp(1.120rem,0.7710rem+1.2577vw,1.360rem),2vh)] lg:text-[max(clamp(0.8rem,0.1087rem+1.127vw,1.0875rem),2.5vh)] text-white bg-black outline-[#2E2E2F] outline-2 rounded-4xl focus:outline-[#FFD380] px-[1rem] py-[.2rem]" onChange={(e) => handleFilterData(e.target.value.toLowerCase())} name="region">
                            <option className="" value="All">All</option>
                            <option className="" value="Asia">Asia</option>
                            <option className="" value="Africa">Africa</option>
                            <option className="" value="Americas">Americas</option>
                            <option className="" value="Europe">Europe</option>
                            <option className="" value="Oceania">Oceania</option>
                        </select>

                    </span>
                </span>
                <UserContext.Provider value={{ SearchInputData, FilterData, AscDesc }}>{children}</UserContext.Provider>
            </div>
        </>
    )
}

