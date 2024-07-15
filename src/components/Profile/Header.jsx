import userImage from "../../images/user.png";
import menuImage from "../../images/menu.png";
import style from "../../styles/Profile.module.css"
import {baseURL} from "../../lib/client"
import ProfileActions from "./ProfileActions";
import {useState} from "react";
import {Link} from "react-router-dom";

function Header({user, showingUser}) {
    const [showActions, setShowActions] = useState(false)

    function menuActionsClick() {
        setShowActions(!showActions)
    }

    document.onclick = (e) => {
        if (e.target.className!==style.menuActions){
            setShowActions(false)
        }
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
                <h4>Rating: {showingUser ? showingUser.rating : user.rating}</h4>
            </div>

            <div className={style.navAndActions}>
                <Link to="/">
                    <img className={style.logoImg} src="/logo.png" alt="logo"/>
                </Link>
                <div className={style.actions}>
                    <h1>{user.username}</h1>

                    {showingUser ? null : <img onClick={menuActionsClick} className={style.menuActions} src={menuImage} alt="actions"/>}
                    {showActions ? (showingUser ? null : <ProfileActions user={user} />) : null}
                </div>
            </div>

        </header>
    )
}

export default Header
