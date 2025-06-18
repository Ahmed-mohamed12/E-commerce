import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Cookie from "cookie-universal";
import Loading from "../../component/loading/loading";
import axios from "axios";
import { basic, userUrl } from "../../api";
import Page403 from "./Page403";

export default function RequireAuth({ alowedRole }) {
  const Navigate = useNavigate();
  const [user, setUser] = useState("");
  // const [isLoading, setIsLoading] = useState(false);

  const cookie = Cookie();
  const token = cookie.get("e-commerce");

  useEffect(() => {
    async function fetchUsers() {
      try {
        // setIsLoading(true);
        const response = await axios.get(`${basic}/${userUrl}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
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

  return token ? (
    user === "" ? (
      <Loading />
    ) : alowedRole.includes(user.role) ? (
      <Outlet />
    ) : (
      <Page403 role={user.role} />
    )
  ) : (
    Navigate("/login", { replace: true })
  );
}
