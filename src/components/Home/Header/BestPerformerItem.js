import userImage from "../../../images/user.png"
import {Link} from "react-router-dom";
import style from "../../../styles/BestPerformerItem.module.css"
import {baseURL} from "../../../lib/client";
import renderStars from "../Stars";

function BestPerformerItem({bestPerformer}) {
    if (!bestPerformer){
        return
    }

    return (
        <Link to={`profile/${bestPerformer.username}`} className={style.bestPerformer}>
            <img className={style.userImg} src={bestPerformer.image ? baseURL+"api/v1/user/image/"+bestPerformer.image : userImage} alt={bestPerformer.username || "user Img"}/>
            <h4>{bestPerformer.username}</h4>
            <div>{renderStars(bestPerformer.rating)}</div>
        </Link>
    )
}

export default BestPerformerItem
