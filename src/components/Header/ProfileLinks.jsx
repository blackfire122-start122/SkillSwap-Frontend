import style from "./../../styles/ProfileLinks.module.css"
import userImage from "./../../images/user.png"

function ProfileLinks() {
    return (
        <a className={style.profileLinks} href="#">
            <img src={userImage} alt="user"/>
            <h3 className={style.loginBtn}>Login</h3>
        </a>
    )
}

export default ProfileLinks
