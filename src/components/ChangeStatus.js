import { Dropdown } from "antd";
import axios from "axios";
import {colorByStatus, labelByStatus, STATUSES} from "../utils/contants";

const ChangeStatus = (props) => {
    const { data, onSuccess } = props;

    const onChangeStatus = (status) => {
        axios
            .post(`/api/orders/change-status/${data.orderNumber}`, { status })
            .then((res) => {
                onSuccess()
            });
    };
    return (
        <Dropdown
            menu={{
                items: [
                    {
                        key: "1",
                        label: (
                            <div >
                                <div className="text-center font-bold text-md">Change status</div>
                                {STATUSES.map((item) => {
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
