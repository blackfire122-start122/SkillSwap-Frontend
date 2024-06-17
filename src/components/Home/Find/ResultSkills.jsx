import style from "../../../styles/Find.module.css"
import skillImage from "../../../images/skill.png";
import {client} from "../../../lib/client";
import ResultUsers from "./ResultUsers";
import {useState} from "react";

function ResultSkills({skills}) {
    const [usersOnSkills, setUsersOnSkills] = useState(null)
    const [usersOnSkillsId, setUsersOnSkillsId] = useState(null)

    function handleSkillClick(skill){
        client.get(`api/v1/findUsersOnSkill?skillId=${skill.id}`)
            .then(function (response) {
                setUsersOnSkills(response.data)
                setUsersOnSkillsId(skill.id)
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    return (
        <>
            {skills ? skills.map((skill)=>(
                <div key={skill.id}>
                    <div className={style.skill} onClick={()=>{handleSkillClick(skill)}}>
                        <div className={style.imageContainer}>
                            <img className={style.skillImage} src={skillImage} alt="skill"/>
                        </div>
                        <h3>{skill.name}</h3>
                    </div>
                    {usersOnSkillsId===skill.id ? <ResultUsers users={usersOnSkills} /> : null}
                </div>
                )) : null}
        </>
    )
}

export default ResultSkills
