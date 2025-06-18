import React, { useEffect, useState } from "react";
import { basic, latest } from "../../../api";
import axios from "axios";
import SkeltonShow from "../../../Healpers/SkeltonShow";
import Product from "./Product";

export default function ShowLatestProducts(props) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getProducts() {
      try {
        const response = await axios.get(`${basic}/${latest}`);
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    }
    getProducts();
  }, []);
  //  console.log(products[1].images[0].image);
  const productsShow = products.map((product, index) => (
    <Product
      key={index}
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
      <div className=" col-md-12 col-12  mt-1">
      <div className="">
        <h1 className="m-0 bg-primary text-white p-3">latest products</h1>
        <div className="d-flex align-items-stretch justify-content-center flex-wrap row-gap-5">
          {loading ? (
            <SkeltonShow length="4" height="300px" width="300px" />
          ) : (
            productsShow
          )}
        </div>
        
      </div>
      </div>
    </>
  );
}
