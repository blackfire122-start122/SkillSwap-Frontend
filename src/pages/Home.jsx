import Header from "../components/Header/Header";
import {client} from "../lib/client";
import {useEffect, useState} from "react";

function Home() {
    const [user, setUser] = useState({})

    function getUser() {
        client.get("api/v1/user/getUser")
            .then(function (response) {
                setUser(response.data)
            })
            .catch(function (error) {
                console.log(error);
            })
    }


    useEffect(()=>{
        getUser()
    }, [])

    return (
        <>
            <Header user={user}/>
        </>
    )
}

export default Home;
