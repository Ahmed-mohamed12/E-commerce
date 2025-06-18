import { basic, pro, pros } from "../../api";
import { useContext, useEffect, useState } from "react";
import Cookie from "cookie-universal";
import { ScreenSizeContext } from "../../context/ScreenSizeContext";
import { Menue } from "../../context/MenuContext";
import axios from "axios";
import { Link } from "react-router-dom";
import TableShow from "../../component/dashboard/TableShow";
export default function Products() {
  const screenSize = useContext(ScreenSizeContext);
  const screenWidth = screenSize.screenWidth;
  const menue = useContext(Menue);
  const isOpen = menue.isOpen;
  // --------------------
  // -------------------state-----------
  const [products, setProducts] = useState([]);
  // eslint-disable-next-line
  // const [categories, setCategories] = useState([]);
  const [show, setShow] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [total, setTotal] = useState(0);
  // ---------------cookei&&token-----------
  const cookie = Cookie();
  const token = cookie.get("e-commerce");

// ------------------get All Products----------
  useEffect(()=>{
    async function getCategorie() {
   
      try {
        const response = await axios.get(`${basic}/${pros}?limit=${limit}&page=${page}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        setProducts(response.data.data);
        setTotal(response.data.total);
        
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    
   
  }
  getCategorie()
}, [token, show,limit,page]);

  // -------------handel Delet produc---------------
  async function handleDelet(id) {
    try {await axios.delete(`${basic}/${pro}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(
        () => { setShow((e) => { return !e })})
   
    } catch (err) {
      console.log(err);
    }
    
  }


const header = [

  {name:"Title",key:"title"},
  {name:"image",key:"images"},
  {name:"Discription",key:"description"},
  {name:"Price",key:"price"},
  {name:"stock",key:"stock"},
  {name:"Rate",key:"rating"},
  { name: "created" ,key:"created_at"},
    { name: "updated" ,key:"updated_at"},
]


  return (
<>

    <div className=" w-100 p-3 ">
      
      <div className="d-flex align-items-center justify-content-between">
        <h1>Products page</h1>
        <Link className="btn btn-primary" to="/dashboard/category/add">Add Product</Link>
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
      <TableShow header={header} data={products} total={total} paginateData={products} limit={limit}
      delete={handleDelet} setLimit={setLimit} setPage={setPage} users={products}
      searchedName={pro}
      searchedKey={"title"}
      />
    </div>
</>
  )
}