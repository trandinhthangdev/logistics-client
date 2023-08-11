import React from "react";
import ClientList from "./ClientList";
import StatisBox from "./StatisBox";
import OrderList from "./OrderList";
const AdminHome = (props) => {
    return (
        <div className="flex w-full">
            <div className="pr-2 border-r border-r-gray-300">
                <ClientList />
            </div>
            <div className="flex-1 h-[calc(100vh-150px)] pl-2">
                <StatisBox />
                <OrderList />
            </div>
        </div>
    );
};

export default AdminHome;
