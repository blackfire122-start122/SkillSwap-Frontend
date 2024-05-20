import {client} from "../lib/client"
import {useEffect, useState} from "react"
import { useNavigate  } from 'react-router-dom'
import style from "../styles/ChangeData.module.css";
import FindSkill from "../components/ChangeData/FindSkill";
import Categories from "../components/ChangeData/Categories";
import PricesSkills from "../components/ChangeData/PricesSkills";
import ImageUser from "../components/ChangeData/ImageUser";

function ChangeData() {
    const [username, setUsername] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [image, setImage] = useState("")
    const [error, setError] = useState("")
    const [skills, setSkills] = useState([])
    const [selectedSkills, setSelectedSkills] = useState([])
    const [selectedCategories, setSelectedCategories] = useState([])
    const [prices, setPrices] = useState({})
    const navigate = useNavigate ()

    function getUser() {
        client.get("api/v1/user/getUser")
            .then(function (response) {
                setUsername(response.data.username)
                setEmail(response.data.email)
                setPhone(response.data.phone)
                setImage(response.data.image)
                setSelectedSkills(Array.from(response.data.skills).map(skill => skill.id))
                setSelectedCategories(Array.from(response.data.categories).map(category => category.id))
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


    const handleSubmit = (event) => {
        event.preventDefault()

        let data = {
            "username":username,
            "email":email,
            "phone":phone,
            "skills":selectedSkills,
            "categories":selectedCategories,
            "prices":prices,
        }

        client.post("api/v1/user/changeUser", data)
            .then(function (response) {
                setError("")
            })
            .catch(function (error) {
                if (error.response.data.Change === "User with the same username already exists"){
                    setError("User with the same username already exists")
                }else {
                    console.log(error)
                }
            })

        const fileImg = event.target.querySelectorAll('input[type="file"]')[0].files[0]
        if (fileImg){
            const formData = new FormData()
            formData.append("image", fileImg)

            client.post("api/v1/user/setImage", formData)
                .then(function (response) {
                    setError("")
                })
                .catch(function (error) {
                    console.log(error)
                })
        }

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
                    Phone:
                    <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className={style.input}
                    />
                </label>
                <label>
                    Email:
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={style.input}
                    />
                </label>

                <ImageUser image={image}/>

                <Categories selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories}
                            setSelectedSkills={setSelectedSkills} selectedSkills={selectedSkills}
                            skills={skills} setSkills={setSkills}/>

                <FindSkill  skills={skills} setSkills={setSkills}
                           selectedSkills={selectedSkills} setSelectedSkills={setSelectedSkills}
                            prices={prices} setPrices={setPrices}/>

                <PricesSkills skills={skills} selectedSkills={selectedSkills} prices={prices} setPrices={setPrices}/>

                <span className={style.error}>{error}</span>
                <button type="submit" className={style.button}>Change</button>
            </form>
        </div>
    )
}

export default ChangeData
