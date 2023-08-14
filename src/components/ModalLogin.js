import {Modal} from "antd";
import LoginForm from "./LoginForm";
import {useState} from "react";
import {useTranslation} from "react-i18next";

const ModalLogin = (props) => {
    const {
        open,
        onClose,
    } = props;
    const {t} = useTranslation();
    return (
        <Modal className="[&_.ant-modal-body]:min-h-[200px]" title={t('label.login')} open={open} footer={false} onCancel={() => onClose()}>
            <LoginForm />
        </Modal>
    )
}

export default ModalLogin;
