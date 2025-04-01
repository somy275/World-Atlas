import { useParams, useLocation } from "react-router"
import { PageError } from "./PageError";
import { useTransition, useEffect, useState } from 'react'
import { getData } from '../UI/GetCountryData';
import { ConvertNumber } from "../UI/ConvertNumber";
import DateAndTime from "../UI/DateAndTime";
import { IoIosArrowRoundBack } from "react-icons/io";
import { CountryInnerLoader } from "../UI/ShimmerLoading";
export const CountryDetails = () => {
    const location = useLocation();
    const params = useParams();//Get the search data which Country user is typed in search bar
    const [ispending, startTransition] = useTransition();//Check data is pending or not
    const [GetCountryDetails, setGetCountryDetails] = useState([]) //Store the api data
    const [DataComing, setDataComing] = useState(false) //To check the data is coming or not using UseState
    useEffect(() => { //This hook runs when the state changes
        setDataComing(false) //When the component mounts, set DataComing to false
        startTransition(async () => {
            const res = await getData(`/name/${params.id}`);//Get the Particular Country Details
            setGetCountryDetails(Array(res.data[0]));//Store the country details after converting into array
        })
    }, [params.id])
    if (location.key == "default") return <PageError /> //When the user search the country which is not found then show the PageError component

    return (
        <section className=" h-auto w-screen relative bg-[#101011ea]">
            <div className={`pt-[5rem] lg:pt-[8rem] ${ispending || DataComing == false ? "flex" : "hidden"}`}>
                <CountryInnerLoader />
            </div>
            {GetCountryDetails.map((data, idx) => {
                return (
                    <div className={`h-auto w-full flex-col md:flex-row items-center justify-between px-[2rem] lg:px-[3rem]  outline-2  pt-[11rem] md:pt-[4rem] ${ispending || DataComing == false ? "hidden" : "flex"}`} key={idx}>
                        <span className="w-full md:w-[40%] h-auto gap-10 flex flex-col items-center  ">
                            <img className="w-[max(17rem,70vw)] min-[450px]:w-[max(18rem,52vw)] min-[450px]:max-w-[280px] md:w-[max(19rem,38vw)] md:max-w-[350px] lg:w-[max(19rem,25vw)] lg:max-w-[550px] h-fit object-cover rounded-[0.3rem] aspect-[2.5/1.5]" src={data.flags.svg} alt={data.flags.alt}></img>
                            <h4 className="text-[#FFD380] text-center  text-[max(1.6rem,6.5vw)]  min-[450px]:text-[max(1.7rem,4.5vw)] md:text-[max(2.2rem,3.5vw)] lg:text-[max(clamp(1.5625rem,0.71rem+1.332vw,2.375rem),3.5vh)] font-bold">{data.name.official}</h4>
                        </span>
                        <span className="flex flex-col  justify-around gap-y-5 w-auto md:w-[40%] h-auto  text-[#FFD380] text-[1.3rem] min-[450px]:text-[max(clamp(1.4375rem,0.9953rem+1.5723vw,1.75rem),2.2vh)] lg:text-[max(clamp(1.125rem,0.3381rem+1.2295vw,1.875rem),2.7vh)] my-[6rem]">
                            <span className="w-fit  font-bold">Capital: <span className=" font-medium text-white">{data.capital[0]}</span>
                            </span>
                            <span className="w-fit  font-bold">Native names: <span className=" font-medium text-white">{String(Object.keys(data.name.nativeName).map((a) => {
                                return " " + data.name.nativeName[a].common
                            }))}</span>
                            </span>
                            <span className="w-fit  font-bold">Population: <span className="font-medium text-white">{<ConvertNumber num={data.population} />}</span></span>
                            <span className="w-fit font-bold ">Region: <span className="font-medium text-white">{data.region}</span></span>
                            <span className="w-fit font-bold ">Continent: <span className="font-medium text-white">{data.continents}</span></span>
                            {data.subregion && <span className="w-fit font-bold ">Sub Region: <span className="font-medium text-white">{data.subregion}</span></span>}
                            <span className="w-fit font-bold ">Languages: <span className="font-medium text-white">{
                                String(Object.keys(data.languages).map((a) => {
                                    return " " + data.languages[a]
                                }))
                            }</span></span>
                            <span className="w-fit  font-bold ">Currency: <span className=" font-medium text-white">{Object.keys(data.currencies).map((a) => {
                                return data.currencies[a].name
                            })}</span></span>
                            <span className="w-fit  font-bold">Currency Symbol: <span className=" font-medium text-white">{Object.keys(data.currencies).map((a) => {
                                return data.currencies[a].symbol
                            })}</span></span>
                            <span className="w-fit font-bold ">Area: <span className="font-medium text-white">{<ConvertNumber num={data.area} />} km<sup>2</sup></span></span>
                            {data.borders ? <span className="w-fit font-bold ">Borders: <span className="font-medium text-white">{
                                String(Object.keys(data.borders).map((a) => {
                                    return " " + data.borders[a]
                                }))
                            }</span></span>
                                : ""}
                            <span className="w-fit font-bold ">Date and Time: <span className="font-medium text-white">{
                                <DateAndTime setDataComing={setDataComing} date={Number(data.timezones[0].substring(5, 6))} />
                            }</span></span>
                            <span className="w-fit font-bold ">Map: <a href={data.maps.googleMaps} target="_blank" className="font-medium text-white visited:text-[#CC6A27] active:text-[blue]">{data.name.official}</a></span>
                        </span>
                    </div>
                )

            }
            )
            }
            <IoIosArrowRoundBack title="Back" className="absolute top-[6%] md:top-[10%] left-[3%] text-[clamp(3.4375rem,3.049rem+2.0718vw,4.375rem)] lg:text-[clamp(3.4375rem,2.7818rem+1.0246vw,4.0625rem)] text-[#FFD380] cursor-pointer" onClick={() => { window.history.back() }} />
        </section>
    )
}
