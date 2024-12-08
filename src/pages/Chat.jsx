import style from "../styles/Chat.module.css"
import {useNavigate, useParams} from "react-router-dom";
import {baseURL, client} from "../lib/client";
import {useEffect, useState, useCallback, useRef} from "react";
import useWebSocket from "react-use-websocket";
import Messages from "../components/Chat/Messages";
import InputMessage from "../components/Chat/InputMessge";
import Header from "../components/Chat/Header";
import {string} from "prop-types";

function Chat() {
    const { toUserName, skill, chatID } = useParams();
    const [user, setUser] = useState(null);
    const [toUser, setToUser] = useState(null);
    const [chat, setChat] = useState({});
    const [messages, setMessages] = useState([]);
    const [statuses, setStatuses] = useState([]);
    const [countMessages, setCountMessages] = useState(0);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate ()
    const selectRef = useRef(null)

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
                if (error.response){
                    if (error.response.status === 403){
                        navigate("/")
                    }
                }
                setLoading(false)
            })
    }

    function getChat(){
        client.get(`api/v1/user/getChat?chatId=${chatID}`)
            .then(response => {
                setChat(response.data)
            })
            .catch(error => {
                console.log(error)
                // if (error.response.status === 403){
                //     navigate("/")
                // }
                // setLoading(false)
            })
    }

    function getUserData() {
        // ToDo: very many not needed data
        client.get("api/v1/user/getUserData/"+toUserName)
            .then(function (response) {
                setToUser(response.data)
            })
            .catch(function (error) {
                if (!error.response){
                    console.log(error)
                    return
                }
                if(error.response.status === 404){
                    console.log(404)
                }else {
                    console.log(error)
                }
            })
    }

    function getStatuses(){
        client.get(`api/v1/chat/getStatuses`)
            .then(response => {
                setStatuses(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    useEffect(() => {
        getUser();
        getChat();
        getMessages();
        getStatuses()
        getUserData()
    }, []);

    useEffect(() => {
        if (lastMessage !== null) {
            const data = JSON.parse(lastMessage.data)
            if (data.type === "msg") {
                if (data.content.indexRedis){
                    data.content.id = "indexRedis"+data.content.indexRedis
                }
                setMessages(prevMessages => [...prevMessages, data.content])
                setCountMessages(prevCount => prevCount + 1)
            }
            else if (data.type === "changeStatus") {
                if (selectRef.current) {
                    selectRef.current.value = data.content
                    const updatedChat = { ...chat, status: statuses.find((status) => status.id === parseInt(data.content)).status }
                    setChat(updatedChat)
                }
            } else if (data.type === "msgRead") {
                setMessages(prevMessages => {
                    console.log(data.content)
                    let msgRead = prevMessages[prevMessages.findIndex((m)=>(m.id.toString()===data.content))]

                    if (msgRead){
                        msgRead.read = true
                    }

                    return prevMessages
                })
            }
        }
    }, [lastMessage]);

    return (
        <div className={style.chat}>
            {toUser ? <Header sendMessage={sendMessage} toUser={toUser} chat={chat} skill={skill} statuses={statuses} selectRef={selectRef}/> : null}
            <main>
                {user ? <Messages messages={messages} user={user} getMessages={getMessages} sendMessage={sendMessage} />: null}
                <InputMessage sendMessage={sendMessage}/>
            </main>
        </div>
    );
}

export default Chat;
