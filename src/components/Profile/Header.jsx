import userImage from "../../images/user.png";
import style from "../../styles/Profile.module.css"
import {baseURL} from "../../lib/client"
import ProfileActions from "./ProfileActions";
import {useState} from "react";

function Header({user, showingUser}) {
    const [showActions, setShowActions] = useState(false)

    function handleUsernameClick() {
        setShowActions(true)
    }

    return (
        <header className={style.header}>
            <img className={style.userImg} src={user.image ? baseURL+"api/v1/user/image/"+user.image : userImage} alt={user.username || "user Img"}/>

            <div className={style.categoriesRating}>
                <div className={style.categories}>
                    {user.categories ? user.categories.map((category)=>(
                        <div key={category.id} className={style.category}>
                            <h3>{category.name}</h3>
                        </div>
                    )):null}
                </div>
                <h4>{showingUser ? showingUser.rating : user.rating}</h4>
            </div>

            <div>
                <h1 onClick={handleUsernameClick}>{user.username}</h1>
                {showActions ? (showingUser ? null : <ProfileActions user={user} />) : null}
            </div>

        </header>
    )
}

export default Header
