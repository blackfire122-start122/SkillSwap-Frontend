import style from "../styles/Chat.module.css"
import {useParams} from "react-router-dom";
import {baseURL, client} from "../lib/client";
import {useEffect, useState, useCallback} from "react";
import useWebSocket from "react-use-websocket";
import Messages from "../components/Chat/Messages";
import InputMessage from "../components/Chat/InputMessge";

function Chat() {
    const { toUserName, skill, chatID } = useParams();
    const [user, setUser] = useState({});
    const [messages, setMessages] = useState([]);
    const [countMessages, setCountMessages] = useState(0);
    const [loading, setLoading] = useState(false);

    const { sendMessage, lastMessage, readyState } = useWebSocket(baseURL + "chat/" + chatID);

    const getUser = useCallback(() => {
        client.get("api/v1/user/getUser")
            .then(response => {
                setUser(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    function getMessages(){
        if (loading) return
        setLoading(true)
        client.get(`api/v1/user/skillChatMessages?chatId=${chatID}&countMessages=${countMessages}`)
            .then(response => {
                let messagesData = response.data.reverse()
                setMessages(prevMessages => [...messagesData, ...prevMessages]);
                setCountMessages(prevCount => prevCount + messagesData.length);
                setLoading(false)
            })
            .catch(error => {
                console.log(error)
                setLoading(false)
            })
    }

    useEffect(() => {
        getUser();
        getMessages();
    }, []);

    useEffect(() => {
        if (lastMessage !== null) {
            const data = JSON.parse(lastMessage.data);
            if (data.type === "msg") {
                setMessages(prevMessages => [...prevMessages, data.content]);
                setCountMessages(prevCount => prevCount + 1);
            }
        }
    }, [lastMessage]);

    return (
        <div className={style.chat}>
            <header>
                <h1>{toUserName}</h1>
                <h2>{skill}</h2>
            </header>
            <main>
                <Messages messages={messages} user={user} getMessages={getMessages} />
                <InputMessage sendMessage={sendMessage}/>
            </main>
        </div>
    );
}

export default Chat;
