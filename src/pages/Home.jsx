import Header from "../components/Home/Header/Header";
import { client } from "../lib/client";
import { useEffect, useState } from "react";
import Find from "../components/Home/Find/Find";
import style from "../styles/Home.module.css";

function Home() {
    const [user, setUser] = useState({});

    function getUser() {
        client.get("api/v1/user/getUser")
            .then(function (response) {
                setUser(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    useEffect(() => {
        getUser();
    }, []);

    return (
        <main className={style.main}>
            <div className={style.headerSnap}>
                <Header user={user} />
            </div>
            <div className={style.findSnap}>
                <Find />
            </div>
        </main>
    );
}

export default Home;
