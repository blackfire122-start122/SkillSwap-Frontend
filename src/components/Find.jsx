import style from "../styles/Find.module.css"
import {useState} from "react";
import {client} from "../lib/client";

function Find() {
    function handleFind(){
        // e.target.value
        // client.get("api/v1/user/find")
        //     .then(function (response) {
        //         console.log(response.data)
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     })
    }

    return (
        <div className={style.findDiv}>
            <div className={style.inputWrapper}>
                <input onChange={handleFind} className={style.findInp} type="text" placeholder="Find"/>
                <img onClick={handleFind} className={style.imgFind} src="/find.png" alt="find image"/>
            </div>
        </div>
    )
}

export default Find
