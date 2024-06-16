import style from "./../../styles/Chat.module.css"
import {useState} from "react"

function InputMessage({sendMessage}) {
    const [message, setMessage] = useState("")

    const handleSendMessage = (e) => {
        e.preventDefault()
        if (message.trim() !== "") {
            sendMessage(JSON.stringify({"Type":"msg","Content":message}))
            setMessage("")
        }
    }

    return (
        <div className={style.inputMessage}>
            <input
                className={style.inputMessageText}
                onChange={(e) => setMessage(e.target.value)}
                type="text"
                value={message}
                placeholder="Message"
            />
            <input
                onClick={handleSendMessage}
                type="submit"
            />
        </div>
    )
}

export default InputMessage
