import {client} from "../lib/client"
import {useEffect, useState} from "react"
import style from "../styles/UserSkillChats.module.css"
import {Link} from "react-router-dom";

function UserSkillChats() {
    const [user, setUser] = useState({})
    const [customerSkillChats, setCustomerSkillChats] = useState([])
    const [performerSkillChats, setPerformerSkillChats] = useState([])

    function getUser() {
        client.get("api/v1/user/getUser")
            .then(function (response) {
                setUser(response.data)
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    function getCustomerSkillChats() {
        client.get("api/v1/user/customerSkillChats")
            .then(function (response) {
                setCustomerSkillChats(response.data)
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    function getPerformerSkillChats() {
        client.get("api/v1/user/performerSkillChats")
            .then(function (response) {
                setPerformerSkillChats(response.data)
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    useEffect(()=>{
        getUser()
        getCustomerSkillChats()
        getPerformerSkillChats()
    }, [])

    return (
        <div className={style.skillChats}>
            <div>
                <h1>Customer Skill Chat</h1>
                {customerSkillChats.map((customerSkillChat)=>(
                    <Link
                        to={`/chat/${customerSkillChat.performer.Username}/${customerSkillChat.skill.name}/${customerSkillChat.id}`}
                        className={style.skillChat}
                        key={customerSkillChat.id}
                    >
                        <h3>{customerSkillChat.skill.name}</h3>
                    </Link>
                ))}
            </div>

            <div>
                <h1>Performer Skill Chat</h1>
                {performerSkillChats.map((performerSkillChat)=>(
                    <Link
                        to={`/chat/${performerSkillChat.customer.Username}/${performerSkillChat.skill.name}/${performerSkillChat.id}`}
                        className={style.skillChat}
                        key={performerSkillChat.id}
                    >
                        <h3>{performerSkillChat.skill.name}</h3>
                    </Link>
                ))}
            </div>

        </div>
    )
}

export default UserSkillChats
