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
import {useTranslation} from "react-i18next";
import ReviewAndComment from "../../../components/ReviewAndComment";
import OrderRowDetail from "../../../components/OrderRowDetail";
import OrderFilterBtn from "../../../components/OrderFilterBtn";
const { Option } = Select;

const pageSize = 10;
const OrderList = (props) => {
    const {t} = useTranslation()
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
            title: t('order.label.orderNumber'),
            dataIndex: "orderNumber",
            key: "orderNumber",
            render: (value) => {
                return (
                    <OrderNumber orderNumber={value}/>
                )
            }
        },
        {
            title: t('order.label.status'),
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
            title: t('order.label.sender'),
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
        // {
        //     title: t('order.label.senderAddress'),
        //     dataIndex: "senderAddress",
        //     key: "senderAddress",
        //     render: (value, record) => {
        //         const { province, district, ward } = showAddressByKey({
        //             province: record.senderAddressProvince,
        //             district: record.senderAddressDistrict,
        //             ward: record.senderAddressWard,
        //         });
        //         return (
        //             <div className="italic">
        //                 <div>{`${province}, ${district}, ${ward}`}</div>
        //                 <div>{record.senderAddressDescription}</div>
        //             </div>
        //         );
        //     },
        // },
        {
            title: t('order.label.recipient'),
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
        // {
        //     title: t('order.label.recipientAddress'),
        //     dataIndex: "recipientAddress",
        //     key: "recipientAddress",
        //     render: (value, record) => {
        //         const { province, district, ward } = showAddressByKey({
        //             province: record.recipientAddressProvince,
        //             district: record.recipientAddressDistrict,
        //             ward: record.recipientAddressWard,
        //         });
        //         return (
        //             <div className="italic">
        //                 <div>{`${province}, ${district}, ${ward}`}</div>
        //                 <div>{record.recipientAddressDescription}</div>
        //             </div>
        //         );
        //     },
        // },
        {
            title: t("order.label.review_comment"),
            dataIndex: "review_comments",
            key: "review_comments",
            render: (value, record) => {
                return (
                    <div className="max-w-[240px]">
                        <ReviewAndComment
                            inTable={true}
                            data={record}
                        />
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

    return (
        <div className="">
            <div className="flex items-center justify-between pb-2">
                <Input.Search
                    className="max-w-[240px]"
                    placeholder={t('label.searchPlaceholder')}
                    value={searchTextInput}
                    onChange={(e) => {
                        setSearchTextInput(e.target.value)
                    }}
                />
                <OrderFilterBtn
                    filters={filters}
                    onChangeFilter={(filterNext) => {
                        setData(prev => ({
                            ...prev,
                            filters: filterNext,
                            page: 0,
                            items: [],
                        }))
                    }}
                />
            </div>
            <Table
                dataSource={items.map(item => ({
                    ...item,
                    key: item._id
                }))}
                columns={columns}
                scroll={{ x: true, y: 'calc(100vh - 320px)' }}
                pagination={false}
                loading={loading}
                expandable={{
                    expandedRowRender: (record) => <OrderRowDetail data={record} onSuccess={() => {
                        setData(prev => ({
                            ...prev,
                            page: 0
                        }))
                    }}/>,
                }}
            />
        </div>
    );
};
export default OrderList;
