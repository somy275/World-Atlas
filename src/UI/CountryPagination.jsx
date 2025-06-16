import { Pagination } from "@heroui/react";
/* eslint-disable react/prop-types */
const CountryPagination = ({ totalPages, setCurrentPage }) => {
    let onPage = (e) => { // when the user clicks on the page number then this function is executed
        setCurrentPage(e) // set the current page number
    }
    return (

        <>
            <Pagination classNames={{ wrapper: "flex items-center justify-around gap-2 ", item: ` rounded-full bg-[#27272A] data-[active=true]:bg-[#ff8531] hover:bg-[#3F3F46] text-white font-bold cursor-pointer h-[1.8rem] w-[1.8rem] sm:h-[2.6rem] sm:w-[2.6rem]`, prev: "cursor-pointer active:scale-[0.85] active:transition-transform active:duration-[200ms] data-[disabled=true]:pointer-events-none  data-[disabled=true]:opacity-50", next: "cursor-pointer active:scale-[0.85] active:transition-transform active:duration-[200ms] data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 rotate next", ellipsis: "ellipse cursor-pointer   data-[before=true]:rotate-180", base: "", cursor: "" }} showControls boundaries={window.innerWidth < 650 ? 1 : 3} initialPage={1} total={totalPages}
                onChange={onPage}
            />

        </>




    )
}
export default CountryPagination
