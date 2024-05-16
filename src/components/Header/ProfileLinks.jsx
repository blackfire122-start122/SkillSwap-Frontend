import style from "./../../styles/ProfileLinks.module.css"
import userImage from "./../../images/user.png"
import {Link} from "react-router-dom"

function ProfileLinks({user}) {
    return (
        <Link to= {user.username ? "/profile":"/login"} className={style.profileLinks}>
            <img src={userImage} alt={user.username}/>
            <h3 className={style.loginBtn}>{user.username ? user.username:"Login"}</h3>
        </Link>
    )
}

export default ProfileLinks
