import React, { useContext, useEffect, useRef, useState } from "react";
import { Form, Input, Select, DatePicker, Button, Row, Col } from "antd";
import { useAddressHook } from "../hooks/useAddressHook";
import axios from "axios";
import { AppContext } from "../contexts/AppContext";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const { Option } = Select;

const FormOrder = ({ init }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { userInfo, user, setLoading, setIsAuthModal } =
        useContext(AppContext);
    const formRef = useRef(null);
    const [isRedirect, setIsRedirect] = useState(false);
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
        if (init) {
            return;
        }
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
                          senderPhone: user?.phoneNumber ?? "",
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

    useEffect(() => {
        if (init) {
            setAddress({
                senderAddressProvince: init.senderAddressProvince,
                senderAddressDistrict: init.senderAddressDistrict,
                recipientAddressProvince: init.recipientAddressProvince,
                recipientAddressDistrict: init.recipientAddressDistrict,
            });
            setData((prev) => ({
                ...prev,
                senderName: init.senderName,
                senderPhone: init.senderPhone,
                senderAddressProvince: init.senderAddressProvince,
                senderAddressDistrict: init.senderAddressDistrict,
                senderAddressWard: init.senderAddressWard,
                senderAddressDescription: init.senderAddressDescription,
                recipientName: init.recipientName,
                recipientPhone: init.recipientPhone,
                recipientAddressProvince: init.recipientAddressProvince,
                recipientAddressDistrict: init.recipientAddressDistrict,
                recipientAddressWard: init.recipientAddressWard,
                recipientAddressDescription: init.recipientAddressDescription,
                note: init.note,
            }));
        }
    }, []);
    const onFinish = (values) => {
        // check login
        if (!user) {
            setIsAuthModal(true);
            return;
        }
        setLoading(true);
        if (init) {
            axios
                .put(`/api/orders/${init.orderNumber}`, values)
                .then((res) => {
                    toast.success("Update Order successfully!");
                    setLoading(false);
                    setIsRedirect(true);
                })
                .catch((err) => {
                    toast.error(
                        err.response?.data?.message ?? t("toast.error")
                    );
                    setLoading(false);
                });
            return;
        }
        axios
            .post("/api/orders", values)
            .then((res) => {
                toast.success("Create Order successfully!");
                setLoading(false);
                setIsRedirect(true);
            })
            .catch((err) => {
                toast.error(err.response?.data?.message ?? t("toast.error"));
                setLoading(false);
            });
    };

    useEffect(() => {
        if (isRedirect) {
            navigate("/");
        }
    }, [isRedirect]);

    if (!data) return <></>;

    return (
        <div className="flex flex-col items-center">
            <div className="w-[600px] max-w-[calc(100vw-40px)]">
                <div className="font-bold text-2xl mb-2 text-center">
                    {init
                        ? t("label.editOrder", {
                              orderNumber: init.orderNumber,
                          })
                        : t("label.createOrder")}
                </div>
                <Form
                    name="FormOrder"
                    onFinish={onFinish}
                    layout="vertical"
                    initialValues={{ ...data }}
                    ref={formRef}
                >
                    <Form.Item
                        label={t("order.label.senderName")}
                        name="senderName"
                        rules={[
                            {
                                required: true,
                                message: t("form_rule.senderName_required"),
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label={t("order.label.senderPhone")}
                        name="senderPhone"
                        rules={[
                            {
                                required: true,
                                message: t("form_rule.senderPhone_required"),
                            },
                            {
                                pattern:
                                    /(\+84|84|0[3|5|7|8|9])+([0-9]{8,9})\b/,
                                message: t("form_rule.phone_valid"),
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item label={t("order.label.senderAddress")}>
                        <Row gutter={16}>
                            <Col span={8}>
                                <Form.Item
                                    name="senderAddressProvince"
                                    rules={[
                                        {
                                            required: true,
                                            message: t(
                                                "form_rule.province_required"
                                            ),
                                        },
                                    ]}
                                >
                                    <Select
                                        placeholder={t("label.select_province")}
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
                                            message: t(
                                                "form_rule.district_required"
                                            ),
                                        },
                                    ]}
                                >
                                    <Select
                                        placeholder={t("label.select_district")}
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
                                            message: t(
                                                "form_rule.ward_required"
                                            ),
                                        },
                                    ]}
                                    required
                                >
                                    <Select
                                        placeholder={t("label.select_ward")}
                                    >
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
                        label={t("order.label.recipientName")}
                        name="recipientName"
                        rules={[
                            {
                                required: true,
                                message: t("form_rule.recipientName_required"),
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label={t("order.label.recipientPhone")}
                        name="recipientPhone"
                        rules={[
                            {
                                required: true,
                                message: t("form_rule.recipientPhone_required"),
                            },
                            {
                                pattern:
                                    /(\+84|84|0[3|5|7|8|9])+([0-9]{8,9})\b/,
                                message: t("form_rule.phone_valid"),
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item label={t("order.label.recipientAddress")}>
                        <Row gutter={16}>
                            <Col span={8}>
                                <Form.Item
                                    name="recipientAddressProvince"
                                    rules={[
                                        {
                                            required: true,
                                            message: t(
                                                "form_rule.province_required"
                                            ),
                                        },
                                    ]}
                                >
                                    <Select
                                        placeholder={t("label.select_province")}
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
                                            message: t(
                                                "form_rule.district_required"
                                            ),
                                        },
                                    ]}
                                >
                                    <Select
                                        placeholder={t("label.select_district")}
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
                                            message: t(
                                                "form_rule.ward_required"
                                            ),
                                        },
                                    ]}
                                    required
                                >
                                    <Select
                                        placeholder={t("label.select_ward")}
                                    >
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
                    <Form.Item label={t("order.label.note")} name="note">
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item className="text-right">
                        <button
                            type="primary"
                            className="bg-orange-400 text-white rounded-md py-2 px-4 font-bold"
                        >
                            {t("label.submit")}
                        </button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default FormOrder;
