import {FiCopy} from "react-icons/fi";
import {toast} from "react-hot-toast";

const OrderNumber = (props) => {
    const {orderNumber} = props;
    const onCopyOrderNumber = () => {
        navigator.clipboard.writeText(orderNumber)
            .then(() => {
                toast.success(`Order number copied (${orderNumber})`)
            })
            .catch(err => {
            });
    }
    return (
        <div className="cursor-pointer flex items-center font-bold text-gray-800" onClick={() => {
            onCopyOrderNumber()
        }}>
            <div className="mr-1">{orderNumber}</div>
            <FiCopy />
        </div>
    )
}

export default OrderNumber
