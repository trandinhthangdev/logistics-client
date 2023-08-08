import React, { useRef, useState } from "react";
import { Form, Input, Select, DatePicker, Button, Row, Col } from "antd";
import { useAddressHook } from "../hooks/useAddressHook";
import axios from "axios";

const { Option } = Select;

const MyForm = () => {
    const formRef = useRef(null);

    const onFinish = (values) => {
        console.log("Form values:", values);
        // Handle form submission here
        axios
            .post("/api/orders", values)
            .then((data) => {
                console.log(data);
            })
            .catch((err) => {
                console.error("Error creating order:", err);
            });
    };

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

    return (
        <div className="max-w-[600px] m-auto">
            <Form
                name="myForm"
                onFinish={onFinish}
                layout="vertical"
                initialValues={{
                    senderName: "",
                    senderPhone: "",
                    senderAddressProvince: "",
                    senderAddressDistrict: "",
                    senderAddressWard: "",
                    senderAddressDescription: "",
                    // shippingDate: "",
                    recipientName: "",
                    recipientPhone: "",
                    recipientAddressProvince: "",
                    recipientAddressDistrict: "",
                    recipientAddressWard: "",
                    recipientAddressDescription: "",
                    // expectedDeliveryDate: "",
                    note: "",
                }}
                ref={formRef}
            >
                <Form.Item
                    label="Sender Name"
                    name="senderName"
                    rules={[
                        { required: true, message: "Please enter sender name" },
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
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item label="Sender Address Description">
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
                                    }}
                                >
                                    {senderDistricts.map((item) => {
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
                    <Form.Item
                        name="senderAddressDescription"
                        // rules={[
                        //     {
                        //         required: true,
                        //         message: "Please enter address description",
                        //     },
                        // ]}
                    >
                        <Input.TextArea />
                    </Form.Item>
                </Form.Item>
                {/* <Form.Item
                    label="Shipping Date"
                    name="shippingDate"
                    rules={[
                        {
                            required: true,
                            message: "Please select shipping date",
                        },
                    ]}
                >
                    <DatePicker />
                </Form.Item> */}

                {/* Recipient Fields */}
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
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item label="Recipient Address Description">
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
                    <Form.Item
                        name="recipientAddressDescription"
                        // rules={[
                        //     {
                        //         required: true,
                        //         message: "Please enter address description",
                        //     },
                        // ]}
                    >
                        <Input.TextArea />
                    </Form.Item>
                </Form.Item>

                {/* <Form.Item
                    label="Expected Delivery Date"
                    name="expectedDeliveryDate"
                    rules={[
                        {
                            required: true,
                            message: "Please select expected delivery date",
                        },
                    ]}
                >
                    <DatePicker />
                </Form.Item> */}

                {/* Note */}
                <Form.Item
                    label="Note"
                    name="note"
                    rules={[{ required: true, message: "Please enter note" }]}
                >
                    <Input.TextArea />
                </Form.Item>

                {/* Submit Button */}
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default MyForm;
