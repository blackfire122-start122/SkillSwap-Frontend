import {useState} from 'react'
import { useNavigate  } from 'react-router-dom';
import style from './../styles/Login.module.css'
import {client} from "../lib/client"

function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate ()

    const handleSubmit = (event) => {
        event.preventDefault()

        client.post("api/v1/user/login", {"username":username, "password":password})
            .then(function (response) {
                if (response.data.Login === "OK"){
                    navigate('/');
                } else if (response.data.Login === "User has been registered successfully"){
                    navigate(`/profile/${username}`);
                }
            })
            .catch(function (error) {
                if (!error.response){
                    console.log(error)
                    return
                }
                if (error.response.data.Login === "Not all field"){
                    setError(error.response.data.Login)
                }else if (error.response.data.Login === "Error login"){
                    setError("Bad password")
                } else {
                    console.log(error)
                }
            })
    }

    return (
        <div className={style.container}>
            <form onSubmit={handleSubmit} className={style.form}>
                <label>
                    Username:
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className={style.input}
                    />
                </label>
                <label>
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={style.input}
                    />
                </label>
                <span className={style.error}>{error}</span>
                <button type="submit" className={style.button}>Login</button>
            </form>
        </div>
    )
}

export default Login
