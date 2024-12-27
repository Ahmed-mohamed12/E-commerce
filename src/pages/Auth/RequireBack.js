import Cookie from"cookie-universal"
import { Outlet } from "react-router-dom"
export default function RequireBack(){
    const cookei=Cookie()
    const token=cookei.get("e-commerce")
    return(<>
   {token?window.history.back():<Outlet />}
    
    
    </>)
}