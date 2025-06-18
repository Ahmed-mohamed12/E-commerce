import React, { useEffect, useState } from "react";
import { Button, Container, Dropdown, Form, Modal } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { BsCart3 } from "react-icons/bs";
import { basic, cats, LogOutUrl, userUrl } from "../../api";
import axios from "axios";
import { useContext } from "react";
import "./NavBar.css";
import StringSlice from "../../Healpers/StringSlice";
import SkeltonShow from "../../Healpers/SkeltonShow";
import { ScreenSizeContext } from "../../context/ScreenSizeContext";
import { Cart } from "../../context/CartChangerContext";
import { IoIosCloseCircle } from "react-icons/io";
import PlusMinus from "../../pages/dashboard/website/PlusMinus";
// import"../../pages/dashboard//website/Home.css"
import Cookie from "cookie-universal";
export default function NavBar() {
  // ----------State----------------
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const width = useContext(ScreenSizeContext);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [count, setCount] = useState(1);
  const [name, setName] = useState("");

  //------------------- get Cart context -----------------
  const { isChange } = useContext(Cart);
  // token-----------------------------------------------------
  // const cookie = Cookie();
  // const token = cookie.get("e-commerce");
  // ------------------get categories-----------------------------
  useEffect(() => {
    async function getCategories() {
      try {
        const response = await axios.get(`${basic}/${cats}`);
        setCategories(response.data.slice(-8));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    }
    getCategories();
  }, []);
  // get products in Cart
  useEffect(() => {
    const getProducts = JSON.parse(localStorage.getItem("product"));
    setProducts(getProducts);
  }, [isChange]);
  //  ------------handleDelete------------------
  const handleDelete = (id) => {
    const filteredProduct = products.filter((product) => product.id !== id);
    setProducts(filteredProduct);
    localStorage.setItem("product", JSON.stringify(filteredProduct));
  };
  // ------------changCount---------------------------
  const changCount = (id, btnCount) => {
    const getProducts = JSON.parse(localStorage.getItem("product" || []));
    const findProduct = getProducts.find((product) => product.id === id);
    findProduct.count = btnCount;

    localStorage.setItem("product", JSON.stringify(getProducts));
  };
  const productShow = products?.map((product, key) => (
    <div className="mb-4 position-relative" key={key}>
      <div className="d-flex align-items-start gap-2 flex-wrap">
        <IoIosCloseCircle
          onClick={() => {
            handleDelete(product.id);
          }}
          style={{
            width: "60px",
            height: "30px",
            position: "absolute",
            top: "0",
            right: "0",
            cursor: "pointer",
          }}
          className="text-danger"
        />

        <img
          src={
            "https://backend-e-commerce-production-a459.up.railway.app" +
            product.images[0].image
          }
          height={"100px"}
          style={{ objectFit: "cover" }}
          className="rounded col-sm-3 col-md-4 col-12"
          alt="img"
        />
        <div className="col-sm-6 col-12">
          <h6>{product.title}</h6>
          <p className="m-0 text-truncate">{product.description}</p>
          <div className="d-flex align-items-center gap-3">
            <h5 className="m-0 text-primary">{product.discount}</h5>
            <h6
              className="m-0"
              style={{ color: "gray", textDecoration: "line-through" }}
            >
              {product.price}$
            </h6>
          </div>
        </div>
        <PlusMinus
          id={product.id}
          count={product.count || 1}
          setCount={setCount}
          changCount={changCount}
        />
      </div>
    </div>
  ));
  const categoriesShow = categories.map((category, index) => (
    <p key={index} className="m-0">
      {StringSlice(category.title, 15)}
    </p>
  ));
  const cookie = Cookie();
  const token = cookie.get("e-commerce");

  // useEffect(() => {
  //   async function fetchUsers() {
  //     try {
  //       // setIsLoading(true);
  //       // current user------------------
  //       await axios
  //         .get(`${basic}/${userUrl}`, {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         })
  //         .then((data) => setName(data.data.name));
  //     } catch (error) {
  //       Navigate("/login", { replace: true });
  //     }
  //     //  finally {
  //     //   setIsLoading(false);
  //     // }
  //   }

  //   fetchUsers();
  //   // eslint-disable-next-line
  // }, [token]);

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
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>{productShow}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <nav py-3>
        <Container>
          <div className="d-flex justify-content-between align-items-center flex-wrap">
            <Link to="/" className="col-3">
              <img
                src={require("../../assets/images/logo.jpg")}
                alt="..."
                width="120px"
              />
            </Link>

            <div className="col-12 col-md-6 order-md-2 order-3 mt-md-0 mt-3 position-relative ">
              <Form.Control
                className="form-control custome-search py-3 rounded-0"
                type="search"
                placeholder="search product..."
              />
              <h3 className="btn btn-primary position-absolute top-0 end-0 h-100 line-height m-0 px-4 rounded-0 d-flex align-items-center justify-content-center ">
                search
              </h3>
            </div>
            <div className="col-6 col-md-3 d-flex align-items-center justify-content-end gap-4 order-md-3 order-2">
              <div onClick={handleShow} className="col-3">
                <BsCart3 style={{ fontSize: "40px", color: "#000" }} />
              </div>
              {!token && (
                <div className="d-flex gap-3">
                  <Link to={"/register"} className="col-6">
                    <FaUserCircle style={{ fontSize: "40px", color: "blue" }} />
                  </Link>
                  <Link to={"/login"} className="col-6">
                    <div
                      className="icon-login"
                      style={{ fontSize: "40px", zIndex: "55" }}
                    ></div>
                  </Link>
                </div>
              )}


              {token && (
                <div className="d-flex justify-content-end col-6 g-success">
                <Dropdown>
                  <Dropdown.Toggle variant="primary" id="dropdown-basic">
                    {name}
                   
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={handelLogOut}>Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                

                </div>
              )}
            </div>
          </div>

          <div className="mt-3">
            <div
              className="d-flex align-items-center justify-content-start flex-wrap gap-5"
              style={{ minWidth: 100 }}
            >
              {loading ? (
                <div className="d-flex align-items-center justify-content-start gap-5">
                  <SkeltonShow
                    length={
                      width.screenWidth > 833
                        ? "6"
                        : width.screenWidth < 833 && width.screenWidth > 600
                        ? "3"
                        : "1"
                    }
                    height="30px"
                    width="80px"
                    classes="col-lg-1 col-md-6 col-12"
                  />
                </div>
              ) : (
                categoriesShow
              )}
              {categories.length !== 0 ? (
                <Link className="text-black category-title" to="/AllProducts ">
                  Show All
                </Link>
              ) : (
                ""
              )}
            </div>
          </div>
        </Container>
      </nav>
    </>
  );
}
