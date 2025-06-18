
import axios from "axios";
import { useEffect, useState } from "react";
import {  basic, userUrl } from "../../api";
import LoadingSubmit from "../../component/loading/loading";
import Cookie from "cookie-universal";
import Form from "react-bootstrap/Form";
import "../../css/components/google.css";
import { useNavigate, useParams } from "react-router-dom";
// import { FcGoogle } from "react-icons/fc";

export default function UpdateUser() {
  const params=useParams()
  const id=params.id;
  const nav=useNavigate()
  // state
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [role, setRole] = useState("")
  const [disabled, setDisabled] = useState(true)
 console.log(name);

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
     axios.get(`${basic}/${userUrl}/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
    .then((data)=> {
      setName( data.data.name);
      setEmail( data.data.email)
      setRole( data.data.role)}
      ).then(()=>setDisabled(false))
      .catch(()=>{nav("/dashboard/page/404" ,{replace:true})})
      
  },[id,nav,token])
  // ----------------------------------------------------------
  // handel submit
 async function handelSubmit(e){
e.preventDefault()
await axios.post(`${basic}/${userUrl}/edit/${id}`,
 { name:name,
  email:email,
  role:role
}, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
setLoading((e)=>{return !e})
window.location.pathname="/dashboard/users"
 }

  return (
    <>
      {loading && <LoadingSubmit />}
      {role?
      <div className="container mt-3">
        <div className="row" style={{ hight: "90vh" ,width:"100%"}}>
        <Form onSubmit={handelSubmit}>
              <h1>UpdateUser</h1>
            <div className="custom-form">
              <Form.Group
                className="mb-3 form-c"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Control
                  type="name"
                  placeholder="name..."
                  name="name"
                  value={name}
                  onChange={(e)=>setName(e.target.value)}
                  required
                />
                <Form.Label>Name</Form.Label>
              </Form.Group>
              <Form.Group
                className="mb-3 form-c"
                controlId="exampleForm.ControlInput2"
              >
                <Form.Control
                  type="email"
                  placeholder="email@example.com"
                  name="email"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                   minLength={6}
                  required
                />
                <Form.Label>email</Form.Label>
           
        
              </Form.Group>
              <Form.Group
                className="mb-3 form-c"
                controlId="exampleForm.ControlInput3"
              >
                <Form.Select
                  
                  
                  name="role"
                  value={role}
                  onChange={(e)=>setRole(e.target.value)}
                  
                  >
                    <option select={"true"}>select role</option>
                    <option value={'1995'}>admin</option>
                    <option value={'2001'}>user</option>
                    <option value={'1996'}>writer</option>
                  </Form.Select>
                <Form.Label>role</Form.Label>
           
        
              </Form.Group>
                <button type="submit" className="btn btn-primary" disabled={disabled}>
                  Update
                </button>
                {/* {err !== "" && flag && (
                  <span className="error">{err}</span>
                )} */}
            </div>
          </Form>
        </div>
      </div>
      :<LoadingSubmit />}
    </>
  )
 }