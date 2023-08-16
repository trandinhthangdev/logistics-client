import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import InfoOrder from "./InfoOrder";
import TrackingTimeline from "./TrackingTimeline";
import axios from "axios";
import OrderNotfound from "../../../assets/order_404.png";
import OrderInfoBlock from "../../../components/OrderInfoBlock";
const AdminTrackingOrder = (props) => {
    const { orderNumber } = useParams();
    const [data, setData] = useState(undefined);
    useEffect(() => {
        getData()
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
    }
    if (data === null) {
        return (
            <div className="p-8 rounded-md flex flex-col items-center">
                <img className="w-[120px]" src={OrderNotfound}/>
                <span className="text-gray-400 text-2xl">Order not found</span>
            </div>
        )
    }
    return (
        <div className="flex flex-col">
            <div className="p-4 shadow-xl rounded-md flex flex-col items-center">
                <OrderInfoBlock data={data} onSuccess={() => {
                    getData()
                }}/>
            </div>
            <TrackingTimeline orderNumber={orderNumber} order={data} />
        </div>
    );
};

export default AdminTrackingOrder;
