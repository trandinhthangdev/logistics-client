import { Dropdown } from "antd";
import axios from "axios";
import { STATUSES } from "../utils/contants";

const ChangeStatus = (props) => {
    const { data } = props;

    const onChangeStatus = (status) => {
        axios
            .post(`/api/orders/change-status/${data.orderNumber}`, { status })
            .then((res) => {});
    };
    return (
        <div>
            <Dropdown
                menu={{
                    items: [
                        {
                            key: "1",
                            label: (
                                <div>
                                    <div>Change status</div>
                                    {STATUSES.map((item) => {
                                        return (
                                            <div
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
                <div>{data.status}</div>
            </Dropdown>
        </div>
    );
};

export default ChangeStatus;
