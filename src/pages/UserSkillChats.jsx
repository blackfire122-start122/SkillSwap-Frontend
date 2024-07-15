import {baseURL, client} from "../lib/client"
import {useEffect, useState} from "react"
import style from "../styles/UserSkillChats.module.css"
import {Link, useNavigate} from "react-router-dom";
import userImage from "../images/user.png";

function UserSkillChats() {
    const [user, setUser] = useState({})
    const [customerSkillChats, setCustomerSkillChats] = useState([])
    const [performerSkillChats, setPerformerSkillChats] = useState([])

    const navigate = useNavigate()

    function getUser() {
        client.get("api/v1/user/getUser")
            .then(function (response) {
                setUser(response.data)
            })
            .catch(function (error) {
                if (error.response.status === 401){
                    navigate("/login")
                }
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
            <div className={style.chatsContainer}>
                <h1 className={style.descriptionSkillChats}>Customer Skill Chat <p>work for me</p></h1>
                {customerSkillChats.map((customerSkillChat)=>(
                    <Link
                        to={`/chat/${customerSkillChat.performer.Username}/${customerSkillChat.skill.name}/${customerSkillChat.id}`}
                        className={style.skillChat}
                        key={customerSkillChat.id}
                    >
                        <h3>
                            <span>{customerSkillChat.skill.name}</span>
                            <span>{customerSkillChat.performer.Username}</span>
                        </h3>
                    </Link>
                ))}
            </div>

            <div className={style.verticalLine}></div>

            <div className={style.chatsContainer}>
                <h1 className={style.descriptionSkillChats}>Performer Skill Chat <p>Me need do</p></h1>
                {performerSkillChats.map((performerSkillChat)=>(
                    <Link
                        to={`/chat/${performerSkillChat.customer.Username}/${performerSkillChat.skill.name}/${performerSkillChat.id}`}
                        className={style.skillChat}
                        key={performerSkillChat.id}
                    >
                        <h3>
                            <span>{performerSkillChat.skill.name}</span>
                            <span>{performerSkillChat.customer.Username}</span>
                        </h3>
                    </Link>
                ))}
            </div>
            <Link className={style.btnToProfile} to={"/profile/"+user.username}>
                <img src={user.image ? baseURL+"api/v1/user/image/"+user.image : userImage} alt="User image" className={style.image} />
            </Link>
        </div>
    )
}

export default UserSkillChats
