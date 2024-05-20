import style from "../../styles/ChangeData.module.css";
import { useState } from "react";
import {baseURL} from "../../lib/client";
import userImage from "./../../images/user.png"

function ImageUser({image}) {
    const [selectedImage, setSelectedImage] = useState(null);

    function handleImageChange(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    }

    return (
        <label className={style.labelImage}>
            <div>
                Image:
                <input
                    type="file"
                    className={style.input}
                    onChange={handleImageChange}
                />
            </div>
            <img src={selectedImage ? selectedImage : image ? baseURL+"api/v1/user/image/"+image : userImage} alt="User image" className={style.image} />
        </label>
    );
}

export default ImageUser;
