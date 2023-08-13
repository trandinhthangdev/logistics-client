import React, { useEffect, useState } from "react";
import {
    doc,
    setDoc,
    getFirestore,
    getDoc,
    where,
    onSnapshot,
    collection,
    addDoc,
    orderBy,
    query,
    serverTimestamp,
    limit,
} from "firebase/firestore";
import { app } from "../../../firebase.config";
import {useLocation} from "react-router-dom";
import {Tooltip} from "antd";
import {useTranslation} from "react-i18next";

const db = getFirestore(app);

const ClientItem = (props) => {
    const {t} = useTranslation();
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const roomId = queryParams.get("roomId");
    const { uid, name } = props;
    const [newMessage, setNewMessage] = useState(null);
    useEffect(() => {
        const q = query(
            collection(db, "messages"),
            where("roomId", "==", uid),
            orderBy("timestamp", "desc"),
            limit(1)
        );
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const docs = snapshot.docs.map((doc) => doc.data());
            if (docs.length) {
                setNewMessage(docs[0]);
            }
        });
        return unsubscribe;
    }, [uid]);
    return (
        <Tooltip title={t('chat.goToChat')}>
            <div className={`cursor-pointer p-2 ${roomId === uid ? 'bg-gray-200' : ''}`}>
                <div className="font-bold">{name}</div>
                {newMessage &&
                    <div>
                        <div className="italic text-sm">{newMessage.text}</div>
                    </div>}
            </div>
        </Tooltip>
    );
};

export default ClientItem;
