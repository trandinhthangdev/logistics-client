import axios from "axios";
import { useContext } from "react";
import { AiFillDelete } from "react-icons/ai";
import { AppContext } from "../contexts/AppContext";
import { useTranslation } from "react-i18next";
import { toast } from "react-hot-toast";
import { Popconfirm } from "antd";
const DeleteOrderBtn = (props) => {
    const { t } = useTranslation();
    const { data, onSuccess } = props;
    const { isAdmin, user, setLoading } = useContext(AppContext);

    const onDelete = () => {
        setLoading(true);
        axios
            .delete(`/api/orders/${data.orderNumber}`)
            .then((res) => {
                toast.success(t("toast.delete_success"));
                onSuccess();
                setLoading(false);
            })
            .catch((err) => {
                toast.error(err.response?.data?.message ?? t("toast.error"));
                setLoading(false);
            });
    };
    if (!(isAdmin || user.uid === data.uid)) {
        return <></>;
    }
    return (
        <Popconfirm
            title="Delete the order"
            description={`Are you sure to delete this order (${data.orderNumber})?`}
            onConfirm={onDelete}
            okText="Yes"
            cancelText="No"
            className="[&_.ant-btn-primary]:bg-blue-400"
        >
            <div className="flex items-center justify-center cursor-pointer p-2 rounded-md text-white bg-red-600">
                <AiFillDelete />
            </div>
        </Popconfirm>
    );
};

export default DeleteOrderBtn;
