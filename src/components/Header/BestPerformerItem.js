import userImage from "../../images/user.png"
import {Link} from "react-router-dom";
import style from "./../../styles/BestPerformerItem.module.css"
import {baseURL} from "../../lib/client";

function BestPerformer({bestPerformer}) {
    if (!bestPerformer){
        return
    }
    const renderStars = () => {
        const stars = []
        const maxRating = 100
        const starCount = Math.ceil((bestPerformer.rating / maxRating) * 5)

        for (let i = 0; i < 5; i++) {
            if (i < starCount) {
                stars.push(<span className={style.star} key={i}>&#9733;</span>)
            } else {
                stars.push(<span className={style.star} key={i}>&#9734;</span>)
            }
        }

        return stars
    }

    return (
        <Link to={`profile/${bestPerformer.username}`} className={style.bestPerformer}>
            <img className={style.userImg} src={bestPerformer.image ? baseURL+"api/v1/user/image/"+bestPerformer.image : userImage} alt={bestPerformer.username || "user Img"}/>
            <h4>{bestPerformer.username}</h4>
            <div>{renderStars()}</div>
        </Link>
    )
}

export default BestPerformer
