
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { basic, cats, pro } from "../../api";
import Cookie from "cookie-universal";
import  {Button, Form}  from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";


export default function UpdateProduct(){
    const openImages=useRef(null)
     const params=useParams()
     const id=params.id
    //------------------------------------ state--------------------------------
    // const [show, setShow] = useState(false);
    const [disabled, setDisabled] = useState(true)
    const [images, setImages] = useState([])
    const [imagesFromServer, setImagesFromServer] = useState([])
    // const [id, setId] = useState(null)
    const [form, setForm] = useState({
        category:"",
        title:"",
        description:"",
        price:"",
        discount:"",
        About:"",
        stock:"",
        rating:0

    })
  
    
    const [categories, setCategories] = useState([]);
    const [idFromServer, setIdFromServer] = useState([]);
    const progress=useRef([]);
    const ids=useRef([]);
    
    
    const nav=useNavigate()

    

// ------------------get All categories----------
useEffect(()=>{
    async function getCategories() {
   
      try {
        const response = await axios.get(`${basic}/${cats}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
         setCategories(response.data);
       
        
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    
   
  }
  getCategories()
  // eslint-disable-next-line
}, []);


useEffect(()=>{
    
    async function getProduct() {
      try {
         await axios.get(`${basic}/${pro}/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((data)=>{
            setForm(data.data[0]);
            setImagesFromServer(data.data[0].images);
        })
        
    
        
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    
   
  }
  getProduct()
  // eslint-disable-next-line
}, []);
const categoriesShow=categories.map((item,key)=>
<option key={key} value={item.id}>{item.title}</option>)

    // save token in cookie
    const cookie = Cookie();
    const token = cookie.get("e-commerce");

  //--------------------------- handel handelEdit----------------------------
async function handelEdit(e) {
    e.preventDefault()
   
    try {      

            for (let i = 0; i < idFromServer.length; i++) {
        await axios.delete(`${basic}/product-img/${idFromServer[i]}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
    }
        await axios.post(`${basic}/${pro}/edit/${id}`,
            form, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
       
         nav("/dashboard/products")
        

    } catch (err) {
        // err.response.status===422?setErr("email has alredy been taken"):setErr('');
        console.log(err);
    }
}
    // -----------------------------
    function handlechange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
        
        
      }
    const j=useRef(-1)
    async function handelImagesChange(e) {
        setImages((prev) => [...prev, ...e.target.files]);
        const imagesAsFiles = e.target.files;
        const data = new FormData();
        setDisabled(false)
        for (let i = 0; i < imagesAsFiles.length; i++) {
            j.current++
            data.append("image", imagesAsFiles[i]); // استخدام مفتاح مصفوفة
            data.append("product_id", id);
            
            try {
                const res = await axios.post(`${basic}/product-img/add`, data, {
                    onUploadProgress: (progressEvent) => {
                        const { loaded, total } = progressEvent;
                        
                        const percent=Math.floor((loaded * 100) / total)
                       
                        
                        
                        
                        // if (progress.current[i]) { // تحقق من وجود العنصر
                        if (percent % 10 === 0) {
                        progress.current[j.current].style.width = `${percent}`
                        progress.current[j.current].setAttribute('percent', `${percent}%`);
                            
                           
                        }
                    },
                    
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                
                ids.current[j.current]=res.data.id
                
            } 
            catch (err) {
                console.log(err);
            }
            
        }
        setDisabled(true)
    }
    
    //   ---------handel Images changes----------
    //   ---------handel Images Delete----------
    async function handelImagesDelete(id,img){
        const findId=ids.current[id];
        try{
            await axios.delete(`${basic}/product-img/${findId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            
            setImages(prev=>prev.filter((imge)=>imge!==img))
            ids.current=ids.current.filter((ids) =>ids !==findId)
            --j.current
        }catch(err){
            console.log(err);
        }
    }
    async function handelImagesDeleteFromServer(id){
        setImagesFromServer((prev)=>{return prev.filter((img)=>img.id !==id)})
        setIdFromServer((prev)=>{return[...prev,id]})
        
            
    }
    //  -------------------map on images------------
    const imagesShow=images.map((img,key)=>(
        <div key={key} className=" border p-2 w-100">
        <div  className="d-flex align-items-center justify-content-between gap-2 ">
        <div  className="d-flex align-items-center justify-content-start  ">
            

            
            <img src={URL.createObjectURL(img)} width='90px' alt="img"></img>
            <div>
                <p className="mb-1">{img.name}</p>
                <p>{(img.size / 1024)<900?(img.size / 1024).toFixed(2)+'kb':(img.size /( 1024 * 1024)).toFixed(2)+'mb' }</p>
            </div>
        </div>
            <Button onClick={()=>handelImagesDelete(key,img)} variant="danger">Delete</Button>
        </div>
        <div className="custom-progress mt-3">
                            <span 
                            ref={(e)=>{progress.current[key]=e}}
                            // percent={`${progress[key]}%`}
                            //  style={{width:`${progress[key]}%`}}
                             className="inner-progress"></span>
                            
                            </div>
        </div>
    ))
    
    const imagesFromServerShow=imagesFromServer.map((img,key)=>(
        <div key={key} className=" border p-2 col-2 position-relative">
        <div  className="d-flex align-items-center justify-content-between gap-2 ">

        <div  className="d-flex align-items-center justify-content-start  ">
            <img src={img.image} width='90px' alt="img"></img>   
        </div>
        <div  className="position-absolute top-0 end-0 bg-danger rounded text-white">
        <p  style={{cursor:"pointer"}}
        className="py-1 px-2 m-0 " onClick={()=>handelImagesDeleteFromServer(img.id)}>
             {/* <Button onClick={()=>handelImagesDelete(key,img)} variant="danger">Delete</Button> */}
            X
        </p>
        </div>
        </div>
        
        </div>
    ))

    return (
        <>
            
            <div className="container mt-3">
                <div className="row" style={{ height: "max-content", width: "100%" }}>
                    <Form onSubmit={handelEdit}>
                        <h1>Update a Product</h1>
                        <div className="custom-form mt-5" style={{minHeight:"max-content"}}>
                            <Form.Group
                                className="mb-3 form-c"
                                controlId="exampleForm.ControlInput1"
                            >
                                <Form.Select
                                   
                                    
                                    name="category"
                                    value={form.category}
                                    onChange={handlechange}
                                    
                                >
                                  <option disabled>Select Category</option>
                                   {categoriesShow}
                                </Form.Select>
                                <Form.Label>Category</Form.Label>
                            </Form.Group>
                            <Form.Group
                                className="mb-3 form-c"
                                controlId="exampleForm.ControlInput7"
                            >
                                <Form.Control
                                    type="text"
                                    placeholder="Title..."
                                     name="title"
                                    
                                    value={form.title}
                                    onChange={handlechange}
                                    
                                />
                                <Form.Label>Title</Form.Label>
                            </Form.Group>
                           
                            <Form.Group
                                className="mb-3 form-c"
                                controlId="exampleForm.ControlInput2"
                            >
                                <Form.Control
                                    type="text"
                                    placeholder="description..."
                                    name="description"
                                    
                                    value={form.description}
                                    onChange={handlechange}
                                    
                                />
                                <Form.Label>description</Form.Label>
                            </Form.Group>
                            <Form.Group
                                className="mb-3 form-c"
                                controlId="exampleForm.ControlInput3"
                            >
                                <Form.Control
                                    type="text"
                                    placeholder="price..."
                                    name="price"
                                    
                                     value={form.price}
                                    onChange={handlechange}
                                    
                                />
                                <Form.Label>price</Form.Label>
                            </Form.Group>
                            <Form.Group
                                className="mb-3 form-c"
                                controlId="exampleForm.ControlInput4"
                            >
                                <Form.Control
                                    type="text"
                                    placeholder="discount..."
                                    name="discount"
                                    
                                    value={form.discount}
                                    onChange={handlechange}
                                    
                                />
                                <Form.Label>discount</Form.Label>
                            </Form.Group>
                            <Form.Group
                                className="mb-3 form-c"
                                controlId="exampleForm.ControlInput5"
                            >
                                <Form.Control
                                    type="text"
                                    placeholder="About..."
                                    name="About"
                                    
                                    value={form.About}
                                    required
                                    onChange={handlechange}
                                    
                                />
                                <Form.Label>About</Form.Label>
                            </Form.Group>
                            <Form.Group
                                className="mb-3 form-c"
                                controlId="exampleForm.ControlInput5"
                            >
                             
                                <Form.Control
                                    type="number"
                                    placeholder=" stock..."
                                    name="stock"
                                    
                                    value={form.stock}
                                    required
                                    onChange={handlechange}
                                    
                                />
                                <Form.Label>stock</Form.Label>
                            </Form.Group>
                            <Form.Group
                                className="mb-3 form-c"
                                controlId="exampleForm.ControlInput6"
                            >
                                <Form.Control
                                    type="file"
                                    ref={openImages}
                                   hidden
                                   
                                    multiple
                                    onChange={handelImagesChange}
                                    
                                />
                                <Form.Label>images</Form.Label>
                            </Form.Group>
                            <div>

                            
                            <div onClick={()=>openImages.current.click()}
                            className="d-flex align-items-center justify-content-center flex-column gap-2 py-3 mb-2 rounded w-100
                            flex-column
                            " style={{border:"2px gray dashed",cursor:"pointer"}}>
                                <img src={require('../../assets/upload.jpeg')} alt="upload"
                                width={'100px'} style={{filter:" grayscale(100%)"}}/>
                                <p className="mb-0" style={{color:'gray'}}>upload images</p>
                            </div>
                            </div>
                            
                              <div className="d-flex align-items-start flex-column gap-2">
                                {imagesShow}
                              </div>
                              <div className="d-flex align-items-start  flex-wrap gap-2">
                              {imagesFromServerShow}
                              </div>
                            
                            <button disabled={form.title !=="" &&disabled?false:true} type="submit" className="btn btn-primary">
                                Update Product
                            </button>
                            
                        </div>
                    </Form>
                    
                </div>
            </div>
        </>
    )
}

