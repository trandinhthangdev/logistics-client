import { ADDRESS_VN, OrderStatusEnum } from "./contants";

export const renderStatusLabel = (statusCode) => {
    switch (statusCode) {
        case OrderStatusEnum.PENDING:
            return "pending";
        case OrderStatusEnum.SHIPPED:
            return "shipped";
        case OrderStatusEnum.DELIVERED:
            return "delivered";
        case OrderStatusEnum.CANCELLED:
            return "cancelled";
        default:
            return "";
    }
};

export const showAddressByKey = ({ province, district, ward }) => {
    try {
        return {
            province: ADDRESS_VN[province].name,
            district: ADDRESS_VN[province].district[district].name,
            ward: ADDRESS_VN[province].district[district].wards[ward],
        };
    } catch (e) {
        return {
            province: "",
            district: "",
            ward: "",
        };
    }
};
