import React, { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../contexts/AppContext";
import { Form, Input, Select, Row, Col } from "antd";
import { useAddressHook } from "../../hooks/useAddressHook";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import {useTranslation} from "react-i18next";

const { Option } = Select;
const Profile = (props) => {
    const {t} = useTranslation()
    const formRef = useRef(null);
    const { userInfo, setUserInfo, user, setLoading } = useContext(AppContext);
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
        setLoading(true);
        axios
            .post("/api/users/save-me", {
                name: values.name,
                addressProvince: values.addressProvince,
                addressDistrict: values.addressDistrict,
                addressWard: values.addressWard,
                addressDescription: values.addressDescription,
            })
            .then((res) => {
                toast.success(t('toast.updateProfile_success'));
                setLoading(false);
                setUserInfo((prev) => ({
                    ...prev,
                    name: res.data.name,
                    addressProvince: res.data.addressProvince,
                    addressDistrict: res.data.addressDistrict,
                    addressWard: res.data.addressWard,
                    addressDescription: res.data.addressDescription,
                }));
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
                    {t('label.profile')}
                </div>
                <Form
                    name="Profile"
                    layout="vertical"
                    onFinish={onFinish}
                    ref={formRef}
                    initialValues={{ ...data }}
                >
                    <Form.Item
                        name="name"
                        label={t('user.label.name')}
                        rules={[
                            {
                                required: true,
                                message: t('form_rule.name_required'),
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="phone"
                        label={t('user.label.phone')}
                        disabled
                    >
                        <Input disabled={true} />
                    </Form.Item>
                    <Form.Item
                        label={t('user.label.address')}
                    >
                        <Row gutter={16}>
                            <Col span={8}>
                                <Form.Item
                                    name="addressProvince"
                                    rules={[
                                        {
                                            required: true,
                                            message:t('form_rule.province_required')
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
                                    name="addressDistrict"
                                    rules={[
                                        {
                                            required: true,
                                            message:t('form_rule.district_required')
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
                                    name="addressWard"
                                    rules={[
                                        {
                                            required: true,
                                            message:t('form_rule.ward_required')
                                        },
                                    ]}
                                >
                                    <Select placeholder="Select Ward">
                                        {wards.map((item) => {
                                            return (
                                                <Option value={item.key}>
                                                    {item.name}
                                                </Option>
                                            );
                                        })}
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item name="addressDescription">
                                    <Input.TextArea />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form.Item>
                    <Form.Item className="text-right">
                        <button
                            type="submit"
                            className="bg-orange-400 text-white rounded-md py-2 px-4 font-bold"
                        >
                            {t('label.submit')}
                        </button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default Profile;
