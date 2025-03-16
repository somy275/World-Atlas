/* eslint-disable react/prop-types */
import { Pagination } from "@heroui/react";
export const CountryPagination = ({ totalPages, setCurrentPage }) => {
    let onPage = (e) => {
        setCurrentPage(e)
        console.log(e);
    }

    return (
        <Pagination size={window.innerWidth<600?"sm":"lg"} classNames={{ item: " bg-[#27272A] font-bold  text-white rounded-full cursor-pointer", cursor: "bg-[#ff8531] rounded-full text-white font-bold" }} showControls boundaries={window.innerWidth < 600 ? 1 : 3} color="secondary" initialPage={1} total={totalPages}
            onChange={onPage}
        />
    )
}
