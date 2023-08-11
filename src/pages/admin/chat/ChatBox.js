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
} from "firebase/firestore";
import { IoMdClose } from "react-icons/io";
import { Input, Tooltip } from "antd";
import { MdEmojiEmotions, MdSend } from "react-icons/md";
import moment from "moment";
import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../../contexts/AppContext";
import EmojiBtn from "./../../../components/EmojiBtn";
import { app } from "../../../firebase.config";
import axios from "axios";

const db = getFirestore(app);

const ChatBox = (props) => {
    const { onClose, roomId } = props;
    const boxRef = useRef(null);
    const {  loadingUser } = useContext(AppContext);
    const [user, setUser] = useState(null)
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState("");

    useEffect(() => {
        axios.get(`/api/users/${roomId}`)
            .then(res => {
                setUser(res.data)
            })
            .catch(err => {
                console.log('err',err)
            })
    }, []);
    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            onSendMessage();
        }
    };
    useEffect(() => {
        const scrollToBottom = () => {
            if (boxRef.current) {
                boxRef.current.scrollTop = boxRef.current.scrollHeight;
            }
        };

        scrollToBottom();
    }, [messages]);
    const onSendMessage = async () => {
        if (messageInput.trim() === "") return;
        const messageInputTemp = messageInput.trim();
        setMessageInput("");
        await addDoc(collection(db, "messages"), {
            roomId: roomId,
            isAdmin: true,
            displayName: "",
            text: messageInputTemp,
            timestamp: serverTimestamp(),
        });
    };
    useEffect(() => {
        const q = query(
            collection(db, "messages"),
            where("roomId", "==", roomId),
            orderBy("timestamp")
        );
        const unsubscribe = onSnapshot(q, (snapshot) => {
            console.log('A', snapshot.docs.length)
            setMessages(snapshot.docs.map((doc) => doc.data()));
        });
        return unsubscribe;
    }, []);

    return (
        <div className="h-full flex flex-col">
            <div className="flex items-center p-2">
                <div className="font-bold flex-1 text-xl">Chat with {user?.name ?? ""}</div>
            </div>
            <div className="p-2 flex-1 h-[calc(100%-100px)] flex flex-col justify-end">
                <div
                    className="max-h-full border border-gray-100 p-2 overflow-y-auto "
                    ref={boxRef}
                >
                    {messages.map((item, index) => {
                        return (
                            <div
                                className={`p-2 flex ${
                                    !item.isAdmin
                                        ? "justify-start"
                                        : "justify-end"
                                }`}
                            >
                                {/*<Tooltip*/}
                                {/*    title={moment(item.createdAt).format("LLL")}*/}
                                {/*>*/}
                                <div className={`flex flex-col ${
                                    !item.isAdmin
                                        ? "items-start"
                                        : "items-end"
                                }`}>
                                    <div
                                        className={`rounded-2xl p-2 text-md ${
                                            !item.isAdmin
                                                ? "bg-gray-100 text-gray-800"
                                                : "bg-blue-600 text-white"
                                        }`}
                                    >
                                        {item.text}
                                    </div>
                                    <div className="text-xs italic text-gray-400">
                                        {moment(item.createdAt).format("LLL")}
                                    </div>
                                </div>
                                {/*</Tooltip>*/}
                            </div>
                        );
                    })}
                </div>
            </div>
            <div>
                <Input
                    placeholder="Enter your message"
                    prefix={
                        <EmojiBtn
                            onAddEmoji={(value) => {
                                setMessageInput((prev) => prev + value);
                            }}
                        />
                    }
                    value={messageInput}
                    onChange={(event) => {
                        setMessageInput(event.target.value);
                    }}
                    onKeyPress={handleKeyPress}
                    suffix={
                        <Tooltip title="Send">
                            <div
                                className="cursor-pointer text-blue-600"
                                onClick={() => onSendMessage()}
                            >
                                <MdSend />
                            </div>
                        </Tooltip>
                    }
                />
            </div>
        </div>
    );
};

export default ChatBox;
