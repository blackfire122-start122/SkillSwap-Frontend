import {client} from "../../lib/client"
import {useEffect, useState} from "react"
import style from "../../styles/ChangeData.module.css";

function FindSkill({selectedSkills, setSelectedSkills}) {
    const [skills, setSkills] = useState([])

    function handleFindSkill(find){
        client.get(`api/v1/findSkills?skillName=${encodeURIComponent(find)}`)
            .then(function (response) {
                setSkills(response.data)
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    useEffect(()=>{
        handleFindSkill("")
    },[])

    function handleSelectChange(event) {
        const options = event.target.options;
        const selectedValues = [];
        for (const option of options) {
            if (option.selected) {
                selectedValues.push(option.value);
            }
        }
        setSelectedSkills(selectedValues);
    }

    return (
        <label>
            Skills:
            <input
                type="text"
                className={style.input}
                placeholder="Find skill"
                onChange={(e)=>{handleFindSkill(e.target.value)}}
            />
            <select onChange={handleSelectChange} value={selectedSkills} className={style.select} multiple name="Skills">
                {skills.map((skill)=>(
                    <option key={skill.id} value={skill.id}>{skill.name}</option>
                ))}
            </select>
        </label>
    )
}

export default FindSkill
