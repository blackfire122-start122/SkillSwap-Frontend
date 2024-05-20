import {client} from "../../lib/client"
import {useEffect, useState} from "react"
import style from "../../styles/ChangeData.module.css";

function Categories({selectedCategories, setSelectedCategories,
                        setSelectedSkills, selectedSkills, skills, setSkills}) {
    const [categories, setCategories] = useState([])

    function handleFindCategory(find){
        client.get(`api/v1/findCategories?categoryName=${encodeURIComponent(find)}`)
            .then(function (response) {
                setCategories(response.data)

                let newCategories = []

                for (let i = categories.length-1; i>=0; i--) {
                    if (selectedCategories.includes(categories[i].id)){
                        newCategories.push(categories[i])
                    }
                }

                for (let i = response.data.length-1; i >= 0 ; i--) {
                    let add = true
                    newCategories.map((newCategory)=>{
                        if (newCategory.id === response.data[i].id){
                            add = false
                        }
                    })
                    if (add){
                        newCategories.push(response.data[i])
                    }
                }
                setCategories(newCategories)

            })
            .catch(function (error) {
                console.log(error)
            })
    }

    useEffect(()=>{
        handleFindCategory("")
    },[])

    function handleSelectChange(event) {
        const options = event.target.options;
        const selectedValues = [];
        for (const option of options) {
            if (option.selected) {
                selectedValues.push(option.value);
            }
        }
        setSelectedCategories(selectedValues);
    }

    function handleChangeOption(e){
        if(e.target.selected){
            let category = categories.find((category) => {
                return category.id === e.target.value
            })

            let notIncludeSkills = []

            for (let i = category.skills.length-1; i >= 0; i--) {
                if (!selectedSkills.includes(category.skills[i].id)){
                    if (!skills.find((skill)=>{return skill.id === category.skills[i].id})) {
                        setSkills([...skills, category.skills[i]])
                    }
                    notIncludeSkills.push(category.skills[i].id)
                }
            }

            setSelectedSkills([...selectedSkills, ...notIncludeSkills])
        }
    }

    return (
        <label>
            Categories:
            <input
                type="text"
                className={style.input}
                placeholder="Find category"
                onChange={(e)=>{handleFindCategory(e.target.value)}}
            />
            <select onChange={handleSelectChange} value={selectedCategories} className={style.select} multiple name="Categories">
                {categories.map((category)=>(
                    <option onClick={handleChangeOption} key={category.id} value={category.id}>{category.name}</option>
                ))}
            </select>
        </label>
    )
}

export default Categories
