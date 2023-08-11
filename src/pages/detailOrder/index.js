import React, { useEffect, useState } from "react";
import ShippingOrderStatus from "./ShippingOrderStatus";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FiCopy } from "react-icons/fi";
import moment from "moment";
import { renderStatusLabel, showAddressByKey } from "../../utils/functions";

const DetailOrder = (props) => {
    const { orderNumber } = useParams();
    const [data, setData] = useState(null);

    useEffect(() => {
        axios.get(`/api/orders/${orderNumber}`).then((res) => {
            setData(res.data);
        }).catch(err => {
            console.log('err',err)
        })
    }, []);
    if (!data) {
        return <></>;
    }

    const viewInfo = ({ label, value }) => {
        return (
            <div className="flex">
                <div className="font-bold mr-2">{label}:</div>
                <div className="italic">{value}</div>
            </div>
        );
    };
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
    // const province = JSON.parse(data.recipientAddressProvince)?.name ?? "";
    // const district = JSON.parse(data.recipientAddressDistrict)?.name ?? "";
    // const ward = JSON.parse(data.recipientAddressWard)?.name ?? "";
    return (
        <div className="flex flex-col p-2">
            <div className="p-4 shadow-xl rounded-md flex flex-col items-center">
                <div className="cursor-pointer flex items-center mb-2">
                    <div className="mr-1">{data.orderNumber}</div>
                    <FiCopy />
                </div>
                <div className="font-bold text-yellow-400">
                    {renderStatusLabel(data.status)}
                </div>
                <div className="grid grid-cols-2 max-md:grid-cols-1 w-full">
                    <div className="p-2">
                        <div className="font-bold text-lg ">Sender</div>
                        {viewInfo({
                            label: "Name",
                            value: data.senderName,
                        })}
                        {viewInfo({
                            label: "Phone",
                            value: data.senderName,
                        })}
                        {viewInfo({
                            label: "Address",
                            value: `${senderAddress?.province}, ${senderAddress?.district}, ${senderAddress?.ward} \n${data.senderAddressDescription}`,
                        })}
                    </div>
                    <div className="p-2">
                        <div className="font-bold text-lg ">recipient</div>
                        {viewInfo({
                            label: "Name",
                            value: data.recipientName,
                        })}
                        {viewInfo({
                            label: "Phone",
                            value: data.recipientPhone,
                        })}
                        {viewInfo({
                            label: "Address",
                            value: `${recipientAddress.province}, ${recipientAddress.district}, ${recipientAddress.ward} \n${data.recipientAddressDescription}`,
                        })}
                    </div>
                </div>
                <div className="grid grid-cols-2 max-md:grid-cols-1 w-full">
                    <div className="p-2">
                        {viewInfo({
                            label: "Shipping date",
                            value: moment().format("LLL"),
                        })}
                    </div>
                    <div className="p-2">
                        {viewInfo({
                            label: "expected Delivery Date",
                            value: moment().format("LLL"),
                        })}
                    </div>
                </div>
            </div>
            <ShippingOrderStatus />
        </div>
    );
};
export default DetailOrder;
