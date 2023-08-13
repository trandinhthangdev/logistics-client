import {Modal} from "antd";
import LoginForm from "./LoginForm";
import {useState} from "react";

const ModalLogin = (props) => {
    const {
        open,
        onClose,
    } = props;
    const {t} = useState();
    return (
        <Modal className="[&_.ant-modal-body]:min-h-[200px]" title={t('label.login')} open={open} footer={false} onCancel={() => onClose()}>
            <LoginForm />
        </Modal>
    )
}

export default ModalLogin;
