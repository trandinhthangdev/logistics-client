export const API_BASE_URL = "http://localhost:5000";

export const OrderStatusEnum = Object.freeze({
    PENDING: "PENDING",
    SHIPPED: "SHIPPED",
    DELIVERED: "DELIVERED",
    CANCELLED: "CANCELLED",
});

export const ADDRESS_VN = require("./../backoffice/addressvn.json");
export const STATUSES = [
    {
        value: OrderStatusEnum.PENDING,
        label: "pending",
    },
    {
        value: OrderStatusEnum.SHIPPED,
        label: "shipped",
    },
    {
        value: OrderStatusEnum.DELIVERED,
        label: "delivered",
    },
    {
        value: OrderStatusEnum.CANCELLED,
        label: "cancelled",
    },
];
