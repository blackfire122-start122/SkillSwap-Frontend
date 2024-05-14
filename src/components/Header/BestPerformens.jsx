import userImage from "./../../images/user.png"
import BestPerformer from "./BestPerformerItem";
import style from "./../../styles/BestPerformers.module.css"
import client from "../../lib/client";

function BestPerformers() {
    client.get("api/v1/bestPerformers")
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    })


    return (
        <div className={style.bestPerformers}>
            <BestPerformer/>
        </div>
    )
}

export default BestPerformers
