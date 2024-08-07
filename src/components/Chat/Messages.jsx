import style from "./../../styles/Chat.module.css"
import {useEffect, useRef, useState} from "react";


function Messages({messages, user, getMessages }) {
    const [firstGetMessages, setFirstGetMessages] = useState(true);
    const messagesEndRef = useRef(null);

    useEffect(()=>{
        if (firstGetMessages && messages.length > 0) {
            messagesEndRef.current.scrollIntoView();
            setFirstGetMessages(false)
        }
    },[messages])

    const handleScrollMessages = (e) => {
        if (e.target.scrollTop < 150) {
            getMessages()
        }
    };

    return (
        <div className={style.messages} onScroll={handleScrollMessages}>
            {messages.map((m, i) => (
                <div className={user.id.toString() === m.userId.toString() ? style.messageUser : style.messageFriend} key={i}>
                    <p>{m.message}
                        <br/>
                        <time>{m.createdAt.slice(11,19)}</time>
                    </p>
                </div>
            ))}
            <div ref={messagesEndRef} />
        </div>
    )
}

export default Messages
