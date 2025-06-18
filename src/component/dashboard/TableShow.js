import { Form, Table } from "react-bootstrap";
import PaginatedItems from "../../pages/dashboard/Pagination";
import { useEffect, useState } from "react";
import axios from "axios";
import { basic, userUrl } from "../../api";
import Cookie from "cookie-universal";
import { FaPenAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import TransformDate from "../../Healpers/TransformDate";

export default function TableShow(props) {
  // ------------------State-----------------
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");
  const [curentUser, setCurentUser] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  // const [l, setL] = useState("");
  // ----------------------------------
  // ---------------cookei&&token-----------
  const cookie = Cookie();
  const token = cookie.get("e-commerce");
  // ---------------------------------------
  // const curentUserr=curentUser ||false
  // -----------------------------------------------
  useEffect(() => {
    async function fetchCurrentUser() {
      await axios
        .get(`${basic}/${userUrl}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setCurentUser(res.data);
        })
        .catch((error) => {
          console.error("Error fetching current user:", error);
        });
    }

    fetchCurrentUser();
  }, [token]);

  // -------------------HeaderShow----------------------------

  const headerShow = props.header.map((item, key) => (
    <th key={key}>{item.name}</th>
  ));
  // -------------------DataShow------------
 
  const filteredDataByDate = props.data.filter(
    (item) => TransformDate(item.created_at) === date
  );
  const filterSearshByDate = filteredData.filter(
    (item) => TransformDate(item.created_at) === date
  );
  const searchedData =
    date.length !== 0
      ? search.length > 0
        ? filterSearshByDate
        : filteredDataByDate
      : search.length > 0
      ? filteredData
      : props.data;

  const dataShow = searchedData.map((item1, key) => {
    return (
      <tr key={key}>
        <td>{key + 1}</td>
        {props.header.map((item2, key2) => {
          return (
            <td key={key2}>
              {item2.key === "image" ? (
                <img alt="img" width="80px" src={item1[item2.key]}  key={key2}/>
              ) : item2.key === "images" ? (
                <div className="d-flex align-items-center justfy-content-start gap-2 flex-wrap ">
                  {item1[item2.key].map((e) => (
                    <img alt="img" width="60px" style={{display:"block"}} src={e.image} />
                  ))}
                </div>
              ) : item2.key === "created_at" || item2.key === "updated_at" ? (
                TransformDate(item1[item2.key])
              ) : item1[item2.key] === "1995" ? (
                "admin"
              ) : item1[item2.key] === "1996" ? (
                "writer"
              ) : item1[item2.key] === "1999" ? (
                "product manegar"
              ) : item1[item2.key] === "2001" ? (
                "user"
              ) : (
                item1[item2.key]
              )}
              {curentUser && item1[item2.key] === curentUser.name && " (You)"}
            </td>
          );
        })}
        <td>
          <div className="d-flex align-items-center justify-content-between gap-2">
            <Link
              to={`${item1.id}`} // تأكد من استخدام الخاصية المناسبة هنا
              style={{
                color: "green",
                cursor: "pointer",
                backgroundColor: "transparent",
              }}
            >
              <FaPenAlt />
            </Link>
            {curentUser && item1.id !== curentUser.id && (
              <MdDelete
                style={{ color: "red", fontSize: "18px", cursor: "pointer" }}
                onClick={() => props.delete(item1.id)} // تأكد من تعريف دالة onDelete
              />
            )}
          </div>
        </td>
      </tr>
    );
  });
  // ------------------searchData-------------------
// useEffect(()=>{},[search])
  async function getSearchedData() {
    try {
      const response = await axios.post(
        `${basic}/${props.searchedName}/search?${props.searchedKey}=${search}`,
        {}, // بيانات الطلب إذا كانت موجودة
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      setFilteredData(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setSearchLoading(false);
    }
  }
  // --------------debouns----------------
  useEffect(() => {
    const delay = setTimeout(() => {
      search.length > 0 ? getSearchedData() : setSearchLoading(false);
    }, 800);
    return () => {
      clearTimeout(delay);
    };
    // eslint-disable-next-line
  }, [search]);

  // const filterData=props.data.filter((it)=>{it.include(t.data.title)})
  return (
    <>
      <Form.Group className="mb-3 form-c" controlId="exampleForm.ControlInput2">
        <Form.Control
          type="text"
          placeholder="search...."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          
            setSearchLoading(true);
          }}
          required
        />

        <Form.Control
          type="date"
          // placeholder="search...."
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
          }}
          required
        />
      </Form.Group>

      <Table className="w-100" striped bordered responsive="sm" size="lg">
        <thead>
          <tr>
            <td>id</td>
            {headerShow}
            <th>Action</th>
            
          </tr>
        </thead>
        <tbody>
          {props.users.length === 0 ? (
            <tr>
              <td colSpan={12} className="text-primary h3">
                Loading...
              </td>
            </tr>
          ) : searchLoading ? (
            <tr>
              <td colSpan={12} className="text-primary h3">
                Searching...
              </td>
            </tr>
          ) : (
            dataShow
          )}
        </tbody>
      </Table>
      <PaginatedItems
        data={props.paginateData}
        limit={props.limit}
        total={props.total}
        setLimit={props.setLimit}
        setPage={props.setPage}
      />
    </>
  );
}
