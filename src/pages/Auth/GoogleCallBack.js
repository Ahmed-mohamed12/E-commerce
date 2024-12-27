import axios from "axios";
import { useEffect } from "react";
import { basic, googleCallUrl } from "../../api";
import { useLocation } from "react-router-dom";
import Cookie from "cookie-universal"

export default function GoogleCallBack() {
  const cookie=Cookie()
  const location = useLocation();

  useEffect(() => {
    async function GoogleCall() {
      try {
        const res =await axios.get(`${basic}/${googleCallUrl}${location.search}`);
        const token=res.data.access_token;
        cookie.set("e-commerce", token)
        
      } catch(err) {
        console.log(err);
      }
    }
    GoogleCall();
  }, );

  return(<><h1>ggggggg</h1></>);
}