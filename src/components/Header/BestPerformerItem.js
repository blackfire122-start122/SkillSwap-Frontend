import userImage from "./../../images/user.png"
import {Link} from "react-router-dom";
import style from "./../../styles/BestPerformerItem.module.css"

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
                stars.push(<span key={i}>&#9733;</span>)
            } else {
                stars.push(<span key={i}>&#9734;</span>)
            }
        }

        return stars
    }

    return (
        <Link to="/" className={style.bestPerformer}>
            <img src={userImage} alt={bestPerformer.username}/>
            <h4>{bestPerformer.username}</h4>
            <div>{renderStars()}</div>
        </Link>
    )
}

export default BestPerformer
