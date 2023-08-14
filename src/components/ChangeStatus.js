import { Dropdown } from "antd";
import axios from "axios";
import {colorByStatus, labelByStatus, OrderStatusEnum, STATUSES} from "../utils/contants";
import OrderNumber from "./OrderNumber";
import {useContext} from "react";
import {AppContext} from "../contexts/AppContext";

const ChangeStatus = (props) => {
    const { data, onSuccess } = props;
    const { isAdmin } = useContext(AppContext);

    const onChangeStatus = (status) => {
        axios
            .post(`/api/orders/change-status/${data.orderNumber}`, { status })
            .then((res) => {
                onSuccess()
            });
    };

    let listStatuses = [];
    switch (data.status) {
        case OrderStatusEnum.PENDING:
            listStatuses = [
                {
                    value: OrderStatusEnum.SHIPPED,
                    label: labelByStatus[OrderStatusEnum.SHIPPED],
                },
                {
                    value: OrderStatusEnum.CANCELLED,
                    label: labelByStatus[OrderStatusEnum.CANCELLED],
                },
            ]
            break;
        case OrderStatusEnum.SHIPPED:
            listStatuses = [
                {
                    value: OrderStatusEnum.DELIVERED,
                    label: labelByStatus[OrderStatusEnum.DELIVERED],
                },
                {
                    value: OrderStatusEnum.CANCELLED,
                    label: labelByStatus[OrderStatusEnum.CANCELLED],
                },
            ]
            break;
        default:
            listStatuses = []
            break;
    }
    if (listStatuses.length === 0 || !isAdmin) {
        return (
            <div className={`text-center text-gray-600 rounded-md p-1 ${colorByStatus[data.status]}`}>{labelByStatus[data.status]}</div>
        )
    }
    return (
        <Dropdown
            menu={{
                items: [
                    {
                        key: "1",
                        label: (
                            <div >
                                <div className="text-center font-bold text-md">Change status</div>
                                {listStatuses.map((item) => {
                                    return (
                                        <div
                                            className={`text-sm hover:font-bold text-gray-600 my-1 p-1 ${colorByStatus[item.value]}`}
                                            onClick={() => {
                                                onChangeStatus(item.value);
                                            }}
                                        >
                                            {item.label}
                                        </div>
                                    );
                                })}
                            </div>
                        ),
                    },
                ],
            }}
        >
            <div className={`text-center text-gray-600 rounded-md p-1 cursor-pointer ${colorByStatus[data.status]}`}>{labelByStatus[data.status]}</div>
        </Dropdown>
    );
};

export default ChangeStatus;
