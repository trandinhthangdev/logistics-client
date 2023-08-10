import React, { useContext, useEffect, useRef, useState } from "react";
import { Form, Input, Select, DatePicker, Button, Row, Col } from "antd";
import { useAddressHook } from "../hooks/useAddressHook";
import axios from "axios";
import { AppContext } from "../contexts/AppContext";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const FormOrder = () => {
    const navigate = useNavigate();
    const { userInfo, user, setLoading } = useContext(AppContext);
    const formRef = useRef(null);
    const [data, setData] = useState(null);
    const [address, setAddress] = useState({
        senderAddressProvince: "",
        senderAddressDistrict: "",
        recipientAddressProvince: "",
        recipientAddressDistrict: "",
    });
    const {
        senderAddressProvince,
        senderAddressDistrict,
        recipientAddressProvince,
        recipientAddressDistrict,
    } = address;

    const {
        provinces,
        districts: senderDistricts,
        wards: senderWards,
    } = useAddressHook({
        province: senderAddressProvince,
        district: senderAddressDistrict,
    });
    const { districts: recipientDistricts, wards: recipientWards } =
        useAddressHook({
            province: recipientAddressProvince,
            district: recipientAddressDistrict,
        });
    useEffect(() => {
        if (userInfo !== undefined) {
            if (userInfo) {
                setAddress({
                    senderAddressProvince: userInfo.addressProvince,
                    senderAddressDistrict: userInfo.addressDistrict,
                });
            }
            setData(
                userInfo
                    ? {
                          senderName: userInfo.name,
                          senderPhone: user.phoneNumber,
                          senderAddressProvince: userInfo.addressProvince,
                          senderAddressDistrict: userInfo.addressDistrict,
                          senderAddressWard: userInfo.addressWard,
                          senderAddressDescription: userInfo.addressDescription,
                          recipientName: "",
                          recipientPhone: "",
                          recipientAddressProvince: "",
                          recipientAddressDistrict: "",
                          recipientAddressWard: "",
                          recipientAddressDescription: "",
                          note: "",
                      }
                    : {
                          senderName: "",
                          senderPhone: user.phoneNumber,
                          senderAddressProvince: "",
                          senderAddressDistrict: "",
                          senderAddressWard: "",
                          senderAddressDescription: "",
                          recipientName: "",
                          recipientPhone: "",
                          recipientAddressProvince: "",
                          recipientAddressDistrict: "",
                          recipientAddressWard: "",
                          recipientAddressDescription: "",
                          note: "",
                      }
            );
        }
    }, [userInfo]);
    const onFinish = (values) => {
        setLoading(true);
        axios
            .post("/api/orders", values)
            .then((res) => {
                console.log("res", res);
                toast.success("Create Order successfully!");
                setLoading(false);
                if (res.data?.orderNumber)
                    navigate(`/detail-order/${res.data.orderNumber}`);
                else navigate("/");
            })
            .catch((err) => {
                toast.error(err.response);
                setLoading(false);
            });
    };

    if (!data) return <></>;

    return (
        <div className="flex flex-col items-center">
            <div className="w-[600px] max-w-[calc(100vw-40px)]">
                <div className="font-bold text-2xl mb-2 text-center">
                    Create Order
                </div>
                <Form
                    name="FormOrder"
                    onFinish={onFinish}
                    layout="vertical"
                    initialValues={{ ...data }}
                    ref={formRef}
                >
                    <Form.Item
                        label="Sender Name"
                        name="senderName"
                        rules={[
                            {
                                required: true,
                                message: "Please enter sender name",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Sender Phone"
                        name="senderPhone"
                        rules={[
                            {
                                required: true,
                                message: "Please enter sender phone",
                            },
                            {
                                pattern:
                                    /(\+84|84|0[3|5|7|8|9])+([0-9]{8,9})\b/,
                                message:
                                    "Please enter a valid phone number in Vietnam!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item label="Sender Address">
                        <Row gutter={16}>
                            <Col span={8}>
                                <Form.Item
                                    name="senderAddressProvince"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please select province",
                                        },
                                    ]}
                                >
                                    <Select
                                        placeholder="Select Province"
                                        onChange={(value) => {
                                            setAddress((prev) => ({
                                                ...prev,
                                                senderAddressProvince: value,
                                            }));
                                            formRef.current.setFieldsValue({
                                                senderAddressDistrict: "",
                                                senderAddressWard: "",
                                            });
                                        }}
                                    >
                                        {provinces.map((item) => {
                                            return (
                                                <Option value={item.key}>
                                                    {item.name}
                                                </Option>
                                            );
                                        })}
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    name="senderAddressDistrict"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please select district",
                                        },
                                    ]}
                                >
                                    <Select
                                        placeholder="Select District"
                                        onChange={(value) => {
                                            setAddress((prev) => ({
                                                ...prev,
                                                senderAddressDistrict: value,
                                            }));
                                            formRef.current.setFieldsValue({
                                                senderAddressWard: "",
                                            });
                                        }}
                                    >
                                        {senderDistricts.map((item) => {
                                            return (
                                                <Option value={item.key}>
                                                    {item.name}
                                                </Option>
                                            );
                                        })}
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    name="senderAddressWard"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please select ward",
                                        },
                                    ]}
                                    required
                                >
                                    <Select placeholder="Select Ward">
                                        {senderWards.map((item) => {
                                            return (
                                                <Option value={item.key}>
                                                    {item.name}
                                                </Option>
                                            );
                                        })}
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Form.Item name="senderAddressDescription">
                            <Input.TextArea />
                        </Form.Item>
                    </Form.Item>
                    <Form.Item
                        label="Recipient Name"
                        name="recipientName"
                        rules={[
                            {
                                required: true,
                                message: "Please enter recipient name",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Recipient Phone"
                        name="recipientPhone"
                        rules={[
                            {
                                required: true,
                                message: "Please enter recipient phone",
                            },
                            {
                                pattern:
                                    /(\+84|84|0[3|5|7|8|9])+([0-9]{8,9})\b/,
                                message:
                                    "Please enter a valid phone number in Vietnam!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item label="Recipient Address">
                        <Row gutter={16}>
                            <Col span={8}>
                                <Form.Item
                                    name="recipientAddressProvince"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please select province",
                                        },
                                    ]}
                                >
                                    <Select
                                        placeholder="Select Province"
                                        onChange={(value) => {
                                            setAddress((prev) => ({
                                                ...prev,
                                                recipientAddressProvince: value,
                                            }));
                                            formRef.current.setFieldsValue({
                                                recipientAddressDistrict: "",
                                                recipientAddressWard: "",
                                            });
                                        }}
                                    >
                                        {provinces.map((item) => {
                                            return (
                                                <Option value={item.key}>
                                                    {item.name}
                                                </Option>
                                            );
                                        })}
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    name="recipientAddressDistrict"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please select district",
                                        },
                                    ]}
                                >
                                    <Select
                                        placeholder="Select District"
                                        onChange={(value) => {
                                            setAddress((prev) => ({
                                                ...prev,
                                                recipientAddressDistrict: value,
                                            }));
                                        }}
                                    >
                                        {recipientDistricts.map((item) => {
                                            return (
                                                <Option value={item.key}>
                                                    {item.name}
                                                </Option>
                                            );
                                        })}
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    name="recipientAddressWard"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please select ward",
                                        },
                                    ]}
                                    required
                                >
                                    <Select placeholder="Select Ward">
                                        {recipientWards.map((item) => {
                                            return (
                                                <Option value={item.key}>
                                                    {item.name}
                                                </Option>
                                            );
                                        })}
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Form.Item name="recipientAddressDescription">
                            <Input.TextArea />
                        </Form.Item>
                    </Form.Item>
                    <Form.Item label="Note" name="note">
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item className="text-right">
                        <button
                            type="primary"
                            className="bg-orange-400 text-white rounded-md py-2 px-4 font-bold"
                        >
                            Submit
                        </button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default FormOrder;
