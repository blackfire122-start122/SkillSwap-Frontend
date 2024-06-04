import {client} from "../lib/client"
import {useEffect, useState} from "react"
import {useNavigate} from 'react-router-dom'
import style from "../styles/Profile.module.css"
import { useParams } from 'react-router-dom'
import Header from "../components/Profile/Header";
import MainProfile from "../components/Profile/MainProfile";

function Profile() {
    const [user, setUser] = useState({})
    const [showingUser, setShowingUser] = useState(null)
    const navigate = useNavigate ()
    const { userName } = useParams()

    function getUser() {
        client.get("api/v1/user/getUser")
            .then(function (response) {
                setUser(response.data)
                if (response.data.username !== userName){
                    getUserData()
                }
            })
            .catch(function (error) {
                if (!error.response){
                    console.log(error)
                    return
                }
                if(error.response.status === 401){
                    // navigate('/login')
                    console.log("anon")
                }else {
                    console.log(error)
                }
            })
    }

    function getUserData() {
        client.get("api/v1/user/getUserData/"+userName)
            .then(function (response) {
                setShowingUser(response.data)
            })
            .catch(function (error) {
                if (!error.response){
                    console.log(error)
                    return
                }
                if(error.response.status === 404){
                    console.log(404)
                }else {
                    console.log(error)
                }
            })
    }

    useEffect(()=>{
        getUser()
    }, [])

    return (
        <div className={style.profile}>
            <Header user={showingUser ? showingUser: user} showingUser={showingUser}/>
            <MainProfile user={user} showingUser={showingUser} setShowingUser={setShowingUser}/>
        </div>
    )
}

export default Profile
