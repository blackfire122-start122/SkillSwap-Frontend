import {baseURL, client} from "../lib/client"
import {useEffect, useState} from "react"
import {Link, useNavigate} from 'react-router-dom'
import style from "../styles/Profile.module.css"
import userImage from "../images/user.png";

function Profile() {
    const [user, setUser] = useState({})
    const navigate = useNavigate ()

    function getUser() {
        client.get("api/v1/user/getUser")
            .then(function (response) {
                setUser(response.data)
            })
            .catch(function (error) {
                if (!error.response){
                    console.log(error)
                    return
                }
                if(error.response.status === 401){
                    navigate('/login')
                }else {
                    console.log(error)
                }
            })
    }

    useEffect(()=>{
        getUser()
    }, [])

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
        <div className={style.profile}>
            <img className={style.userImg} src={user.image ? baseURL+"api/v1/user/image/"+user.image : userImage} alt={user.username || "user Img"}/>
            <div className={style.userInfo}>
                <h1>{user.username}</h1>

                <Link className={style.changeDataBtn} to="/changeData">
                    <h2>Change data</h2>
                </Link>
                <button onClick={handleLogout} className={style.btnLogout}>Logout</button>
            </div>
        </div>
    )
}

export default Profile
