import { Pagination } from "@heroui/react";
/* eslint-disable react/prop-types */
export const CountryPagination = ({ totalPages, setCurrentPage }) => {
    let onPage = (e) => {
        setCurrentPage(e)
        console.log(e);
    }
    return (

        <>
            <Pagination classNames={{ wrapper: "flex items-center justify-around gap-3 ", item: ` rounded-full bg-[#27272A] data-[active=true]:bg-[#ff8531] hover:bg-[#3F3F46] text-white font-bold cursor-pointer ${window.innerWidth < 650 ? "h-[1.8rem] w-[1.8rem]" : " h-[2.4rem] w-[2.4rem]"}`, prev: "cursor-pointer active:scale-[0.85] active:transition-transform active:duration-[200ms] data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50", next: "cursor-pointer active:scale-[0.85] active:transition-transform active:duration-[200ms] data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 rotate-0", ellipsis: " cursor-pointer   data-[before=true]:rotate-180", base: "", cursor: "" }} showControls boundaries={window.innerWidth < 650 ? 1 : 3} initialPage={1} total={totalPages}
                onChange={onPage}
            />

        </>




    )
}
export const ChevronIcon = (props) => {
    return (
        <svg
            aria-hidden="true"
            fill="none"
            focusable="false"
            height="1em"
            role="presentation"
            viewBox="0 0 24 24"
            width="1em"
            {...props}
        >
            <path
                d="M15.5 19l-7-7 7-7"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
            />
        </svg>
    );
};