import Header from "../components/Header/Header";
import {client} from "../lib/client";
import {useEffect, useState} from "react";
import Find from "../components/Find";
import style from "../styles/Home.module.css"


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
        <main className={style.main}>

            <Header user={user}/>
            <Find/>
        </main>
    )
}

export default Home;
