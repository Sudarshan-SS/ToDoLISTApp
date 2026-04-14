import { Routes, Route } from "react-router-dom";
import Login from "../Pages/login/login";
import Dashboard from "../Pages/home/home";


export default function AppRoutes(){
    return(
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/dashboard" element={<Dashboard/>}></Route>
        </Routes>
    );
}