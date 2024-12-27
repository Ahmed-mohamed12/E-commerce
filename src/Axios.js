import  axios  from "axios";
import Cookie from "cookie-universal"
import { basic } from "./api";
const cookie=Cookie()
const token=cookie.get("e-commerce")
export const Axios=axios.create({
    baseURL: basic,
    headers:{
        Authorization: `Bearer ${token}`
    }
})