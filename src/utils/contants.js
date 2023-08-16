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

export const LANGUAGE_EN = 'en';
export const LANGUAGE_VI = 'vi';

export const SUPPORTED_LOCALES = [LANGUAGE_EN, LANGUAGE_VI]
export const LOCAL_LANGUAGE = process.env.REACT_APP_LANGUAGE_LOCAL_STORAGE
export const LOCAL_USER_INFO = process.env.REACT_APP_USER_INFO_LOCAL_STORAGE
