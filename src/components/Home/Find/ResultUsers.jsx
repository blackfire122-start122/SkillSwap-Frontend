import style from "../../../styles/Find.module.css"
import {baseURL} from "../../../lib/client";
import userImage from "../../../images/user.png"
import {Link} from "react-router-dom";
import renderStars from "../Stars";

function ResultUsers({users}) {
    return (
        <>
            {users ? users.map((user)=>(
                <Link to={`profile/${user.username}`} className={style.user} key={user.id}>
                    <div className={style.imageContainer}>
                        <img className={style.userImage} src={user.image ? baseURL+"api/v1/user/image/"+user.image:userImage} alt=""/>
                    </div>
                    <h3>{user.username}</h3>
                    <h3>{renderStars(user.rating)}</h3>
                </Link>
            )) : null}
        </>
    )
}

export default ResultUsers
