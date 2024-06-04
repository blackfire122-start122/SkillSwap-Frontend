import style from "../../styles/ChangeData.module.css";
import {client} from "../../lib/client";
import {useEffect, useState} from "react";

function PricesSkills({skills, selectedSkills, prices, setPrices, userId}) {
    const [pricesSkillsUser, setPricesSkillsUser] = useState([])

    function handlePrice(e,id){
        let data = prices
        data[id] = parseInt(e.target.value)
        setPrices(data)
    }

    function getPriceSkillsUser() {
        client.get(`api/v1/user/getPriceSkills?userId=${userId}`)
            .then(function (response) {
                setPricesSkillsUser(response.data)
                let data = prices
                for (let i = response.data.length-1; i >= 0; i--) {
                    data[response.data[i].SkillId] = parseInt(response.data[i].Price)
                }
                setPrices(data)
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    useEffect(()=>{
        getPriceSkillsUser()
    },[])

    function defValInp (skill){
        let ps = pricesSkillsUser.find((ps)=>{return ps.SkillId.toString() === skill.id})
        if (ps){
            return ps.Price
        }
        return 0
    }

    return (
        <label>
            Set prices skills:
                {selectedSkills.map((skill)=> {
                    skill = skills.find((s)=>{
                        return skill === s.id
                    })
                    return (
                        <div className={style.priceSkill} key={skill.id}>
                            <p>{skill.name}</p>
                            <input defaultValue={defValInp(skill)} onChange={(e)=>{handlePrice(e,skill.id)}} className={style.inputPrice} type="number"/>
                        </div>
                    )
                })}
        </label>
    )
}

export default PricesSkills
