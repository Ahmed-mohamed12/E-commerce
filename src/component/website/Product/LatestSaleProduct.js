import axios from "axios";
import React, { useEffect, useState } from "react";
import { basic, latestSale } from "../../../api";
import Product from "./Product";
import { Container } from "react-bootstrap";


// import Skeleton from "react-loading-skeleton";
import SkeltonShow from "../../../Healpers/SkeltonShow";
export default function LatestSaleProduct() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getProducts() {
      try {
        const response = await axios.get(`${basic}/${latestSale}`);
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
    <Product key={index} 
      title={product.title}
      description={product.description}
       img={product?.images?.[0]?.image}
      sale
      price={product.price}
      discount={product.discount}
      rating={product.rating}
      col="3"
      id={product.id}
    />
  ));
  // ----------------------------
  

  // ----------------------------
  return (
    <>
      <Container className="mt-5 mb-5">
        <h1>latest sale products</h1>
        <div className="d-flex align-items-stretch justify-content-center flex-wrap row-gap-5">
          {loading?(
                    


         <SkeltonShow length="4" height="300px" width="300px"/>
                  
           
            
          ):(productsShow)}
        </div>
        <div className="mt-5 px-3 d-flex justify-content-between align-items-center matger">
          <div className="col-lg-5 col-md-3 col-12 text-md-start text-center">
          <h1>Shampoo Nice</h1>
          <h3 style={{fontSize:"20px"}}>Another nice thing which is used by someone i don't know (just random text)</h3>
          </div>
          
        </div>
        
      </Container>
    </>
  );
}
