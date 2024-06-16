import style from "../../styles/MainProfile.module.css"
import {useEffect, useState} from "react";
import {client} from "../../lib/client";
import {useNavigate} from "react-router-dom";

function UserSkills({user, showingUser}) {
    const [prices, setPrices] = useState([])
    const navigate = useNavigate ()

    function getPriceSkillsUser() {
        if (!user.id){
            return
        }

        client.get(`api/v1/user/getPriceSkills?userId=${showingUser ? showingUser.id : user.id}`)
            .then(function (response) {
                setPrices(response.data)
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    useEffect(()=>{
        getPriceSkillsUser()
    },[user, showingUser])

    function handleOrderService(skill){
        if (user.id){
            client.post(`api/v1/user/order`,{"skillId":parseInt(skill.id),"toUser":parseInt(showingUser.id)})
                .then(function (response) {
                    navigate(`/chat/${showingUser.username}/${skill.name}/${response.data.chatId}`)
                })
                .catch(function (error) {
                    console.log(error)
                })
        }else {
            navigate("/login")
        }
    }

    const showUser = (showingUser ? showingUser : user)

    return (
        <div className={style.userSkills}>
            {   showUser.skills ? showUser.skills.map((skill) => {
                const priceInfo = prices.find((price) => price.SkillId.toString() === skill.id)
                return (
                    <div key={skill.id} className={style.skill}>
                        <div className={style.skillData}>
                            <h4>{skill.name}</h4>
                            <h4>Price: {priceInfo ? priceInfo.Price : 'Loading...'}</h4>
                        </div>
                        {user.id !== showUser.id ? <button onClick={(e)=>{handleOrderService(skill)}}>Order a service</button>: null}
                    </div>
                )
            }) : null}
        </div>
    )
}

export default UserSkills
