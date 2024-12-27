
import axios from "axios";
import { useState } from "react";
import { basic, cat } from "../../api";
import LoadingSubmit from "../../component/loading/loading";
import Cookie from "cookie-universal";
import  {Form}  from "react-bootstrap";
// import  Form  from "react-bootstrap";
// import "../../css/components/google.css";

// import { FcGoogle } from "react-icons/fc";

export default function AddCategory(){

    // state
    
    const [title, setTitle] = useState("")
    const [image, setImage] = useState("")


    // loading page
    const [loading, setLoading] = useState(false);

    // save token in cookie
    const cookie = Cookie();
    const token = cookie.get("e-commerce");
    
    // error
    // const [err, setErr] = useState("");
    //  const [flag, setFlag] = useState(true);


    // handleData

    // ----------------------------------------------------------
    // handel submit
   
    async function handelSubmit(e) {
        e.preventDefault()
        const form=new FormData()
        form.append('title',title)
        form.append('image',image)
        try {


            const res=await axios.post(`${basic}/${cat}/add`,
               form, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            setLoading(true)
            window.location.pathname = "/dashboard/category"
            console.log(res);

        } catch (err) {
            // err.response.status===422?setErr("email has alredy been taken"):setErr('');
            console.log(err);
        }
    }

    return (
        <>
            {loading && <LoadingSubmit />}
            <div className="container mt-3">
                <div className="row" style={{ hight: "90vh", width: "100%" }}>
                    <Form onSubmit={handelSubmit}>
                        <h1>add category</h1>
                        <div className="custom-form">
                            <Form.Group
                                className="mb-3 form-c"
                                controlId="exampleForm.ControlInput1"
                            >
                                <Form.Control
                                    type="text"
                                    placeholder="Title..."
                                    name="name"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    
                                />
                                <Form.Label>Title</Form.Label>
                            </Form.Group>
                            <Form.Group
                                className="mb-3 form-c"
                                controlId="exampleForm.ControlInput2"
                            >
                                <Form.Control
                                    type="file"
                                    // placeholder="email@example.com"
                                    name="image"
                                    
                                    onChange={(e) => setImage(e.target.files.item(0))}
                                    
                                    required
                                />
                                <Form.Label>image</Form.Label>


                            </Form.Group>
                            
                            
                            <button disabled={title !=="" ?false:true} type="submit" className="btn btn-primary">
                                Add category
                            </button>
                            {/* {err ?  (
                                <span className="error">{err}</span>
                            ):""} */}
                        </div>
                    </Form>
                </div>
            </div>
        </>
    )
}