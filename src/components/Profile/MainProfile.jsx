import style from "../../styles/MainProfile.module.css"
import Reviews from "./Reviews";
import UserSkills from "./UserSkills";

function MainProfile({user, showingUser, setShowingUser}) {

    return (
        <main className={style.main} >
            <Reviews user={user} showingUser={showingUser} setShowingUser={setShowingUser} />
            <UserSkills user={showingUser ? showingUser : user} />
        </main>
    )
}

export default MainProfile
