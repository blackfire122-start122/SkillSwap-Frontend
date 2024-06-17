import style from "../../../styles/Find.module.css"
import categoryImage from "../../../images/category.png";
import {client} from "../../../lib/client";
import {useState} from "react";
import ResultUsers from "./ResultUsers";

function ResultCategories({categories}) {
    const [usersOnCategories, setUsersOnCategories] = useState(null)
    const [usersOnCategoryId, setUsersOnCategoryId] = useState(null)

    function handleCategoryClick(category){
        client.get(`api/v1/findUsersOnCategory?categoryId=${category.id}`)
            .then(function (response) {
                setUsersOnCategories(response.data)
                setUsersOnCategoryId(category.id)
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    return (
        <>
            {categories ? categories.map((category)=>(
                <div key={category.id}>
                    <div className={style.category} onClick={()=>{handleCategoryClick(category)}}>
                        <div className={style.imageContainer}>
                            <img className={style.categoryImage} src={categoryImage} alt="category"/>
                        </div>
                        <h3>{category.name}</h3>
                    </div>
                    {usersOnCategoryId===category.id ? <ResultUsers users={usersOnCategories} /> : null}
                </div>
            )) : null}
        </>
    )
}

export default ResultCategories
