import React, {useState} from "react";
import {useParams} from "react-router-dom";
import InfoOrder from "./InfoOrder";
import TrackingTimeline from "./TrackingTimeline";
const AdminTrackingOrder = (props) => {
    const { orderNumber } = useParams();
    const [orderStatus, setOrderStatus] = useState(null)
    return (
        <div className="flex flex-col">
            <InfoOrder orderNumber={orderNumber} onGetOrderStatus={status => {
                setOrderStatus(status)
            }} />
            <TrackingTimeline orderNumber={orderNumber} status={orderStatus}/>
        </div>
    )
}

export default AdminTrackingOrder;
