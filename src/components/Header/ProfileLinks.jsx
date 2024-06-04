import style from "../../styles/ProfileLinks.module.css"
import userImage from "../../images/user.png"
import {Link} from "react-router-dom"
import {baseURL} from "../../lib/client"

function ProfileLinks({user}) {
    return (
        <Link to= {user.username ? `/profile/${user.username}`:"/login"} className={style.profileLinks}>
            <img className={style.userImg} src={user.image ? baseURL+"api/v1/user/image/"+user.image : userImage} alt={user.username || "user Img"}/>
            <h3 className={style.loginBtn}>{user.username || "Login"}</h3>
        </Link>
    )
}

export default ProfileLinks
