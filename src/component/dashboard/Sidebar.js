import { NavLink } from 'react-router-dom'
import './Bars.css'
import { Menue } from '../../context/MenuContext';
import { useContext, useEffect, useState } from 'react';
import { ScreenSizeContext } from '../../context/ScreenSizeContext';
import axios from 'axios';
import { basic, userUrl } from '../../api';
import { useNavigate } from 'react-router-dom';
import Cookie from "cookie-universal";
import { NavLinks } from './NavLinks';



export default function Sidebar() {
    const screenSize = useContext(ScreenSizeContext);
    const [user, setUser] = useState("");
    // const [load, setLoad] = useState(0);
    
    const Navigate = useNavigate();
    const menue = useContext(Menue);
    const isOpen = menue.isOpen
    const cookie = Cookie();
     const token = cookie.get("e-commerce");

        useEffect(() => {
        async function fetchUsers() {
          try {
            // setIsLoading(true);
            // current user------------------
             await axios.get(`${basic}/${userUrl}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
              .then((data) => setUser(data.data))
            }
            catch (error) {
                Navigate("/login", { replace: true });
            }
        //      finally {
        //         console.log(user);
        //     setLoad((pre)=>pre+1);
        //   }
        }
    
        fetchUsers();
      }, [token,Navigate]);

      
      
    return (<>
   
        <div className="side-bar pt-3 "
            style={{
                left: screenSize.screenWidth < "768" ? (isOpen ? 0 : "-100%") : 0
                , width: isOpen ? '270px' : "fit-content",
                position:screenSize.screenWidth< "768" ? "fixed":"sticky"
            }}>
              {NavLinks.map((nav,key)=>{return<div key={key}>
      {nav.role.includes(user.role)&&
          <NavLink  to={nav.path} className=' flex align-items-center gap-2 side-bar-link' >
            

              <nav.icon style={{ adding: isOpen ? '10px 8px 10px 15px' : "10px 13px" }}/> 
              <span className="p-5 " style={{ display: isOpen ? "block" : "none"}}>{nav.name}</span>
            

          </NavLink>
      }
          </div>
      })}
            {/* <h2>عرض الشاشة: {screenSize.screenWidth}</h2>
      <h2>ارتفاع الشاشة: {screenSize.screenHeight}</h2> */}
   
           
           
           

            
           
            

        </div>
    
    </>)
}
