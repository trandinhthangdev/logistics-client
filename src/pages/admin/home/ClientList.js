import React, { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { Table, Input } from "antd";
import { FaEye } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import CLientItem from "./ClientItem";
const pageSize = 10;
const ClientList = (props) => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        items: [],
        page: 0,
        searchText: "",
        hasMore: true,
        loading: true,
    });
    const { items, page, searchText, hasMore, loading } = data;

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

    const getData = () => {
        if (!page) return;
        setData((prev) => ({
            ...prev,
            loading: true,
        }));
        axios
            .get(
                `/api/users?page=${page}&limit=${pageSize}&search=${searchText.trim()}`
            )
            .then((res) => {
                console.log(res.data);
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
            title: "",
            dataIndex: "name",
            key: "name",
            render: (value, record, index) => {
                console.log("record", record);
                return <CLientItem name={record.name} uid={record.uid} />;
            },
        },

        // {
        //     title: "",
        //     dataIndex: "action",
        //     key: "action",
        //     render: (value, record, index) => {
        //         return (
        //             <Link to={`/detail-order/${record.orderNumber}`}>
        //                 <div className="cursor-pointer p-2 rounded-md text-white bg-amber-600">
        //                     <FaEye />
        //                 </div>
        //             </Link>
        //         );
        //     },
        // },
    ];
    console.log("items", items);
    return (
        <div className="max-w-[360px]">
            <Input.Search
                placeholder="Search..."
                enterButton="Search"
                value={searchText}
                onChange={(e) => {
                    setData((prev) => ({
                        ...prev,
                        searchText: e.target.value,
                    }));
                }}
                onSearch={handleSearch}
            />
            <Table
                dataSource={items}
                columns={columns}
                scroll={{ x: true, y: 300 }}
                pagination={false}
                onRow={(record) => ({
                    onClick: () => {
                        navigate(`/admin/chat?roomId=${record.uid}`);
                    },
                })}
            />
            {loading && <div>loading</div>}
        </div>
    );
};
export default ClientList;
