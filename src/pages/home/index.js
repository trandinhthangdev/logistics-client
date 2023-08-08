import React, {useCallback, useEffect, useRef, useState} from "react";
import axios from "axios";
import {Table, Input} from "antd";
import {FaEye} from "react-icons/fa"
import {Link} from "react-router-dom";
const pageSize = 10;
const Home = (props) => {
    const [data, setData] = useState({
        items: [],
        page: 0,
        searchText: '',
        hasMore: true,
        loading: true
    })
    const {
        items,
        page,
        searchText,
        hasMore,
        loading
    } = data;

    useEffect(() => {
        if (!page) {
            setData(prev => ({
                ...prev,
                page: 1
            }))
            return;
        }
        getData()
    }, [page]);

    const getData = () => {
        if (!page) return;
        setData(prev => ({
            ...prev,
            loading: true
        }))
        axios.get(`/api/orders?page=${page}&limit=${pageSize}&search=${searchText.trim()}`)
            .then(res => {
                console.log(res.data)
                setData(prev => ({
                    ...prev,
                    items: page === 1 ? res.data : [...prev.items, ...res.data],
                    hasMore: res.data.length === pageSize,
                    loading: false
                }))
            })
    }

    const handleSearch = () => {
        console.log('handleSearch',searchText)
        setData(prev => ({
            ...prev,
            page: 0
        }))
    }
    const observer = useRef()
    const lastEndRef = useCallback(node => {
        if (loading) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setData( prev => {
                    return ({
                        ...prev,
                        page: prev.page + 1,
                    })
                })
            }
        })
        if (node) observer.current.observe(node)
    }, [loading, hasMore])

    const columns = [
        {
            title: 'Order Number',
            dataIndex: 'orderNumber',
            key: 'orderNumber',
        },
        {
            title: 'Sender',
            dataIndex: 'senderInfo',
            key: 'senderInfo',
            render:(value, record) => {
                return <div>
                    <div>{record.senderName}</div>
                    <div>{record.senderPhone}</div>
                </div>
            }
        },
        {
            title: 'Sender Address',
            dataIndex: 'senderAddress',
            key: 'senderAddress',
            render:(value, record) => {
                const province = JSON.parse(record.senderAddressProvince)?.name ?? ""
                const district = JSON.parse(record.senderAddressDistrict)?.name ?? ""
                const ward = JSON.parse(record.senderAddressWard)?.name ?? ""
                return <div>
                    <div>{`${province}, ${district}, ${ward}`}</div>
                    <div>{record.senderAddressDescription}</div>
                </div>
            }
        },
        {
            title: 'Recipient',
            dataIndex: 'recipientInfo',
            key: 'recipientInfo',
            render:(value, record) => {
                return <div>
                    <div>{record.recipientName}</div>
                    <div>{record.recipientPhone}</div>
                </div>
            }
        },
        {
            title: 'Recipient Address',
            dataIndex: 'recipientAddress',
            key: 'recipientAddress',
            render:(value, record) => {
                const province = JSON.parse(record.recipientAddressProvince)?.name ?? ""
                const district = JSON.parse(record.recipientAddressDistrict)?.name ?? ""
                const ward = JSON.parse(record.recipientAddressWard)?.name ?? ""
                return <div>
                    <div>{`${province}, ${district}, ${ward}`}</div>
                    <div>{record.recipientAddressDescription}</div>
                </div>
            }
        },
        {
            title: '',
            dataIndex: 'action',
            key: 'action',
            render:(value, record, index) => {
                if (index === items.length - 1) {
                    return (
                        <div ref={lastEndRef}>
                            <Link to={`/detail-order/${record.orderNumber}`}>
                                <div className="cursor-pointer p-2 rounded-md text-white bg-amber-600">
                                    <FaEye />
                                </div>
                            </Link>
                        </div>
                    )
                }
                return (
                 <Link to={`/detail-order/${record.orderNumber}`}>
                     <div className="cursor-pointer p-2 rounded-md text-white bg-amber-600">
                         <FaEye />
                     </div>
                 </Link>
                )
            }
        },
    ];
    console.log('items', items)
    return <div className="">
        <Input.Search
            placeholder="Search..."
            enterButton="Search"
            value={searchText}
            onChange={(e) => {
                setData(prev => ({
                    ...prev,
                    searchText: e.target.value
                }))
            }}
            onSearch={handleSearch}
        />
        <Table
            dataSource={items}
            columns={columns}
            scroll={{ x: true, y: 300 }}
            pagination={false}
        />
        {loading && <div>
            loading
        </div>}
    </div>;
};
export default Home;
