import {renderStatusLabel, showAddressByKey} from "../utils/functions";
import OrderNumber from "./OrderNumber";
import moment from "moment/moment";
import {Spin} from "antd";
import {useTranslation} from "react-i18next";
import ReviewAndComment from "./ReviewAndComment";
import ChangeStatus from "./ChangeStatus";

const OrderInfoBlock = (props) => {
    const { t } = useTranslation();
    const {data, onSuccess} = props;
    if (!data) {
        return (
            <div className="p-4 rounded-md flex flex-col items-center">
                <Spin />
            </div>
        );
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
    return (
        <div className="flex flex-col items-center">
            <OrderNumber orderNumber={data.orderNumber} />
            <div className="py-2">
                <ChangeStatus data={data} onSuccess={() => {
                    if (typeof onSuccess === 'function') {
                        onSuccess()
                    }
                }}/>
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
            <div className="py-2 flex flex-col items-center">
                <div className="font-bold">
                    {t("order.label.note")}
                </div>
                <div>
                    {data.note}
                </div>
            </div>
            <div className="py-2 flex flex-col items-center">
                <div className="font-bold">
                    {t("order.label.review_comment")}
                </div>
                <ReviewAndComment data={data} onSuccess={() => {
                    if (typeof onSuccess === 'function') {
                        onSuccess()
                    }
                }}/>
            </div>
        </div>
    );
}

export default OrderInfoBlock;
