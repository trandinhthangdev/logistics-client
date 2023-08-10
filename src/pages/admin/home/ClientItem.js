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

const db = getFirestore(app);

const CLientItem = (props) => {
    const { uid, name } = props;
    console.log("uid", uid);
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
        <div>
            <div>{name}</div>
            {newMessage && <div>{newMessage.text}</div>}
        </div>
    );
};

export default CLientItem;
