import './App.css';
import Home from "./pages/Home";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import ChangeData from "./pages/ChangeData";
import UserSkillChats from "./pages/UserSkillChats";
import Chat from "./pages/Chat";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/profile/:userName" element={<Profile/>}/>
                <Route path="/changeData" element={<ChangeData/>}/>
                <Route path="/userSkillChats" element={<UserSkillChats/>}/>
                <Route path="/chat/:toUserName/:skill/:chatID" element={<Chat/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;


