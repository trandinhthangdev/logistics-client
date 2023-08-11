import React from "react";
import {useParams} from "react-router-dom";
import InfoOrder from "./InfoOrder";
import TrackingTimeline from "./TrackingTimeline";
const AdminTrackingOrder = (props) => {
    const { orderNumber } = useParams();
    return (
        <div className="flex flex-col">
            <InfoOrder orderNumber={orderNumber} />
            <TrackingTimeline orderNumber={orderNumber}/>
        </div>
    )
}

export default AdminTrackingOrder;
