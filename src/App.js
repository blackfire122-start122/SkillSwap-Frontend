import './App.css';
import Home from "./pages/Home";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import ChangeData from "./pages/ChangeData";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/changeData" element={<ChangeData/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;


