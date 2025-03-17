/* eslint-disable react/prop-types */
import { FaUserCircle } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, DropdownSection, User } from "@heroui/react";

export const Profile = ({ setRegistered, navbarAnimation, navValue }) => {
    let handleRegistered = () => {
        localStorage.removeItem("LoginUserEmail");
        localStorage.removeItem("LoginUserPassword");
        localStorage.setItem("Registered", false);
        setRegistered(false)
    }
    return (
        <Dropdown
            radius="sm" backdrop="blur" >
            <DropdownTrigger className="cursor-pointer ">
                <Button className="w-full h-full lg:flex" disableRipple variant="ghost">
                    <FaUserCircle className={`mx-auto text-[max(8vw,4vh)] max-w-[3rem!important] lg:mx-0 md:text-[max(4.8vw,4vh)] lg:text-[max(clamp(1.6875rem,0.7727rem+1.4418vw,2.75rem),3.8vh)] ${navbarAnimation} ${navValue ? "translate-y-[100%] lg:translate-y-[0]" : " translate-y-[0%]"}`} />
                </Button>
            </DropdownTrigger >
            <DropdownMenu disabledKeys={["profile"]} className="bg-[#18181B] " aria-label="Static Actions">
                <DropdownSection className="border-b-2 border-b-[#2a2a2bf0]" showDivider aria-label="Profile & Actions">
                    <DropdownItem className="hover:bg-[#2a2a2bf0] rounded-md" key="profile">
                        <User
                            className="profile"
                            avatarProps={{
                                size: "sm",
                                className: "h-[2rem] w-[2rem] "
                            }}
                            classNames={{
                                name: "text-default-600",
                                description: "text-default-500",
                            }}
                            description={localStorage.getItem("UserEmail")}
                            name={localStorage.getItem("UserName")} />

                    </DropdownItem>
                </DropdownSection>
                {/* <DropdownItem className="hover:bg-[#2a2a2bf0] rounded-md" key="signup">
                    <NavLink className="" to="/loginSignup">Signup</NavLink>
                </DropdownItem> */}
                <DropdownItem className="logout hover:bg-red-500 text-red-500 hover:text-white rounded-md flex  items-center" key="logout" color="danger" onPress={handleRegistered} startContent={<IoIosLogOut />} >
                    Log out

                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    )
}
