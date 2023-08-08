import {OrderStatusEnum} from "./contants";

export const renderStatusLabel = (statusCode) => {
    switch (statusCode) {
        case OrderStatusEnum.PENDING:
            return (
                'pending'
            )
        case OrderStatusEnum.SHIPPED:
            return (
                'shipped'
            )
        case OrderStatusEnum.DELIVERED:
            return (
                'delivered'
            )
        case OrderStatusEnum.CANCELLED:
            return (
                'cancelled'
            )
        default:
            return ''
    }
}
