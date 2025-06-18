import React from "react";
import { RiStarSLine, RiStarSFill } from "react-icons/ri";
import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";

// import StringSlice from "../../../Healpers/StringSlice";

export default function TopRated(props) {
  const roundStars = Math.round(props.rating);
  const stars = Math.min(roundStars, 5);
  const showGoldStars = Array.from({ length: stars }).map((_, index) => (
    <RiStarSFill color="gold" key={index} fontSize={"30"} />
  ));
  const showEmptyStars = Array.from({ length: 5 - stars }).map((_, index) => (
    <RiStarSLine key={index} fontSize={"30"} />
  ));
  return (
    <>
      
        <Link
          to={`/product/${props.id}`}
          tyle={{ position: "relative",Highlight:"300px" }}
          className="col-12 col-md-6 col-lg-6  border pt-2 p-3 justify-content-between rounded flex-wrap mb-2"
        >
          {/* <div style={{ position: "relativ" }}> */}
          {/* <div
            alt="."
            className=" col-12"
            style={{
              backgroundImage: `url('${props.img}')`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              height: "300px",
              position: "relative",
              marginBottom:"5px",
              
              
            }}
          ></div> */}
          <div className="d-flex flex-column " >

          
          <div className="d-flex align-items-center justify-content-center " style={{overflow:"hidden",height: "300px",maxHeight:"300px",position: "relative",}}> 
                <img
          src={props.img}
          alt=".."
          className="img-fluid"
          style={{display:"block",maxHeight:"100%",maxwidth:"100%"}}
         
        />
        </div>
          <div
            style={{ position: "relative" }}
            className="m-1 col-12  p-3 h-100 d-flex  justify-content-start flex-column"
          >
            <div style={{ position: "relative" }}>
              <p className="text-truncate" style={{ color: "gray" }}>
                
                {props.title}
              </p>
              <p className="text-truncate" style={{ color: "gray" }}>
                
                {props.description}
              </p>
            </div>
            <div className="d-flex align-items-center justify-content-between pt-4" >
              <div>
                {showGoldStars}
                {showEmptyStars}
                <div className="d-flex align-items-center gap-3">
                  <h5 className="m-0 text-primary">{props.price}$</h5>
                  <h6
                    className="m-0 old-price"
                    
                   
                  >
                    {props.discount}$
                  </h6>
                </div>
              </div>
              <div className="border p-2 rounded">
                <FiShoppingCart fontSize={"30px"} style={{ outline: "none" }} />
              </div>
            </div>
          </div>
          </div>
      {/* </div> */}
        </Link>
    </>
  );
}
