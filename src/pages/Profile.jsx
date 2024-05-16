import client from "../lib/client"
import {useEffect, useState} from "react"
import { useNavigate  } from 'react-router-dom'

function Profile() {
    const [user, setUser] = useState({})
    const navigate = useNavigate ()

    function getUser() {
        client.get("api/v1/user/getUser")
            .then(function (response) {
                setUser(response.data)
            })
            .catch(function (error) {
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

    return (
        <>
            <h1>{user.username}</h1>
            {/*<Header user={user}/>*/}
        </>
    )
}

export default Profile
