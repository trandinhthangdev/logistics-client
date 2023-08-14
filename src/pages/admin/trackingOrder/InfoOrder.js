import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { renderStatusLabel, showAddressByKey } from "../../../utils/functions";
import moment from "moment";
import { FiCopy } from "react-icons/fi";
import OrderNumber from "../../../components/OrderNumber";
import { Spin } from "antd";
import { useTranslation } from "react-i18next";

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
    const viewInfo = ({ label, value }) => {
        return (
            <div className="flex">
                <div className="font-bold mr-2">{label}:</div>
                <div className="italic">{value}</div>
            </div>
        );
    };
    if (!data) {
        return (
            <div className="p-4 rounded-md flex flex-col items-center">
                <Spin />
            </div>
        );
    }
    const senderAddress = showAddressByKey({
        province: data.senderAddressProvince,
        district: data.senderAddressDistrict,
        ward: data.senderAddressWard,
    });
    const recipientAddress = showAddressByKey({
        province: data.recipientAddressProvince,
        district: data.recipientAddressDistrict,
        ward: data.recipientAddressWard,
    });
    return (
        <div className="p-4 shadow-xl rounded-md flex flex-col items-center">
            <OrderNumber orderNumber={data.orderNumber} />
            <div className="font-bold text-yellow-400">
                {renderStatusLabel(data.status)}
            </div>
            <div className="grid grid-cols-2 max-md:grid-cols-1 w-full">
                <div className="p-2">
                    <div className="font-bold text-lg ">
                        {t("order.label.sender")}
                    </div>
                    {viewInfo({
                        label: t("label.name"),
                        value: data.senderName,
                    })}
                    {viewInfo({
                        label: t("label.phone"),
                        value: data.senderName,
                    })}
                    {viewInfo({
                        label: t("label.address"),
                        value: `${senderAddress?.province}, ${senderAddress?.district}, ${senderAddress?.ward} \n${data.senderAddressDescription}`,
                    })}
                </div>
                <div className="p-2">
                    <div className="font-bold text-lg ">
                        {t("order.label.recipient")}
                    </div>
                    {viewInfo({
                        label: t("label.name"),
                        value: data.recipientName,
                    })}
                    {viewInfo({
                        label: t("label.phone"),
                        value: data.recipientPhone,
                    })}
                    {viewInfo({
                        label: t("label.address"),
                        value: `${recipientAddress.province}, ${recipientAddress.district}, ${recipientAddress.ward} \n${data.recipientAddressDescription}`,
                    })}
                </div>
            </div>
            <div className="grid grid-cols-2 max-md:grid-cols-1 w-full">
                <div className="p-2">
                    {viewInfo({
                        label: t("label.shippingDate"),
                        value: data.shippingDate
                            ? moment(data.shippingDate).format("LLL")
                            : "",
                    })}
                </div>
                <div className="p-2">
                    {viewInfo({
                        label: t("label.expectedDeliveryDate"),
                        value: data.createdAt
                            ? moment(data.createdAt).add(5, "days").format("LL")
                            : "",
                    })}
                </div>
            </div>
        </div>
    );
};
export default InfoOrder;
