import React, { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import {Table, Input, Select, Spin} from "antd";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { showAddressByKey } from "../../../utils/functions";
import {OrderStatusEnum, STATUSES} from "../../../utils/contants";
import ChangeStatus from "../../../components/ChangeStatus";
import LoadingProgress from "../../../components/LoadingProgress";
import OrderNumber from "../../../components/OrderNumber";
import {AiOutlineArrowRight} from "react-icons/ai"
import {debounce} from "lodash";
const { Option } = Select;

const pageSize = 10;
const OrderList = (props) => {
    const [searchTextInput, setSearchTextInput] = useState("")
    const [data, setData] = useState({
        items: [],
        page: 0,
        searchText: "",
        hasMore: true,
        loading: true,
        filters: {},
    });
    const { items, page, searchText, hasMore, loading, filters } = data;
    useEffect(() => {
        if (!page) {
            setData((prev) => ({
                ...prev,
                page: 1,
            }));
            return;
        }
        getData();
    }, [page]);
    const debouncedSearch = useRef(
        debounce(async (searchText) => {
            setData((prev) => ({
                ...prev,
                page: 0,
                searchText: searchText,
            }));
        }, 300)
    ).current;
    useEffect(() => {
        return () => {
            debouncedSearch.cancel();
        };
    }, [debouncedSearch]);

    useEffect(() => {
        debouncedSearch(searchTextInput)
    }, [searchTextInput])

    const getData = () => {
        if (!page) return;
        setData((prev) => ({
            ...prev,
            loading: true,
        }));
        axios
            .get(
                `/api/orders?page=${page}&limit=${pageSize}&search=${searchText.trim()}&${Object.keys(
                    filters
                )
                    .map((key) => `${key}=${filters[key]}`)
                    .join("&")}`
            )
            .then((res) => {
                setData((prev) => ({
                    ...prev,
                    items: page === 1 ? res.data : [...prev.items, ...res.data],
                    hasMore: res.data.length === pageSize,
                    loading: false,
                }));
            });
    };

    const handleSearch = () => {
        setData((prev) => ({
            ...prev,
            page: 0,
        }));
    };
    const observer = useRef();
    const lastEndRef = useCallback(
        (node) => {
            if (loading) return;
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    setData((prev) => {
                        return {
                            ...prev,
                            page: prev.page + 1,
                        };
                    });
                }
            });
            if (node) observer.current.observe(node);
        },
        [loading, hasMore]
    );

    const columns = [
        {
            title: "Order Number",
            dataIndex: "orderNumber",
            key: "orderNumber",
            render: (value) => {
                return (
                    <OrderNumber orderNumber={value}/>
                )
            }
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (value, record) => {
                return <ChangeStatus data={record} onSuccess={() => {
                    setData(prev => ({
                        ...prev,
                        page: 0
                    }))
                }} />;
            },
        },
        {
            title: "Sender",
            dataIndex: "senderInfo",
            key: "senderInfo",
            render: (value, record) => {
                return (
                    <div>
                        <div>{record.senderName}</div>
                        <div>{record.senderPhone}</div>
                    </div>
                );
            },
        },
        {
            title: "Sender Address",
            dataIndex: "senderAddress",
            key: "senderAddress",
            render: (value, record) => {
                const { province, district, ward } = showAddressByKey({
                    province: record.senderAddressProvince,
                    district: record.senderAddressDistrict,
                    ward: record.senderAddressWard,
                });
                return (
                    <div className="italic">
                        <div>{`${province}, ${district}, ${ward}`}</div>
                        <div>{record.senderAddressDescription}</div>
                    </div>
                );
            },
        },
        {
            title: "Recipient",
            dataIndex: "recipientInfo",
            key: "recipientInfo",
            render: (value, record) => {
                return (
                    <div>
                        <div>{record.recipientName}</div>
                        <div>{record.recipientPhone}</div>
                    </div>
                );
            },
        },
        {
            title: "Recipient Address",
            dataIndex: "recipientAddress",
            key: "recipientAddress",
            render: (value, record) => {
                const { province, district, ward } = showAddressByKey({
                    province: record.recipientAddressProvince,
                    district: record.recipientAddressDistrict,
                    ward: record.recipientAddressWard,
                });
                return (
                    <div className="italic">
                        <div>{`${province}, ${district}, ${ward}`}</div>
                        <div>{record.recipientAddressDescription}</div>
                    </div>
                );
            },
        },
        {
            title: "",
            dataIndex: "action",
            key: "action",
            render: (value, record, index) => {
                if (index === items.length - 1) {
                    return (
                        <div ref={lastEndRef}>
                            <Link to={`/admin/tracking/${record.orderNumber}`}>
                                <div className="flex items-center justify-center cursor-pointer p-2 rounded-md text-white bg-amber-600">
                                    <AiOutlineArrowRight />
                                </div>
                            </Link>
                        </div>
                    );
                }
                return (
                    <Link to={`/admin/tracking/${record.orderNumber}`}>
                        <div className="flex items-center justify-center cursor-pointer p-2 rounded-md text-white bg-amber-600">
                            <AiOutlineArrowRight />
                        </div>
                    </Link>
                );
            },
        },
    ];
    const statusOptions = [
        {
            value: "",
            label: "All",
        },
        ...STATUSES
    ];
    return (
        <div className="">
            <div className="flex items-center justify-between pb-2">
                    <Input.Search
                        className="max-w-[240px]"
                        value={searchTextInput}
                        onChange={(e) => {
                            // setData((prev) => ({
                            //     ...prev,
                            //     searchText: e.target.value,
                            // }));
                            setSearchTextInput(e.target.value)
                        }}
                        // onSearch={handleSearch}
                    />
                <Select
                     className="w-[120px]"
                    placeholder="Select status"
                    onChange={(value) => {
                        const prevFilters = { ...filters };
                        if (value) {
                            prevFilters.status = value;
                        } else {
                            delete prevFilters.status;
                        }
                        setData((prev) => ({
                            ...prev,
                            filters: prevFilters,
                            page: 0,
                            items: [],
                        }));
                    }}
                    value={filters?.status ?? ""}
                >
                    {statusOptions.map((item) => {
                        return <Option value={item.value}>{item.label}</Option>;
                    })}
                </Select>
            </div>
            <Table
                dataSource={items}
                columns={columns}
                scroll={{ x: true, y: 'calc(100vh - 320px)' }}
                pagination={false}
                loading={loading}
            />
            {/*{loading && <div className="p-2 flex items-center justify-center"><Spin /></div>}*/}
        </div>
    );
};
export default OrderList;
