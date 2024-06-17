import style from "../../../styles/Find.module.css"
import {useState} from "react";
import {baseURL, client} from "../../../lib/client";
import skillImage from "../../../images/skill.png"
import categoryImage from "../../../images/category.png"
import findImage from "../../../images/find.png"
import ResultUsers from "./ResultUsers";
import ResultCategories from "./ResultCategories";
import ResultSkills from "./ResultSkills";

function Find() {
    const [data, setData] = useState({})

    function handleFind(e){
        client.get(`api/v1/user/findAll?find=${e.target.value}`)
            .then(function (response) {
                setData(response.data)
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    return (
        <div className={style.findDiv}>
            <div className={style.inputWrapper}>
                <input onChange={handleFind} className={style.findInp} type="text" placeholder="Find"/>
                <img onClick={handleFind} className={style.imgFind} src={findImage} alt="find image"/>
            </div>
            <div className={style.resultContainer}>
                <ResultUsers users={data.users} />
                <ResultCategories categories={data.categories} />
                <ResultSkills skills={data.skills} />
            </div>
        </div>
    )
}

// ToDo onclick go to link category skill profile

export default Find
