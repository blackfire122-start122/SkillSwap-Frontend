import style from "../../styles/MainProfile.module.css"
import {useEffect, useState} from "react";
import {client} from "../../lib/client";

function UserSkills({user}) {
    const [prices, setPrices] = useState([])

    function getPriceSkillsUser() {
        client.get("api/v1/user/getPriceSkills")
            .then(function (response) {
                setPrices(response.data)
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    useEffect(()=>{
        getPriceSkillsUser()
    },[])

    function handleOrderService(e){
        console.log("order")
    }

    return (
        <div className={style.userSkills}>
            {user.skills ? user.skills.map((skill) => {
                const priceInfo = prices.find((price) => price.SkillId.toString() === skill.id)
                return (
                    <div key={skill.id} className={style.skill}>
                        <div className={style.skillData}>
                            <h4>{skill.name}</h4>
                            <h4>Price: {priceInfo ? priceInfo.Price : 'Loading...'}</h4>
                        </div>
                        <button onClick={handleOrderService}>Order a service</button>
                    </div>
                )
            }) : null}
        </div>
    )
}

export default UserSkills
