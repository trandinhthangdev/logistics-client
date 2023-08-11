import React, { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import {Table, Input, Spin} from "antd";
import { Link, useNavigate } from "react-router-dom";
import ClientItem from "./ClientItem";
import {debounce} from "lodash"
const pageSize = 10;
const ClientList = (props) => {
    const navigate = useNavigate();
    const [searchTextInput, setSearchTextInput] = useState("")
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
                `/api/users?page=${page}&limit=${pageSize}&search=${searchText.trim()}`
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
            title: "",
            dataIndex: "name",
            key: "name",
            render: (value, record, index) => {
                if (index === items.length - 1) {
                    return <div ref={lastEndRef}>
                        <ClientItem name={record.name} uid={record.uid}/>
                    </div>;
                } else {
                    return <ClientItem name={record.name} uid={record.uid}/>;
                }
            },
        }
    ];
    return (
        <div className="w-[360px] max-md:w-[240px]">
            <Input.Search
                placeholder="Search..."
                value={searchTextInput}
                onChange={(e) => {
                    setSearchTextInput(e.target.value)
                }}
            />
            <Table
                className="[&_td]:p-2"
                dataSource={items}
                columns={columns}
                scroll={{ x: true, y: 'calc(100vh - 90px)' }}
                pagination={false}
                onRow={(record) => ({
                    onClick: () => {
                        navigate(`/admin/chat?roomId=${record.uid}`);
                    },
                })}
                loading={loading}
            />
        </div>
    );
};
export default ClientList;
