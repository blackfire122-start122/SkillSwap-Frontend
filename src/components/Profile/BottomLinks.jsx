import style from "../../styles/Profile.module.css"
import {Link} from "react-router-dom";

function BottomLinks() {
    return (
        <div className={style.bottomLinks}>
            <Link className={style.chatsLink} to="/userSkillChats">Skill Chats</Link>
        </div>
    )
}

export default BottomLinks
