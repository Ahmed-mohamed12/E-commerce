import axios from "axios";
import React, { useEffect, useState } from "react";
import { basic, topRated } from "../../../api";

// import { Container } from "react-bootstrap";


// import Skeleton from "react-loading-skeleton";
// import SkeltonShow from "../../../Healpers/SkeltonShow";
import TopRated from "./TopRated";
import SkeltonShow from "../../../Healpers/SkeltonShow";

export default function ShowTopRated() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getProducts() {
      try {
        const response = await axios.get(`${basic}/${topRated}`);
        setProducts(response.data);
        setLoading(false)
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false)
      }
    }
    getProducts();
  }, []);
//  console.log(products[1].images[0].image);
  const productsShow = products.map((product,index) => (
    <TopRated key={index} 
      title={product.title}
      description={product.description}
       img={"https://backend-e-commerce-production-a459.up.railway.app"+product?.images?.[0]?.image}
      price={product.price}
      discount={product.discount}
      rating={product.rating}
      id={product.id}
    />
  ));
  // ----------------------------
  

  // ----------------------------
  return (
    <>
        <div className=" col-md-6 col-12 " style={{border:"blue 3px solid"}}>
        

        <h1 className="m-0 bg-primary text-white text-center p-3">Top Rated</h1>
        
        <div className="d-flex flex-column p-3">
          {loading ? (
            <SkeltonShow length="1" height="300px" width="100%" />
          ) : (
           
            productsShow
          )}
        </div>
        </div>
      
    </>
  );
}
