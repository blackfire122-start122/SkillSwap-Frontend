import style from "../styles/Find.module.css"
import {useState} from "react";
import {baseURL, client} from "../lib/client";
import userImage from "../images/user.png"
import skillImage from "../images/skill.png"
import categoryImage from "../images/category.png"
import findImage from  "../images/find.png"

function Find() {
    const [data, setData] = useState({})

    function handleFind(e){
        client.get(`api/v1/user/findAll?find=${e.target.value}`)
            .then(function (response) {
                console.log(response.data)
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
                {data.users ? data.users.map((user)=>(
                    <div className={style.user} key={user.id}>
                        <img className={style.userImage} src={user.image ? baseURL+"api/v1/user/image/"+user.image:userImage} alt=""/>
                        <h3>{user.username}</h3>
                        <h3>{user.rating}</h3>
                    </div>
                )) : null}
                {data.categories ? data.categories.map((category)=>(
                    <div className={style.category} key={category.id}>
                        <img className={style.categoryImage} src={categoryImage} alt="category"/>
                        <h3>{category.name}</h3>
                    </div>
                )) : null}
                {data.skills ? data.skills.map((skill)=>(
                    <div className={style.skill} key={skill.id}>
                        <img className={style.skillImage} src={skillImage} alt="skill"/>
                        <h3>{skill.name}</h3>
                    </div>
                )) : null}
            </div>
        </div>
    )
}

// ToDo onclick go to link category skill profile where can select and order

export default Find
