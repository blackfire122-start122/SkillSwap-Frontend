import {client} from "../../lib/client"
import {useEffect} from "react"
import style from "../../styles/ChangeData.module.css";

function FindSkill({skills, setSkills,
                       selectedSkills, setSelectedSkills,
                       prices, setPrices}) {
    function handleFindSkill(find){
        client.get(`api/v1/findSkills?skillName=${encodeURIComponent(find)}`)
            .then(function (response) {
                let newSkills = []

                for (let i = skills.length-1; i>=0; i--) {
                    if (selectedSkills.includes(skills[i].id)){
                        newSkills.push(skills[i])
                    }
                }

                for (let i = response.data.length-1; i >= 0 ; i--) {
                    let add = true
                    newSkills.map((newSkill)=>{
                        if (newSkill.id === response.data[i].id){
                            add = false
                        }
                    })
                    if (add){
                        newSkills.push(response.data[i])
                    }
                }
                setSkills(newSkills)
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
            }else{
                if (prices[option.value]){
                    delete prices[option.value]
                }
            }
            console.log(prices)
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
