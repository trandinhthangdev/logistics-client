import {IoMdClose} from "react-icons/io";
import React, {useContext, useEffect, useState} from "react";
import {collection, getFirestore, limit, onSnapshot, orderBy, query, where} from "firebase/firestore";
import {AppContext} from "../../contexts/AppContext";
import {app} from "../../firebase.config";
import { BsFillChatTextFill } from "react-icons/bs";

const db = getFirestore(app);

const ChatNoti = (props) => {
    const { user, loadingUser } = useContext(AppContext);
    const [countNoti, setCountNoti] = useState(0);
    const [checkNoti, setCheckNoti] = useState(false);

    // useEffect(() => {
    //     if (!user) return;
    //     const q = query(collection(db, 'messages'), where('roomId','==', user.uid),orderBy('timestamp', 'desc'), limit(1))
    //     const unsubscribe = onSnapshot(q, snapshot => {
    //         const data = snapshot.docs.map(doc => doc.data());
    //         if (checkNoti && data.length) {
    //             setCountNoti(prev => prev + 1)
    //         } else {
    //             setCheckNoti(true)
    //         }
    //     })
    //     return unsubscribe;
    // }, [user, checkNoti]);
    // console.log('countNoti',countNoti)
    return (
        <BsFillChatTextFill />
    )
    return (
        <div>
            {/*{countNoti > 0 && <div className="bg-red-500 text-white p-2 rounded-full font-bold text-lg">{countNoti}</div>}*/}
            <BsFillChatTextFill />
        </div>
    )
}

export default ChatNoti;
