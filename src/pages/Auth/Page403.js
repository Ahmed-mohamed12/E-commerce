import { Link } from 'react-router-dom'
import './Page403style.css'
export default function Page403({role}){
  return(<>
    <div className="d-flex align-items-start justify-content-center w-100">
    <div className="page-wrap">
  <div className="page-not-found">
    {/* <img src="https://res.cloudinary.com/razeshzone/image/upload/v1588316204/house-key_yrqvxv.svg" class="img-key" alt=""> */}
    <h1 className="text-xl">
      <span>4</span>
      <span>0</span>
      <span class="broken">3</span>
    </h1>
    <h4 className="text-md">Access Denied !</h4> <br />
    <h4 className="text-sm text-sm-btm">You don’t have access to this area of application. Speak to your administrator to unblock this feature.</h4>

    <Link to={role==="1996"?"/dashboard/Writer":"/"}>{role==="1996"?"Go To Writer Page":"Go To Home Page"}</Link>
  </div>
</div>
</div>
    
    </>)
}