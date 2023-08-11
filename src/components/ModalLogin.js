import {Modal} from "antd";
import LoginForm from "./LoginForm";

const ModalLogin = (props) => {
    const {
        open,
        onClose,
    } = props;
    return (
        <Modal className="[&_.ant-modal-body]:min-h-[200px]" title="Login" open={open} footer={false} onCancel={() => onClose()}>
            <LoginForm />
        </Modal>
    )
}

export default ModalLogin;
