import React, {useCallback, useContext, useEffect, useRef, useState} from "react";
import axios from "axios";
import {Table, Input} from "antd";
import {FaEye, FaPlus, FaShippingFast} from "react-icons/fa"
import {Link} from "react-router-dom";
import {debounce} from "lodash";
import {AppContext} from "../../contexts/AppContext";
import {BiLogIn} from "react-icons/bi";
const pageSize = 10;
const Home = (props) => {
    const { user, setIsAuthModal } = useContext(AppContext);
    const [searchTextInput, setSearchTextInput] = useState("")
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
            }).catch(err => {
            console.log('err',err)
        })
    }

    const handleSearch = () => {
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
    return <div className="flex flex-col items-center">
        <div className="font-bold text-2xl">
            TDT Logistics
        </div>
        <div className="max-w-[1200px]">
            Discover seamless logistics at its best with TDT Logistics. Streamline your supply chain with our expert transportation management, state-of-the-art warehousing, and supply chain consulting services. Our platform offers real-time tracking, customs expertise, and technology integration for optimal efficiency. Trust in our reliability, global reach, and customer-centric approach to elevate your business operations. Experience the power of tailored solutions that adapt to your needs while benefiting from our industry insights. Choose TDT Logistics today and revolutionize your logistics experience.
        </div>
        {
            user
            ?
                <>
                    <div className="flex justify-center p-2">
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
                    </div>
                    <Table
                        dataSource={items}
                        columns={columns}
                        scroll={{ x: true, y: '100%' }}
                        pagination={false}
                        loading={loading}
                    />
                </>
                :
                <div className="p-4">
                    <div onClick={() => {
                        setIsAuthModal(true);
                    }} className="flex items-center justify-center cursor-pointer p-2 rounded-md text-white bg-amber-600 mr-4">
                        <div className="mr-1">Login</div>
                        <BiLogIn />
                    </div>
                </div>
        }
    </div>;
};
export default Home;
