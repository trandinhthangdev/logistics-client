import axios from "axios";
import React, { useState } from "react";
import { Form, Input, Select, DatePicker, Button, message } from "antd";

import { useAddressHook } from "../hooks/useAddressHook";
const { Option } = Select;

const FormOrder = (props) => {
    const [districts, setDistricts] = useState([]);

    const [formData, setFormData] = useState({
        senderName: "",
        senderPhone: "",
        senderAddressProvince: null,
        senderAddressDistrict: null,
        senderAddressWard: null,
        senderAddressDescription: "",
        shippingDate: null,
        recipientName: "",
        recipientPhone: "",
        recipientAddressProvince: null,
        recipientAddressDistrict: null,
        recipientAddressWard: null,
        recipientAddressDescription: "",
        expectedDeliveryDate: null,
        note: "",
    });

    const {
        senderName,
        senderPhone,
        senderAddress,
        shippingDate,
        recipientName,
        recipientPhone,
        recipientAddress,
        expectedDeliveryDate,
        note,
    } = formData;

    const {
        provinces,
        districts: senderDistricts,
        wards: senderWards,
    } = useAddressHook({
        province: senderAddress?.province,
        district: senderAddress?.district,
        ward: senderAddress?.ward,
    });

    const { districts: recipientDistricts, wards: recipientWards } =
        useAddressHook({
            province: recipientAddress?.province,
            district: recipientAddress?.district,
            ward: recipientAddress?.ward,
        });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post("/api/orders", formData)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
            })
            .catch((err) => {
                console.error("Error creating order:", err);
            });
    };

    return (
        <div>
            <h1>New Order</h1>
            <form className="max-w-sm" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block mb-2" htmlFor="orderNumber">
                        Order Number
                    </label>
                    <input
                        type="text"
                        id="orderNumber"
                        name="orderNumber"
                        value={formData.orderNumber}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2" htmlFor="customerName">
                        Customer Name
                    </label>
                    <input
                        type="text"
                        id="customerName"
                        name="customerName"
                        value={formData.customerName}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg"
                        required
                    />
                </div>
                <div className="mb-4">
                    <div>
                        <div className="">
                            <label
                                className="block mb-2"
                                htmlFor="recipientAddress"
                            >
                                Province
                            </label>
                            <textarea
                                id="recipientAddress"
                                name="recipientAddress"
                                value={formData.recipientAddress}
                                onChange={handleChange}
                                rows="3"
                                className="w-full px-3 py-2 border rounded-lg"
                                required
                            />
                        </div>
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block mb-2" htmlFor="recipientAddress">
                        Recipient Address
                    </label>
                    <textarea
                        id="recipientAddress"
                        name="recipientAddress"
                        value={formData.recipientAddress}
                        onChange={handleChange}
                        rows="3"
                        className="w-full px-3 py-2 border rounded-lg"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2" htmlFor="shippingAddress">
                        Shipping Address
                    </label>
                    <textarea
                        id="shippingAddress"
                        name="shippingAddress"
                        value={formData.shippingAddress}
                        onChange={handleChange}
                        rows="3"
                        className="w-full px-3 py-2 border rounded-lg"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2" htmlFor="shippingDate">
                        Shipping Date
                    </label>
                    <input
                        type="date"
                        id="shippingDate"
                        name="shippingDate"
                        value={formData.shippingDate}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label
                        className="block mb-2"
                        htmlFor="expectedDeliveryDate"
                    >
                        Expected Delivery Date
                    </label>
                    <input
                        type="date"
                        id="expectedDeliveryDate"
                        name="expectedDeliveryDate"
                        value={formData.expectedDeliveryDate}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                >
                    Create Order
                </button>
            </form>
        </div>
    );
};
export default FormOrder;
