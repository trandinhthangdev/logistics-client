import React, { useContext, useEffect } from "react";
import LogoIcon from "./../assets/logo.png";
import { Link } from "react-router-dom";
import { BiLogIn } from "react-icons/bi";
import { AppContext } from "../contexts/AppContext";
import { FaUserCircle, FaShippingFast, FaPlus } from "react-icons/fa";
import { Dropdown } from "antd";
import { BsFillChatTextFill } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import LiveChat from "../pages/liveChat";
const AppLayout = ({ children }) => {
    const { user, userInfo, loadingUser, openChatBox, setOpenChatBox } =
        useContext(AppContext);
    const menuItems = [
        {
            key: "1",
            label: <Link to={"/profile"}>Profile</Link>,
        },
        {
            key: "2",
            label: (
                <div
                    onClick={() => {
                        console.log("logout");
                    }}
                >
                    Logout
                </div>
            ),
        },
    ];
    return (
        <div className="flex flex-col">
            <div className="h-[80px] flex items-center justify-between px-2 shadow-md fixed top-0 left-0 right-0 z-10 bg-white">
                <Link to={"/"}>
                    <img className="h-[60px]" src={LogoIcon} />
                </Link>
                <div className="flex items-center">
                    <Link to={"/new-order"}>
                        <div className="mr-4 flex items-center bg-amber-600 text-white px-2 py-2 rounded-md">
                            <FaPlus />
                            <div className="mx-1">Create Order</div>
                            <FaShippingFast className="text-2xl" />
                        </div>
                    </Link>
                    {user ? (
                        <Dropdown
                            menu={{
                                items: menuItems,
                            }}
                        >
                            <div className="flex items-center">
                                <div className="mr-2">
                                    <div>{user.phoneNumber}</div>
                                    {userInfo && <div>{userInfo.name}</div>}
                                </div>
                                <FaUserCircle className="text-2xl" />
                            </div>
                        </Dropdown>
                    ) : (
                        <Link
                            to={"/login"}
                            className="text-3xl py-2 px-4 hover:bg-blue-400 hover:text-white rounded-md cursor-pointer"
                        >
                            <div className="mr-2">Login</div>
                            <BiLogIn />
                        </Link>
                    )}
                </div>
            </div>
            <div className="p-4 mt-[80px]">{children}</div>
            {openChatBox && <LiveChat onClose={() => setOpenChatBox(false)} />}
            <div
                onClick={() => {
                    setOpenChatBox((prev) => !prev);
                }}
                className="fixed bottom-2 right-2 cursor-pointer bg-blue-400 text-white p-2 rounded-full text-3xl hover:bg-blue-600"
            >
                {openChatBox ? <IoMdClose /> : <BsFillChatTextFill />}
            </div>
        </div>
    );
};

export default AppLayout;
