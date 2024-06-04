import {client} from "../../lib/client"
import {Link, useNavigate} from 'react-router-dom'
import style from "../../styles/Profile.module.css"

function ProfileActions({user}) {
    const navigate = useNavigate ()

    function handleLogout(){
        client.get("api/v1/user/logout")
            .then(function (response) {
                navigate('/')
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    return (
        <div className={style.userActions}>
            <Link className={style.changeDataBtn} to="/changeData">
                <h2>Change data</h2>
            </Link>
            <button onClick={handleLogout} className={style.btnLogout}>Logout</button>
        </div>
    )
}

export default ProfileActions
