import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FiCopy } from "react-icons/fi";
import moment from "moment";
import { renderStatusLabel, showAddressByKey } from "../../utils/functions";
import InfoOrder from "../admin/trackingOrder/InfoOrder";
import TrackingTimeline from "../admin/trackingOrder/TrackingTimeline";

const DetailOrder = (props) => {
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
export default DetailOrder;
