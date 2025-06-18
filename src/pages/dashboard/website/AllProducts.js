import React, { useEffect, useState } from "react";
import { basic, cats, pros } from "../../../api";
import axios from "axios";
import StringSlice from "../../../Healpers/StringSlice";
import { Container } from "react-bootstrap";
import Product from "../../../component/website/Product/Product";
import SkeltonShow from "../../../Healpers/SkeltonShow";
// import Category from '../Category';

export default function AllProducts() {
  const [allProducts, setAllProducts] = useState([]);
   const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getProducts() {
      try {
        const response = await axios.get(`${basic}/${pros}`);
        console.log(response.data);
        setAllProducts(response.data.slice(-15));
        
        setLoading(false)
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false)
      }
    }
    getProducts();
  }, []);
  const productsShow = allProducts.map((product,index) => (
    // <div className="col-lg-4 col-md-6 col-12 bg-transparent border-0 ">
    //   <div className="m-1 bg-white border d-flex flex-wrap justify-content-start gap-3 rounded py-2 h-100 ">
    //     <img className="ms-3" width="50px" src={"https://backend-e-commerce-production-a459.up.railway.app"+category.images[1]?.image} alt="img" />
    //     <p>
    //       {StringSlice (category.title,6)}
    //     </p>
    //   </div>
    // </div>
    <Product key={index} 
          title={product.title}
          description={product.description}
           img={product?.images[0]?.image}
          sale
          price={product.price}
          discount={product.discount}
          rating={product.rating}
          col="3"
          id={product.id}
        />
  ));
  return (
    <>
      <div className="bg-secondar py-5">
        <Container>
          <div className="d-flex flex-wrap align-items-stretch justify-content-center row-gap-4">
            {loading?(
                                
            
            
                     <SkeltonShow length="6" height="300px" width="300px"/>
                              
                       
                        
                      ):(productsShow)}
          </div>
        </Container>
      </div>
    </>
  );
}
