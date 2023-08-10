import {doc, setDoc, getFirestore, getDoc, where, onSnapshot, collection, addDoc, orderBy, query, serverTimestamp} from "firebase/firestore"
import {IoMdClose} from "react-icons/io"
import { Input, Tooltip } from 'antd';
import {MdEmojiEmotions, MdSend} from "react-icons/md"
import moment from "moment";
import {useContext, useEffect, useRef, useState} from "react";
import {AppContext} from "../../contexts/AppContext";
import EmojiBtn from "../../components/EmojiBtn";
import {app} from "../../firebase.config";

const db = getFirestore(app);

const LiveChat = (props) => {
    const {
        onClose
    } = props;
    const boxRef = useRef(null);
    const { user, loadingUser } = useContext(AppContext);
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState("")
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            onSendMessage()
        }
    };
    useEffect(() => {
        // Function to scroll to the bottom of the box
        const scrollToBottom = () => {
            if (boxRef.current) {
                boxRef.current.scrollTop = boxRef.current.scrollHeight;
            }
        };

        // Call the scrollToBottom function whenever 'messages' prop changes
        scrollToBottom();
    }, [messages]);
    const onSendMessage = async () => {
        if (!user) return;
        if (messageInput.trim() === "") return;
        const messageInputTemp = messageInput.trim();
        setMessageInput("")
        await addDoc(collection(db, 'messages'), {
            roomId: user.uid,
            isAdmin: false,
            displayName: '',
            text: messageInputTemp,
            timestamp: serverTimestamp()
        })
    }
    useEffect(() => {
        if (!user) return;
        const q = query(collection(db, 'messages'), where('roomId','==', user.uid),orderBy('timestamp'))
        const unsubscribe = onSnapshot(q, snapshot => {
            setMessages(snapshot.docs.map(doc => doc.data()))
        })
        return unsubscribe;
    }, []);
    console.log('messages', messages)

    return <div className="fixed bottom-2 right-[60px] w-[400px] max-w-[calc(100vw-80px)] h-[480px] max-h-[calc(100vh-80px)] bg-white z-[999] shadow-2xl rounded-md p-2 flex flex-col">
        <div className="flex items-center p-2">
            <div className="font-bold flex-1 text-xl">
                Chat with us
            </div>
            <div className="text-xl hover:text-blue-600 cursor-pointer" onClick={() => onClose()}>
                <IoMdClose />
            </div>
        </div>
        <div className="p-2 flex-1 h-[calc(100%-100px)]">
            <div className="h-full border border-gray-100 p-2 overflow-y-auto" ref={boxRef}>
                {
                    messages.map((item, index) => {
                        return (
                                <div className={`p-2 flex ${item.isAdmin ? 'justify-start' : 'justify-end'}`}>
                                    <Tooltip title={moment(item.createdAt).format('LLL')}>
                                    <div className={`rounded-2xl p-2 ${item.isAdmin ? 'bg-gray-100 text-gray-800' : 'bg-blue-600 text-white'}`}>
                                        {item.text}
                                    </div>
                                    </Tooltip>

                                </div>
                        )
                    })
                }
            </div>
        </div>
        <div>
         <Input
                        placeholder="Enter your message"
                        prefix={<EmojiBtn onAddEmoji={(value) => {
                            setMessageInput(prev => prev + value)
                        }}/>}
                        value={messageInput}
                        onChange={(event) => {
                            setMessageInput(event.target.value)
                }}
                        onKeyPress={handleKeyPress}
                suffix={
                    <Tooltip title="Send">
                        <div className="cursor-pointer text-blue-600" onClick={() => onSendMessage()}>
                            <MdSend />
                        </div>
                    </Tooltip>
                }
            />
        </div>
    </div>;
};

export default LiveChat;
