import style from "../../styles/Chat.module.css"
import {baseURL, client} from "../../lib/client";
import * as PropTypes from "prop-types";
import optionsImage from "../../images/options.png"
import {useState} from "react";

function Header(props) {
    const [showOptions, setShowOptions] = useState(false)
    let defaultStatus = props.statuses.find((status)=>(status.status===props.chat.status)).id
    const [statusId, setStatusId] = useState(defaultStatus)
    const [showBtnChangeStatus, setShowBtnChangeStatus] = useState(false)

    function handleOptionsClick(){
        setShowOptions(!showOptions)
    }

    function handleChangeStatusBtnClick(){
        client.put("api/v1/chat/setStatus", {"chatId": parseInt(props.chat.id),"statusId":parseInt(statusId)})
            .then(function (response) {
                if(response.status === 200){
                    setShowBtnChangeStatus(false)
                    props.sendMessage(JSON.stringify({"Type":"changeStatus","Content":statusId}))
                }
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    function handleChangeStatus(e){
        setShowBtnChangeStatus(true)
        setStatusId(e.target.value)
    }

    return <header>
        <img className={style.toUserImage} src={props.toUser ? baseURL + "api/v1/user/image/" + props.toUser.image : null} alt={props.toUser.username}/>
        <h1>{props.toUser.username}</h1>
        <div>
            <h2>{props.skill}</h2>
            <h3>Status: {props.chat ? props.chat.status : null}</h3>
        </div>
        <img onClick={handleOptionsClick} className={style.optionsImage} src={optionsImage} alt="options"/>
        {showOptions ?
            <div className={style.options}>
                <select ref={props.selectRef} defaultValue={defaultStatus ? defaultStatus : null} onChange={(e)=>{handleChangeStatus(e)}}>
                    {props.statuses.map((status)=>(
                        <option key={status.id} value={status.id}>{status.status}</option>
                    ))}
                </select>
                {showBtnChangeStatus ? <button onClick={handleChangeStatusBtnClick}>Change</button> :null }
            </div> :null}
    </header>;
}

Header.propTypes = {
    sendMessage: PropTypes.any,
    toUser: PropTypes.any,
    chat: PropTypes.shape({}),
    skill: PropTypes.string,
    statuses : PropTypes.array,
    selectRef: PropTypes.any
}

export default Header