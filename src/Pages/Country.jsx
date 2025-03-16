
import { useEffect, useRef, useState } from "react"
import { getData } from "../UI/GetCountryData"
import { CountryOuterLoader } from "../UI/ShimmerLoading"
import { useTransition } from "react"
import { ConvertNumber } from "../UI/ConvertNumber"
import { NavLink } from "react-router"
import { useCustomContext } from "../UI/Context"
import { CountryPagination } from "../UI/CountryPagination"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
export const Country = () => {
    const { SearchInputData, FilterData, AscDesc } = useCustomContext(); //get the search input data from context
    const [ispending, startTransition] = useTransition();
    const [CountryData, setCountryData] = useState([]) //store country data
    const [FindData, setFindData] = useState([])
    const [SortData, setSortData] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12; //How many items to display per page
    const startIndex = (currentPage - 1) * itemsPerPage;   // find the first country data item in current page
    const endIndex = startIndex + itemsPerPage;  // find the last country data item in current page
    const ref = useRef()
    useEffect(() => {
        startTransition(async () => {
            const res = await getData("/all"); //call the getData method to get all the data from api
            setCountryData(res.data) //store the api data
        })
    }, [])

    useEffect(() => { //This hook runs when the state changes
        //If the filter is selected all or filter is empty then search the data according to the search input
        if (FilterData === "all") {
            setFindData(SortData)
        }
        else {
            //if the filter is selected then search the data according to the filter
            setFindData(SortData.filter((filter) => ((filter.region).toLowerCase()).includes(FilterData)))
        }

    }, [FilterData, SortData]);

    useEffect(() => {
        if (AscDesc) {
            //Store the sort country data
            setSortData([...CountryData].sort((a, b) => {
                return (
                    (AscDesc === "Ascending") ? a.name.common.localeCompare(b.name.common) :
                        b.name.common.localeCompare(a.name.common))
            })
            );
        }
        else {
            setSortData(CountryData)
        }
    }, [AscDesc, CountryData])



    //Search the data according to the search input and which filter is selected
    const SearchData = FindData.filter((search) => ((search.name.common).toLowerCase()).includes(SearchInputData))
    //Find the total pages for showing the pagination
    const totalPages = Math.ceil(SearchData.length / itemsPerPage);
    //Showing the Coutries in current page
    const currentItems = SearchData.slice(startIndex, endIndex);

    gsap.registerPlugin(useGSAP, ScrollTrigger);

    useGSAP(() => {
        let tl = gsap.timeline();
        setTimeout(() => {
            let Data = ref.current.childNodes

            Object.keys(Data).forEach((idx) => {
                if (idx != Data.length - 1) {
                    gsap.set(ref.current.children[idx], {
                        scale: 0,
                    })
                    tl.to(ref.current.children[idx], {
                        scale: 1,
                        ease: "circ.inOut",
                        duration: 1.3,
                        scrollBehavior: "smooth",
                        stagger: 0.4,
                        scrollTrigger: {
                            trigger: ref.current.children[idx],
                            start: "center 95%",
                            end: "center 95%",
                            scrub: 1,
                            markers: true
                        }
                    })
                }
            }
            )
        }, 1100)
    }, {})



    if (ispending) {                 //If the data is pending then loading component will show a loading
        return (
            <CountryOuterLoader />  //call the loading component to show the loading
        )
    }


    return (
        <section ref={ref} className={` w-screen grid grid-cols-auto sm:grid-cols-2 lg:grid-cols-3 grid-rows-1 place-items-center gap-y-[7rem]   ${SearchData.length === 0 ? "h-[50vh]" : "h-auto"} `}>
            {

                currentItems.map((item, idx) => {
                    return (
                        <div className="h-auto w-fit lg:w-[max(19rem,25vw)] lg:max-w-[550px] outline-2 outline-[#343435c1] rounded-[0.3rem] inset-shadow-[7px_7px_10px_-5px_#282829] shadow-[10px_10px_15px_-5px_#282829]" key={idx}>
                            <div className="h-fit w-fit relative">
                                <img loading="lazy" className="w-[max(17rem,70vw)] min-[450px]:w-[max(18rem,52vw)] min-[450px]:max-w-[310px] md:w-[max(19rem,38vw)] md:max-w-[350px] lg:w-[max(19rem,25vw)] lg:max-w-[550px] h-fit object-cover rounded-tl-[0.3rem] rounded-tr-[0.3rem] aspect-[2.5/1.5]" src={item.flags.svg} alt={item.name.common} />
                            </div>
                            <div className="h-fit w-full px-[1rem]  pb-[1.7rem] text-[#ffa600] pt-[1rem] ">
                                <div className="pb-[0.8rem] text-[max(1.6rem,6.5vw)]  min-[450px]:text-[max(1.7rem,4.5vw)] md:text-[max(2.2rem,3.5vw)] lg:text-[max(clamp(1.0875rem,0.5727rem+1.4418vw,2.45rem),3.5vh)] font-[600]">{item.name.common.length > 13 ? item.name.common.slice(0, 13) + "..." : item.name.common}</div>
                                <div className="h-auto w-auto flex flex-col gap-[0.2rem] text-[1.2rem] min-[450px]:text-[max(clamp(1.120rem,0.7710rem+1.1577vw,1.360rem),2vh)] lg:text-[max(clamp(1rem,0.2787rem+1.027vw,1.6875rem),2.7vh)] ">
                                    <div className=" text-[#FFD380]">Population: <span className="text-[#FFD380]">{<ConvertNumber num={item.population} />}</span></div>
                                    <div className=" text-[#FFD380]">Region: <span className="text-[#FFD380]">{item.region}</span></div>
                                    <div className=" text-[#FFD380]">Capital: <span className="text-[#FFD380]">{item.capital}</span></div>
                                </div>
                                <NavLink to={`/country/${item.name.common}`} className="flex w-fit mx-auto mt-[1.3rem]">
                                    <button type="button" className="text-[0.8rem] min-[450px]:text-[max(clamp(0.9375rem,0.5837rem+1.2579vw,1.1875rem),1.7vh)] lg:text-[max(clamp(0.8125rem,0.2223rem+0.9221vw,1.375rem),2.2vh)] font-[600] mx-auto outline-1 outline-[#FFD380] text-[#ffa600] px-[1.5rem] py-[0.3rem] rounded-4xl cursor-pointer">Read More</button>
                                </NavLink>
                            </div>
                        </div>
                    )
                })
            }
            {SearchData.length === 0 && <h3 className="absolute top-[50%] text-[max(1.6rem,6.5vw)]  min-[450px]:text-[max(1.7rem,4.5vw)] md:text-[max(2.2rem,3.5vw)] lg:text-[max(clamp(1.5625rem,0.71rem+1.132vw,2.375rem),3.5vh)] font-bold mx-auto text-[#FFD380] ">No result found</h3>}
            {SearchData.length != 0 && <div className=" text-amber-400 absolute bottom-[-1rem] left-[50%] translate-x-[-50%] py-[4rem]">
                <CountryPagination totalPages={totalPages} setCurrentPage={setCurrentPage} />
            </div>}
        </section >
    )
}
