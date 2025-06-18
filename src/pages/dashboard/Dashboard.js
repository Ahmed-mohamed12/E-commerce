import { Outlet } from "react-router-dom";
import Sidebar from "../../component/dashboard/Sidebar";
import Topbar from "../../component/dashboard/Topbar";
import './dashboard.css'

export default function Dashboard() {
    return (<>

        <div className="position-relative dashboard">
            <Topbar />
            <div style={{width:"100%",height:"max-content", display: "flex", marginTop:"60px"}}>

                <Sidebar />
                <Outlet />
            </div>
        </div>



    </>)
}