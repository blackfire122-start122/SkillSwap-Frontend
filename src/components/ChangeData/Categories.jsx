import {client} from "../../lib/client"
import {useEffect, useState} from "react"
import style from "../../styles/ChangeData.module.css";

function Categories({selectedCategories, setSelectedCategories,
                        setSelectedSkills, selectedSkills}) {
    const [categories, setCategories] = useState([])

    function handleFindCategory(find){
        client.get(`api/v1/findCategories?categoryName=${encodeURIComponent(find)}`)
            .then(function (response) {
                setCategories(response.data)
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
            let category = categories.find((category)=>{return category.id === e.target.value})
            setSelectedSkills([...selectedSkills,...Array.from(category.skills).map(skill => skill.id)])
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
