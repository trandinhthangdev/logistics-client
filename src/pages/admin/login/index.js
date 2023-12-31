import React, {useContext, useEffect, useState} from 'react';
import { Form, Input, Button } from 'antd';
import {  signInWithEmailAndPassword   } from 'firebase/auth';
import { auth } from "./../../../firebase.config";
import {AppContext} from "../../../contexts/AppContext";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {toast} from "react-hot-toast";

const AdminLogin = (props) => {
    const {t} = useTranslation()
    const navigate = useNavigate();
    const { setLoading, setUser } = useContext(AppContext);
    const [isRedirect, setIsRedirect] = useState(false);

    const onFinish = (values) => {
        setLoading(true)
        const {email, password} = values;
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setLoading(false)
                setIsRedirect(true);
                toast.success(t('toast.login_success'));
            })
            .catch((error) => {
                setLoading(false);
                toast.error(t('toast.login_email_error'));
            });
    };
    useEffect(() => {
        if (isRedirect) {
            navigate("/admin")
        }
    }, [isRedirect]);
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="text-3xl font-bold mb-4">
                {t('label.login')}
            </div>
            <Form
                 className="w-[320px]"
                name="loginForm"
                onFinish={onFinish}
                layout="vertical"
            >
                <Form.Item
                    label={t('label.email')}
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: t('form_rule.email_required'),
                        },
                        {
                            type: 'email',
                            message: t('form_rule.email_valid'),
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label={t('label.password')}
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: t('form_rule.password_valid'),
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item>
                    <button
                        type="primary"
                        className="bg-orange-400 text-white rounded-md py-2 px-4 font-bold w-full"
                    >
                        {t('label.login')}
                    </button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default AdminLogin;
