import React, { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../contexts/AppContext";
import { Form, Input, Select, Row, Col } from "antd";
import { useAddressHook } from "../../hooks/useAddressHook";
import axios from "axios";

const { Option } = Select;
const Profile = (props) => {
    const formRef = useRef(null);
    const { userInfo, setUserInfo, user } = useContext(AppContext);

    const [data, setData] = useState(null);

    useEffect(() => {
        if (userInfo !== undefined) {
            setData(
                userInfo
                    ? {
                          phone: user.phoneNumber ?? "",
                          name: userInfo.name ?? "",
                          addressProvince: userInfo.addressProvince,
                          addressDistrict: userInfo.addressDistrict,
                          addressWard: userInfo.addressWard,
                          addressDescription: userInfo.addressDescription,
                      }
                    : {
                          phone: user.phoneNumber ?? "",
                          name: "",
                          addressProvince: "",
                          addressDistrict: "",
                          addressWard: "",
                          addressDescription: "",
                      }
            );
        }
    }, [userInfo]);

    const { provinces, districts, wards } = useAddressHook({
        province: data?.addressProvince,
        district: data?.addressDistrict,
    });
    const onFinish = (values) => {
        console.log("Form values:", values);
        axios
            .post("/api/users/save-me", {
                name: values.name,
                addressProvince: values.addressProvince,
                addressDistrict: values.addressDistrict,
                addressWard: values.addressWard,
                addressDescription: values.addressDescription,
            })
            .then((res) => {
                console.log("res", res);
            })
            .catch((err) => {
                console.log("err", err);
                // setUserInfo(null);
            });
    };
    if (!data) return <></>;
    return (
        <div>
            <Form
                layout="vertical"
                onFinish={onFinish}
                ref={formRef}
                initialValues={{ ...data }}
            >
                <Form.Item
                    name="phone"
                    label="Phone"
                    rules={[
                        {
                            required: true,
                            message: "Please input your phone number!",
                        },
                        {
                            pattern: /(\+84|0[3|5|7|8|9])+([0-9]{8,9})\b/,
                            message:
                                "Please enter a valid phone number in Vietnam!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="name"
                    label="Name"
                    rules={[
                        {
                            required: true,
                            message: "Please input your name!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item label="Sender Address Description">
                    <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item
                                name="addressProvince"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please select a province!",
                                    },
                                ]}
                            >
                                <Select
                                    placeholder="Select Province"
                                    onChange={(value) => {
                                        setData((prev) => ({
                                            ...prev,
                                            addressProvince: value,
                                        }));
                                        formRef.current.setFieldsValue({
                                            addressDistrict: "",
                                            addressWard: "",
                                        });
                                    }}
                                >
                                    {provinces.map((item) => {
                                        return (
                                            <Option
                                                value={JSON.stringify(item)}
                                            >
                                                {item.name}
                                            </Option>
                                        );
                                    })}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                name="addressDistrict"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please select a district!",
                                    },
                                ]}
                            >
                                <Select
                                    placeholder="Select District"
                                    onChange={(value) => {
                                        setData((prev) => ({
                                            ...prev,
                                            addressDistrict: value,
                                        }));
                                        formRef.current.setFieldsValue({
                                            addressWard: "",
                                        });
                                    }}
                                >
                                    {districts.map((item) => {
                                        return (
                                            <Option
                                                value={JSON.stringify(item)}
                                            >
                                                {item.name}
                                            </Option>
                                        );
                                    })}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                name="addressWard"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please select a ward!",
                                    },
                                ]}
                            >
                                <Select placeholder="Select Ward">
                                    {wards.map((item) => {
                                        return (
                                            <Option
                                                value={JSON.stringify(item)}
                                            >
                                                {item.name}
                                            </Option>
                                        );
                                    })}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form.Item>
                <Form.Item
                    name="addressDescription"
                    label="Address Description"
                >
                    <Input.TextArea />
                </Form.Item>
                <Form.Item>
                    <button type="submit">Submit</button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Profile;
