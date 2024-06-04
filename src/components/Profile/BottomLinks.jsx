import style from "../../styles/Profile.module.css"
import {Link} from "react-router-dom";

function BottomLinks({user}) {
    return (
        <div>
            <Link to="/userSkillChats">Skill Chats</Link>
        </div>
    )
}

export default BottomLinks
