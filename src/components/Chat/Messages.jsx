import style from "./../../styles/Chat.module.css"
import { useEffect, useRef, useState } from "react"

function Messages({ messages, user, getMessages, sendMessage }) {
    const [firstGetMessages, setFirstGetMessages] = useState(true)
    const messagesEndRef = useRef(null)
    const observer = useRef(null)

    useEffect(() => {
        if (firstGetMessages && messages.length > 0) {
            messagesEndRef.current.scrollIntoView()
            setFirstGetMessages(false)
        }
    }, [messages])

    useEffect(() => {
        // ToDo : not good work
        observer.current = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const message = entry.target;
                    const messageId = message.getAttribute("data-id")
                    const messageUserId = message.getAttribute("data-userid")

                    if (user.id.toString() !== messageUserId.toString() && !message.getAttribute("data-read")) {
                        sendMessage(JSON.stringify({"Type":"msgRead","Content":messageId}))
                        message.setAttribute("data-read", true)
                    }
                }
            })
        })

        return () => {
            observer.current.disconnect()
        };
    }, [sendMessage, user.id])

    useEffect(() => {
        messages.forEach((m) => {
            const messageElement = document.getElementById(`message-${m.id}`)
            if (messageElement) {
                observer.current.observe(messageElement)
            }
        })
    }, [messages])

    const handleScrollMessages = (e) => {
        if (e.target.scrollTop < 150) {
            getMessages()
        }
    }

    return (
        <div className={style.messages} onScroll={handleScrollMessages}>
            {messages.map((m, i) => (
                <div
                    id={`message-${m.id}`}
                    data-id={m.id}
                    data-userid={m.userId}
                    data-read={m.read}
                    className={user.id.toString() === m.userId.toString() ? style.messageUser : style.messageFriend}
                    key={i}
                >
                    <p>
                        <svg className={style.checkmark} viewBox="0 0 24 24">
                            <polyline points="2 11 6 20 15 4" />
                            {m.read ? <polyline points="9 16 11 20 20 4" /> : null}
                        </svg>
                        {m.message}
                        <br />
                        <time>{m.createdAt.slice(11, 19)}</time>
                    </p>
                </div>
            ))}
            <div ref={messagesEndRef} />
        </div>
    );
}

export default Messages
