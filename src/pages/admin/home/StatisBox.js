import React, {useEffect, useState} from "react";
import axios from "axios";
import {BsFillPersonFill} from "react-icons/bs"
import {FaTruck} from "react-icons/fa"
import {colorByStatus, labelByStatus, OrderStatusEnum} from "../../../utils/contants";
const StatisBox = (props) => {
    const [data, setData] = useState(null)

    useEffect(() => {
        axios.get('/api/app/statis')
            .then(res => {
                console.log(res.data)
                setData(res.data)
            })
            .catch(err => {
                console.log('err',err)
            })
    }, []);
    if (!data) {
        return <div className="min-h-[100px]"></div>
    }
    return <div className="flex p-2">
        <div className="m-1 flex items-center justify-center rounded-2xl p-4 bg-gray-400 text-white shadow-xl">
            <div className="font-bold text-2xl mr-2">{data.client}</div>
            <div className="text-md mx-1">
                Client
            </div>
            <BsFillPersonFill className="text-4xl" />
        </div>
        <div className={`m-1 flex items-center justify-center rounded-2xl p-4 text-gray-600 shadow-xl ${colorByStatus[OrderStatusEnum.PENDING]}`}>
            <div className="font-bold text-2xl mr-2">{data.order[OrderStatusEnum.PENDING]}</div>
            <div className="text-md mx-1">
                {labelByStatus[OrderStatusEnum.PENDING]}
            </div>
            <FaTruck className="text-4xl"/>
        </div>
        <div className={`m-1 flex items-center justify-center rounded-2xl p-4 text-gray-600 shadow-xl ${colorByStatus[OrderStatusEnum.DELIVERED]}`}>
            <div className="font-bold text-2xl mr-2">{data.order[OrderStatusEnum.DELIVERED]}</div>
            <div className="text-md mx-1">
                {labelByStatus[OrderStatusEnum.DELIVERED]}
            </div>
            <FaTruck className="text-4xl"/>
        </div>
        <div className={`m-1 flex items-center justify-center rounded-2xl p-4 text-gray-600 shadow-xl ${colorByStatus[OrderStatusEnum.SHIPPED]}`}>
            <div className="font-bold text-2xl mr-2">{data.order[OrderStatusEnum.SHIPPED]}</div>
            <div className="text-md mx-1">
                {labelByStatus[OrderStatusEnum.SHIPPED]}
            </div>
            <FaTruck className="text-4xl"/>
        </div>
        <div className={`m-1 flex items-center justify-center rounded-2xl p-4 text-gray-600 shadow-xl ${colorByStatus[OrderStatusEnum.CANCELLED]}`}>
            <div className="font-bold text-2xl mr-2">{data.order[OrderStatusEnum.CANCELLED]}</div>
            <div className="text-md mx-1">
                {labelByStatus[OrderStatusEnum.CANCELLED]}
            </div>
            <FaTruck className="text-4xl"/>
        </div>
    </div>;
};

export default StatisBox;
