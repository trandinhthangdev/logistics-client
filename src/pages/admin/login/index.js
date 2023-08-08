import React from 'react';
import { Form, Input, Button } from 'antd';
import {  signInWithEmailAndPassword   } from 'firebase/auth';
import { auth } from "./../../../firebase.config";

const AdminLogin = (props) => {
    const onFinish = (values) => {
        console.log('Received values of form:', values);
        const {email, password} = values
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log('user',user)
            })
            .catch((error) => {
                console.log('error', error)
                const errorCode = error.code;
                const errorMessage = error.message;
            });
        // Add login logic here, e.g., call an API to authenticate the user
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <Form
            name="loginForm"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
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
                <Button type="primary" htmlType="submit">
                    Log In
                </Button>
            </Form.Item>
        </Form>
    )
}

export default AdminLogin;
