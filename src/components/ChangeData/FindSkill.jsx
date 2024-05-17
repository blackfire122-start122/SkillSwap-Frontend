import {client} from "../../lib/client"
import { useState} from "react"
import style from "../../styles/ChangeData.module.css";

function FindSkill() {
    const [skills, setSkills] = useState([])

    function handleFindSkill(e){
        client.get(`api/v1/findSkills?skillName=${encodeURIComponent(e.target.value)}`)
            .then(function (response) {
                setSkills(response.data)
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    return (
        <label>
            Skills:
            <input
                type="text"
                className={style.input}
                placeholder="Find skill"
                onChange={(e)=>{handleFindSkill(e)}}
            />
            <select className={style.select} multiple name="Skills">
                {skills.map((skill)=>(
                    <option key={skill.id} value={skill.id}>{skill.name}</option>
                ))}
            </select>
        </label>
    )
}

export default FindSkill
