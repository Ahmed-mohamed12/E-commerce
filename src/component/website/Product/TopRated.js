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
          tyle={{ position: "relative" }}
          className=" col-12 border d-flex align-items-center p-3 ustify-content-between rounded flex-wrap mb-2"
        >
          {/* <div style={{ position: "relativ" }}> */}
          <div
            alt="."
            className="col-md-4 col-12"
            style={{
              backgroundImage: `url('${props.img}')`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              height: "190px",
              position: "relative",
              
            }}
          ></div>
          <div
            style={{ position: "relative" }}
            className="m-1 col-md-7 col-12  p-3 h-100 d-flex  justify-content-start flex-column"
          >
            <div style={{ position: "relative" }}>
              <p className="text-truncate" style={{ color: "gray" }}>
                
                {props.title}
              </p>
              <p className="text-truncate" style={{ color: "gray" }}>
                
                {props.description}
              </p>
            </div>
            <div className="d-flex align-items-center justify-content-between pt-4">
              <div>
                {showGoldStars}
                {showEmptyStars}
                <div className="d-flex align-items-center gap-3">
                  <h5 className="m-0 text-primary">{props.discount}$</h5>
                  <h6
                    className="m-0 text-primary"
                    style={{ textDecoration: "line-through" }}
                  >
                    {props.price}$
                  </h6>
                </div>
              </div>
              <div className="border p-2 rounded">
                <FiShoppingCart fontSize={"30px"} style={{ outline: "none" }} />
              </div>
            </div>
          </div>
      {/* </div> */}
        </Link>
    </>
  );
}
