import React, { useEffect, useState } from "react";
import FormOrder from "../../components/FormOrder";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Spin } from "antd";
import OrderNotfound from "./../../assets/order_404.png";

const EditOrder = (props) => {
    const { orderNumber } = useParams();
    const [data, setData] = useState(undefined);
    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        axios
            .get(`/api/orders/${orderNumber}`)
            .then((res) => {
                setData(res.data);
            })
            .catch((err) => {
                setData(null);
            });
    };
    if (data === undefined) {
        return (
            <div className="flex items-center justify-center p-8">
                <Spin />
            </div>
        );
    }
    if (data === null) {
        return (
            <div className="p-8 rounded-md flex flex-col items-center">
                <img className="w-[120px]" src={OrderNotfound} />
                <span className="text-gray-400 text-2xl">Order not found</span>
            </div>
        );
    }
    return (
        <div>
            <FormOrder init={data} />
        </div>
    );
};
export default EditOrder;
