import { basic, cat, cats } from "../../api";
import { useContext, useEffect, useState } from "react";
import Cookie from "cookie-universal";
import { ScreenSizeContext } from "../../context/ScreenSizeContext";
import { Menue } from "../../context/MenuContext";

import LoadingSubmit from "../../component/loading/loading";

import axios from "axios";
import { Link } from "react-router-dom";
import TableShow from "../../component/dashboard/TableShow";
// import TransformDate from "../../Healpers/TransformDate";




export default function Category() {
  const screenSize = useContext(ScreenSizeContext);
  const screenWidth = screenSize.screenWidth;
  const menue = useContext(Menue);
  const isOpen = menue.isOpen;
  // --------------------
  // --------------------
  // -------------------state-----------
  const [category, setCategory] = useState([]);
  const [show, setShow] = useState(false);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  // const [curentUser, setCurentUser] = useState("");



  // --------------------cookei&&token-----------
  const cookie = Cookie();
  const token = cookie.get("e-commerce");

  // ------------------get All categories----------
  useEffect(() => {
    async function getCategories() {

      try {
        const response = await axios.get(`${basic}/${cats}?limit=${limit}&page=${page}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCategory(response.data.data);
        setTotal(response.data.total);




      } catch (error) {
        console.error("Error fetching users:", error);
      }


    }
    getCategories()
  }, [token,show, limit, page]);
  // -------------handel Delet category---------------
  async function handleDelet(id) {
    try {

      await axios.delete(`${basic}/${cat}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(() => { setShow((e) => { return !e }) })
    } catch (err) {
      console.log(err);
    }
  }
  // --------------------------------------
  
  const header = [
    
    { name: "Title" ,key:"title"},
    { name: "Image" ,key:"image"},
    { name: "created" ,key:"created_at"},
    { name: "updated" ,key:"updated_at"},

  ]

  //----------------------------SearchData----------------------

  // const filterData = category.filter((it) => it.title.toLowerCase().includes(setSearchFromContext.toLowerCase()))
  // --------------------------------------------------

  // --------------------------mapping Data-------------------------
  // const dataShow = category.map((e, index) => {

  //   return <tr key={index}>
  //     <td>{index + 1}</td>
  //     <td>{e.title}</td>
  //     <td>
  //       {/* <Image
        
  //       source={e.image}
  //     /> */}
  //       <img style={{ width: "40px", height: "40px" }} src={e.image} alt={"fdf"} />
  //     </td>
  //     <td>
  //       <div className="d-flex align-items-center justify-content-between gap-2">
  //         <Link
  //           to={`${e.id}`} // تأكد من استخدام الخاصية المناسبة هنا
  //           style={{ color: "green", cursor: "pointer", backgroundColor: "transparent" }}
  //         >
  //           <FaPenAlt />
  //         </Link>
  //         <MdDelete
  //           style={{ color: "red", fontSize: "18px", cursor: "pointer" }}
  //           onClick={() => handleDelet(e.id)} // تأكد من تعريف دالة onDelete
  //         />
  //       </div>
  //     </td>
  //   </tr>
  // }
  //   , [])

  return (
    <>
      {category ? (
        <div className=" w-100 p-3 ">

          <div className="d-flex align-items-center justify-content-between">
            <h1>Category page</h1>
            <Link className="btn btn-primary" to="/dashboard/category/add">Add category</Link>
          </div>
          <div
            style={{
              position: "fixed",
              top: "70px",
              left: "0",
              height: "100vh",
              width: "100%",
              backgroundColor: "rgba(0,0,0,0.2)",
              display: screenWidth < "768" && isOpen ? "block" : "none",
            }}
          ></div>
          <TableShow
            limit={limit}
            delete={handleDelet}
            setLimit={setLimit}
            header={header} 
            data={category}
            paginateData={category} setPage={setPage} 
            total={total} users={category}
            pagSearch={"categories"} 
            searchedName={cat}
            searchedKey={"title"}
            
            />

        </div>) : <LoadingSubmit />}
    </>
  )
}