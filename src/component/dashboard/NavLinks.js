import { FaUsers } from "react-icons/fa";
import { MdAddCircle } from "react-icons/md";
import { BsFillPenFill } from "react-icons/bs";
import { FaCartPlus } from "react-icons/fa";


export const NavLinks=[
    {
        name:"users",
        path:"/dashboard/users",
        icon:FaUsers,
        role:["1995"]
    },
    {
        name:"Add User",

        path:"/dashboard/user/add",
        icon:MdAddCircle,
        role:["1995"]
    },
    {
        name:"AddCatygory",
        path:"/dashboard/Category/add",
        icon:FaCartPlus,
        role:["1995","1999"]
    },
    {
        name:"Catygory",
        path:"/dashboard/category",
        icon:FaCartPlus,
        role:["1995","1999"]
    },
    {
        name:"AddProducts",
        path:"/dashboard/product/add",
        icon:FaCartPlus,
        role:["1995","1999"]
    },
    {
        name:"Products",
        path:"/dashboard/Products",
        icon:FaCartPlus,
        role:["1995","1999"]
    },
]