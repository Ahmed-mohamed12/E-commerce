import React, { useEffect, useState } from "react";
import { basic, cats } from "../../../api";
import axios from "axios";
import StringSlice from "../../../Healpers/StringSlice";
import { Container } from "react-bootstrap";
// import Category from '../Category';

export default function WebsiteCategories() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    async function getCategories() {
      try {
        const response = await axios.get(`${basic}/${cats}`);
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }
    getCategories();
  }, []);
  const categoriesShow = categories.map((category) => (
    <div className="col-lg-2 col-md-6 col-12 bg-transparent border-0 ">
      <div className="m-1 bg-white border d-flex flex-wrap justify-content-start gap-3 rounded py-2 h-100 ">
        <img className="ms-3" width="50px" src={category.image} alt="img" />
        <p>
          {StringSlice (category.title,6)}
        </p>
      </div>
    </div>
  ));
  return (
    <>
      <div className="bg-secondary py-5">
        <Container>
          <div className="d-flex flex-wrap align-items-stretch justify-content-center row-gap-4">
            {categoriesShow}
          </div>
        </Container>
      </div>
    </>
  );
}
