//  import { faHouse,fauser } from '@awesome.me/kit-KIT_CODE/icons/classic/solid'
import "./Bars.css";
import { IoIosMenu } from "react-icons/io";
import Dropdown from "react-bootstrap/Dropdown";

import { useContext, useEffect, useState } from "react";
import { Menue } from "../../context/MenuContext";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { basic, LogOutUrl, userUrl } from "../../api";
import Cookie from "cookie-universal";

export default function Topbar() {
  const [name, setName] = useState("");

  const Navigate = useNavigate();

  const menue = useContext(Menue);
  const setIsOpen = menue.setIsOpen;
  function handelMenue() {
    setIsOpen((prev) => !prev);
  }

  const cookie = Cookie();
  const token = cookie.get("e-commerce");
  useEffect(() => {
    async function fetchUsers() {
      try {
        // setIsLoading(true);
        // current user------------------
        await axios
          .get(`${basic}/${userUrl}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((data) => {setName(data.data.name)
          }

        
        );
      } catch (error) {
        Navigate("/login", { replace: true });
      }
      //  finally {
      //   setIsLoading(false);
      // }
    }

    fetchUsers();
    // eslint-disable-next-line
  }, [token]);
  async function handelLogOut() {
    try {
      await axios.get(`${basic}/${LogOutUrl}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      cookie.remove("e-commerce");
      window.location.pathname = "/login";
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      <div className="Top-bar d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center gap-5">
        <Link to={"/"}  style={{ color: "black", cursor: "pointer" }}> <h3>E-commerce</h3></Link>
          <IoIosMenu
            style={{ fontSize: "30px", color: "blue", cursor: "pointer" }}
            onClick={handelMenue}
          />
        </div>

        <Dropdown>
          <Dropdown.Toggle variant="primary" id="dropdown-basic">
            {name}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={handelLogOut}>
              Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        </div>
      
    </>
  );
}
