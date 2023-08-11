import React, { useEffect, useState } from "react";
import ClientList from "../home/ClientList";
import { useLocation, useParams } from "react-router-dom";
import ChatBox from "./ChatBox";
const AdminChat = (props) => {
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const roomId = queryParams.get("roomId");
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
    }, [roomId]);
    useEffect(() => {
        if (loading) setLoading(false);
    }, [loading]);
    return (
        <div className="flex">
            <div className="pr-2 border-r border-r-gray-300">
                <ClientList />
            </div>
            <div className="flex-1 h-[calc(100vh-120px)] pl-2">
                {!loading && <ChatBox roomId={roomId} />}
            </div>
        </div>
    );
};
export default AdminChat;
