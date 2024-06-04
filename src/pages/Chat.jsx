import style from "../styles/Chat.module.css"
import {useParams} from "react-router-dom";
import {client} from "../lib/client";
import {useEffect, useState} from "react";

function Chat() {
    const { toUserName, skill, chatID } = useParams()
    const [user, setUser] = useState({})
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState("")

    function getUser() {
        client.get("api/v1/user/getUser")
            .then(function (response) {
                setUser(response.data)
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    function getMessages() {
        client.get(`api/v1/user/skillChatMessages?chatId=${chatID}`)
            .then(function (response) {
                console.log(response.data)
                setMessages(response.data)
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    useEffect(()=>{
        getUser()
        getMessages()
    }, [])

    function handleSendMessage(){
        console.log(message)
    }

    return (
        <div className={style.chat}>
            <header>
                <h1>{toUserName}</h1>
                <h2>{skill}</h2>
            </header>
            <main>
                <div className={style.messages}></div>

                <input onChange={(e)=>{setMessage(e.target.value)}} type="text"/>
                <input onClick={handleSendMessage} type="submit"/>
            </main>
        </div>
    )
}

export default Chat;
