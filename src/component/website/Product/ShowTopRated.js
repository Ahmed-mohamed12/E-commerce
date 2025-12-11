import axios from "axios";
import {React, useEffect, useState } from "react";
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
        console.log(response);
        setLoading(false)
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false)
      }
    }
    getProducts();
  }, []);
   const fakeProducts = [
      { id: 1, name: 'لابتوب ديل', price: 2500, rating: 4.5 },
      { id: 2, name: 'آيفون 14', price: 4000, rating: 4.8 },
      { id: 3, name: 'سماعات سوني', price: 800, rating: 4.7 }
    ];
   setProducts(fakeProducts);
 console.log(products);
  const productsShow = products.map((product,index) => (
    <TopRated key={index} 
      title={product.title}
      description={product.description}
       img={product.images[0].image}
      price={product.price}
      discount={product.discount}
      rating={product.rating}
      id={product.id}
    />
  ));
  console.log(productsShow);
  // ----------------------------
  

  // ----------------------------
  return (
    <>
        <div className=" col-md-12 col-12 col-lg-8  " style={{border:"blue 3px solid"}}>
        

        <h1 className="m-0 bg-primary text-white text-center p-3">Top Rated</h1>
        
        <div className="d-flex justify-content-between align-items-center flex-wrap lex-column p-3 row-gap-3">
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
