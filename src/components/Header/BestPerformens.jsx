import userImage from "./../../images/user.png"
import BestPerformer from "./BestPerformerItem";
import style from "./../../styles/BestPerformers.module.css"
import client from "../../lib/client";
import {useEffect, useState} from "react";

function BestPerformers() {
    const [bestPerformers, setBestPerformers] = useState([])

    function getBestPerformers() {
        client.get("api/v1/bestPerformers")
            .then(function (response) {
                setBestPerformers(response.data)
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    useEffect(()=>{
        getBestPerformers()
    }, [])

    return (
        <div className={style.bestPerformers}>
            {bestPerformers.map((bestPerformer)=>(
                <BestPerformer bestPerformer={bestPerformer}/>
            ))}
        </div>
    )
}

export default BestPerformers
