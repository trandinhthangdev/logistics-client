export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const OrderStatusEnum = Object.freeze({
    PENDING: "PENDING",
    SHIPPED: "SHIPPED",
    DELIVERED: "DELIVERED",
    CANCELLED: "CANCELLED",
});

export const ADDRESS_VN = require("./../backoffice/addressvn.json");

export const labelByStatus = {
    [OrderStatusEnum.PENDING]: "Pending",
    [OrderStatusEnum.SHIPPED]: "Shipped",
    [OrderStatusEnum.DELIVERED]: "Delivered",
    [OrderStatusEnum.CANCELLED]: "Cancelled"
}
export const STATUSES = [
    {
        value: OrderStatusEnum.PENDING,
        label: labelByStatus[OrderStatusEnum.PENDING],
    },
    {
        value: OrderStatusEnum.SHIPPED,
        label: labelByStatus[OrderStatusEnum.SHIPPED],
    },
    {
        value: OrderStatusEnum.DELIVERED,
        label: labelByStatus[OrderStatusEnum.DELIVERED],
    },
    {
        value: OrderStatusEnum.CANCELLED,
        label: labelByStatus[OrderStatusEnum.CANCELLED],
    },
];

export const POST_OFFICE = require('./../backoffice/postoffice.json')

export const POST_OFFICE_LIST = Object.keys(POST_OFFICE).map(code => POST_OFFICE[code])

export const colorByStatus = {
    [OrderStatusEnum.PENDING]: 'bg-yellow-300',
    [OrderStatusEnum.SHIPPED]: "bg-green-300",
    [OrderStatusEnum.DELIVERED]: "bg-blue-300",
    [OrderStatusEnum.CANCELLED]: "bg-red-300"
}
