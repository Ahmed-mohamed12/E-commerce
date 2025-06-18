import React, { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import ImageGallery from "react-image-gallery";
import { useParams } from "react-router-dom";
import { basic, cart, pro } from "../api";
import axios from "axios";
import Cookie from "cookie-universal";
import { RiStarSFill, RiStarSLine } from "react-icons/ri";
import { FiShoppingCart } from "react-icons/fi";
import SkeltonShow from "../Healpers/SkeltonShow";
import { Cart } from "../context/CartChangerContext";
import PlusMinus from "./dashboard/website/PlusMinus";
export default function SingleProduct() {
  const cookie = Cookie();
  const token = cookie.get("e-commerce");
  // state
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [productImages, setProductImages] = useState([]);
  const { id } = useParams();
  const [count, setCount] = useState(1);

  //   ---------
  const roundStars = Math.round(product.rating);
  const stars = Math.min(roundStars, 5);
  const showGoldStars = Array.from({ length: stars }).map((_, index) => (
    <RiStarSFill color="gold" key={index} fontSize={"30"} />
  ));
  const showEmptyStars = Array.from({ length: 5 - stars }).map((_, index) => (
    <RiStarSLine key={index} fontSize={"30"} />
  ));
  //   -------------------------------
  //  --------------------------------------
const {setIsChange}=useContext(Cart);
// ------------------------------------------
  
  useEffect(() => {
    axios
      .get(`${basic}/${pro}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setProductImages(
          res.data[0].images.map((img) => {
            return { original:img?.image, thumbnail:img?.image };
          })
        );
        setProduct(res.data[0]);
      })
      .finally(() => setLoading(false));
      // eslint-disable-next-line
  }, []);
  // ------------check stock---------------
  const checkStock=async()=>{
    try{
  const getItems=JSON.parse(localStorage.getItem("product"))|| []
const productCount=getItems.filter(item=>item.id ==id)?.[0]?.count;
      await axios.post(`${basic}/${cart}/check`,{
        product_id:product.id,
        count:count+ ( productCount ?productCount:0)
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return true
    }catch(err){
console.log(err);
return false
    }finally{

    }
  }
// handleSave
const handleSave=()=>{
   const check=checkStock()
  if(check){
    const getItems=JSON.parse(localStorage.getItem("product"))|| []
    // check if product exist or No
  const productExist=getItems.findIndex((pro)=>pro.id == id);
  if(productExist!== -1){
    if(getItems[productExist].count){
      getItems[productExist].count += count;
    }else{
      getItems[productExist].count = count
    }
  }else{
    if(count > 1 ){
      product.count =count
    }
    getItems.push(product)

  }
  
  localStorage.setItem("product",JSON.stringify(getItems))
  setIsChange((prev)=>!prev)
}}
  return (
    <>
      <Container className="mt-5">
        <div className="d-flex align-items-start flex-wrap">
          {loading ? (
            <div className="col-lg-4 col-md-6 col-12">
            <SkeltonShow
              height="250px"
              length="1"
              classes="col-12"
            />
             <div className="col-12 d-flex mt-1">
            <SkeltonShow
              height="100px"
              length="1"
              classes="col-4"
            />
            <SkeltonShow
              height="100px"
              length="1"
              classes="col-4"
            />
            <SkeltonShow
              height="100px"
              length="1"
              classes="col-4"
            />
            </div>
            </div>
          ) : (
            <>
              <div className="col-lg-4 col-md-6 col-12">
                <ImageGallery
                  items={productImages}
                  showFullscreenButton={false}
                />
              </div>
              <div className="col-lg-8 col-md-6 col-12">
                <div className="ms-5">
                  <h1>{product.title}</h1>
                  <p>{product.About}</p>
                  <h3>{product.description}</h3>
                  <div className="d-flex align-items-center justify-content-between mt-2 border-top pt-4 flex-wrap">
                    <div>
                      {product.stock==1&&( 
                        <p className="text-danger">ther is only 1 left </p>)}
                      {showGoldStars}
                      {showEmptyStars}

                      <div className="d-flex align-items-center gap-3">
                        <h5 className="m-0 text-primary">{product.price}$</h5>
                        <h6
                          className="m-0"
                          style={{
                            color: "gray",
                            textDecoration: "line-through",
                          }}
                        >
                          {product.discount}$
                        </h6>
                      </div>
                    </div>
                    <div className="d-flex gap-3">
                    <PlusMinus setCount={(data)=>setCount(data)} count={count} />
                    <div  className="border p-2 rounded">
                      <FiShoppingCart
                      onClick={handleSave}
                      fontSize={"30px"}
                      style={{ outline: "none" }}
                      />
                    </div>
                      </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </Container>
    </>
  );
}
