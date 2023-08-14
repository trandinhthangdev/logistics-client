import React, { useState } from "react";
import { useParams } from "react-router-dom";
import InfoOrder from "./InfoOrder";
import TrackingTimeline from "./TrackingTimeline";
const AdminTrackingOrder = (props) => {
    const { orderNumber } = useParams();
    const [order, setOrder] = useState(null);
    return (
        <div className="flex flex-col">
            <InfoOrder
                orderNumber={orderNumber}
                onGetOrder={(data) => {
                    setOrder(data);
                }}
            />
            <TrackingTimeline orderNumber={orderNumber} order={order} />
        </div>
    );
};

export default AdminTrackingOrder;
