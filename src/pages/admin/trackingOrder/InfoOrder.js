import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { renderStatusLabel, showAddressByKey } from "../../../utils/functions";
import moment from "moment";
import { FiCopy } from "react-icons/fi";
import OrderNumber from "../../../components/OrderNumber";
import { Spin } from "antd";
import { useTranslation } from "react-i18next";
import OrderInfoBlock from "../../../components/OrderInfoBlock";

const InfoOrder = (props) => {
    const { t } = useTranslation();
    const { orderNumber, onGetOrder } = props;
    const [data, setData] = useState(null);

    useEffect(() => {
        axios
            .get(`/api/orders/${orderNumber}`)
            .then((res) => {
                setData(res.data);
                onGetOrder(res.data);
            })
            .catch((err) => {
                console.log("err", err);
            });
    }, []);

    if (!data) {
        return (
            <div className="p-4 rounded-md flex flex-col items-center">
                <Spin />
            </div>
        );
    }
    return (
        <div className="p-4 shadow-xl rounded-md flex flex-col items-center">
            <OrderInfoBlock data={data}/>
        </div>
    )
};
export default InfoOrder;
