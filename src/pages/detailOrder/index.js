import React, { useEffect, useState } from "react";
import ShippingOrderStatus from "./ShippingOrderStatus";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FiCopy } from "react-icons/fi";
import moment from "moment";
import { renderStatusLabel, showAddressByKey } from "../../utils/functions";
import InfoOrder from "../admin/trackingOrder/InfoOrder";
import TrackingTimeline from "../admin/trackingOrder/TrackingTimeline";

const DetailOrder = (props) => {
    const { orderNumber } = useParams();
    return (
        <div className="flex flex-col">
            <InfoOrder orderNumber={orderNumber} />
            <TrackingTimeline orderNumber={orderNumber}/>
        </div>
    )
};
export default DetailOrder;
