
import axios from "axios";
import { useEffect, useState } from "react";
import {  basic, cat } from "../../api";
import LoadingSubmit from "../../component/loading/loading";
import Cookie from "cookie-universal";
import Form from "react-bootstrap/Form";
import "../../css/components/google.css";
import { useNavigate, useParams } from "react-router-dom";
// import { FcGoogle } from "react-icons/fc";

export default function UpdateCategory() {
  const params=useParams()
  const id=params.id;
  const nav=useNavigate()
  // state
  const [title, setTitle] = useState("")
  const [image, setImage] = useState("")
  const [disabled, setDisabled] = useState("")
  
  // loading page
  const [loading, setLoading] = useState(false);

  // save token in cookie
  const cookie = Cookie();
  const token = cookie.get("e-commerce");
  
  // error
  // const [err, setErr] = useState("");
  // const [flag, setFlag] = useState(false);

  

  // handleData
  useEffect(()=>{
     axios.get(`${basic}/${cat}/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
    .then((data)=> {
      setTitle( data.data.title);
      setImage( data.data.image);
    }
      ).then(()=>setDisabled(false))
      .catch(()=>{nav("/dashboard/page/404" ,{replace:true})})
      // eslint-disable-next-line 
  },[token])
  // ----------------------------------------------------------
  // handel submit
 async function handelSubmit(e){
e.preventDefault();
const form=new FormData()
form.append('title',title)
form.append('image',image)
await axios.post(`${basic}/${cat}/edit/${id}`,
 form, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
setLoading((e)=>{return !e})
console.log(title);
window.location.pathname="/dashboard/category"
 }

  return (
    <>
      {/* {loading && <LoadingSubmit />} */}
      
      <div className="container mt-3">
        <div className="row" style={{ hight: "90vh" ,width:"100%"}}>
        <Form onSubmit={handelSubmit}>
              <h1>UpdateCategory</h1>
            <div className="custom-form">
              <Form.Group
                className="mb-3 form-c"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Control
                  type="text"
                  placeholder="Title..."
                  name="title"
                  value={title}
                  onChange={(e)=>setTitle(e.target.value)}
                  required
                />
                <Form.Label>Title</Form.Label>
              </Form.Group>
              <Form.Group
                className="mb-3 form-c"
                controlId="exampleForm.ControlInput2"
              >
                <Form.Control
                  type="file"
                  
                  name="image"
                  
                  onChange={(e) => setImage(e.target.files.item(0))}
                   
                  required
                />
                <Form.Label>Image</Form.Label>
           
        
              </Form.Group>
              
                <button type="submit" className="btn btn-primary" disabled={disabled}>
                  Update category
                </button>
                {/* {err !== "" && flag && (
                  <span className="error">{err}</span>
                )} */}
            </div>
          </Form>
        </div>
      </div>
      
    </>
  )
 }