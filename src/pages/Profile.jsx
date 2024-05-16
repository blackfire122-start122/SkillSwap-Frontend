import {client} from "../lib/client"
import {useEffect, useState} from "react"
import {Link, useNavigate} from 'react-router-dom'

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

    return (
        <>
            <h1>{user.username}</h1>
            <Link to="/changeData">
                <h2>Change data</h2>
            </Link>
        </>
    )
}

export default Profile
