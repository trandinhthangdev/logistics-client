import React, {useContext, useEffect} from "react";
import {AppContext} from "../contexts/AppContext";
import {Link, useLocation, useRoutes} from "react-router-dom";
import LogoIcon from "../assets/logo.png";
import {FaPlus, FaShippingFast, FaUserCircle} from "react-icons/fa";
import {Dropdown} from "antd";
import {BiLogIn} from "react-icons/bi";

import { useNavigate } from "react-router-dom";
import ChangeLanguage from "./ChangeLanguage";

const AppAdminLayout = ({children}) => {
    const { user, onLogout ,isAdmin } = useContext(AppContext);
    const navigate = useNavigate();
    const location = useLocation()
    useEffect(() => {
        if (user && !user?.email) {
            navigate("/")
        }
    }, [user]);

    useEffect(() => {
        if (isAdmin && location.pathname === '/admin/login') {
            navigate("/admin")
        }
    }, [isAdmin]);
    const menuItems = [
        {
            key: '1',
            label: (
                <div onClick={() => {
                    onLogout()
                    navigate(("/"))
                }}>
                    Logout
                </div>
            ),
        },
    ]
    return (
        <div className="flex flex-col">
            <div className="h-[80px] flex items-center justify-between px-2 shadow-md fixed top-0 left-0 right-0 z-10 bg-white">
                <Link to={"/admin"}>
                    <img className="h-[60px]" src={LogoIcon}/>
                </Link>
                <div className="flex items-center justify-end">
                    <ChangeLanguage />
                    {
                        user
                            ?
                            <Dropdown menu={{
                                items: menuItems
                            }}>
                                <div className="flex items-center cursor-pointer">
                                    <div className="mr-2">
                                        {user?.email}
                                    </div>
                                    <FaUserCircle className="text-2xl"/>
                                </div>
                            </Dropdown>
                            :
                            <Link
                                to={"/admin/login"}
                                className="flex items-center py-2 px-4 hover:bg-blue-400 hover:text-white rounded-md cursor-pointer"
                            >
                                <div className="mr-2">Login</div>
                                <BiLogIn />
                            </Link>
                    }
                </div>

            </div>
            <div className="p-4 mt-[80px]">
                {children}
            </div>
        </div>
    )
}

export default AppAdminLayout;
