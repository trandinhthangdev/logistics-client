import React from "react";
import ClientList from "./ClientList";
import StatisBox from "./StatisBox";
import OrderList from "./OrderList";
const AdminHome = (props) => {
    return (
        <div className="flex">
            <div>
                <ClientList />
            </div>
            <div className="flex-1 h-[calc(100vh-120px)]">
                <StatisBox />
                <OrderList />
            </div>
        </div>
    );
};

export default AdminHome;
