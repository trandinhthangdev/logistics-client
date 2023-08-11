import React, {useContext} from 'react';
import { Form, Input, Button } from 'antd';
import {  signInWithEmailAndPassword   } from 'firebase/auth';
import { auth } from "./../../../firebase.config";
import {AppContext} from "../../../contexts/AppContext";
import {useNavigate} from "react-router-dom";

const AdminLogin = (props) => {
    const navigate = useNavigate();
    const { setLoading, setUser } = useContext(AppContext);
    const onFinish = (values) => {
        setLoading(true)
        const {email, password} = values;
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                setUser(user)
                setLoading(false)
                navigate("/admin")
            })
            .catch((error) => {
                setLoading(false)
            });
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="text-3xl font-bold mb-4">
                Login
            </div>
            <Form
                 className="w-[320px]"
                name="loginForm"
                onFinish={onFinish}
                layout="vertical"
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter your email!',
                        },
                        {
                            type: 'email',
                            message: 'Please enter a valid email!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter your password!',
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
                        Log In
                    </button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default AdminLogin;
