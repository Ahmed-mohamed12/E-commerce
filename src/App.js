// import { useState } from 'react';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import { Route, Routes } from 'react-router-dom';
 import './App.css';
 import './css/components/form.css';
import './css/components/button.css';
import './css/components/alert.css';
import './css/components/loading.css';
import './component/dashboard/Bars.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import Users from './pages/dashboard/users';
import GoogleCallBack from './pages/Auth/GoogleCallBack';
import Dashboard from './pages/dashboard/Dashboard';
import RequireAuth from './pages/Auth/RequierAuth';
import UpdateUser from './pages/dashboard/UpdateUser';
import AddUser from './pages/dashboard/AddUser';
import AddCategory from './pages/dashboard/AddCategory';
// import Page403 from './pages/Auth/Page403';

import Page404 from './pages/Auth/Page404';
import RequireBack from './pages/Auth/RequireBack';
// import Products from './pages/dashboard/Category';
import Category from './pages/dashboard/Category';
import UpdateCategory from './pages/dashboard/UpdateCategory';
import UpdateProduct from './pages/dashboard/UpdateProduct';
import Products from './pages/dashboard/Products';
import AddProduct from './pages/dashboard/AddProduct';
import HomePage from './pages/dashboard/website/HomePage';
import Website from './pages/dashboard/website/Website';
import SingleProduct from './pages/SingleProduct';
import AllProducts from './pages/dashboard/website/AllProducts';


function App(){
  return(<>
    <Routes>
      {/* bublic routes */}
      {/* to prevent more request on change pages */}
      <Route element={<Website />} >
      <Route path='/' element={<HomePage />}/> 
      <Route path='/AllProducts' element={<AllProducts />} />
      <Route path='/product/:id' element={<SingleProduct />}/> 
      
      </Route> 
      <Route  element={<RequireBack/>} >
      <Route path='/register' element={<Register />} /> 
      <Route path='/login' element={<Login />} />
      </Route>
      <Route path="*" element={<Page404 />}/>
      <Route path='/Auth/google/callback' element={<GoogleCallBack />} /> 
      {/* private routes */}
      <Route  element={<RequireAuth alowedRole={["1995","1999"]}/>} > 
      <Route path='/dashboard' element={<Dashboard />} > 
      {/* <Route path='403' element={<Page403 />}/> */}
      
      
      <Route  element={<RequireAuth alowedRole={['1995']}  />} >
      <Route path='users' element={<Users />}/>
      <Route path='users/:id' element={<UpdateUser />}/>
      <Route path='user/add' element={<AddUser />}/>
      </Route>
      <Route  element={<RequireAuth alowedRole={["1999","1995"]}  />} >
      {/* category */}
      <Route path='category' element={<Category />}/>
      <Route path='Category/add' element={<AddCategory />}/>
      <Route path='category/:id' element={<UpdateCategory />}/>
      {/* products */}
      <Route path='products' element={<Products />}/>
      <Route path='product/add' element={<AddProduct />}/>
      <Route path='products' element={<Products />}/>
      
      <Route path='products/:id' element={<UpdateProduct />}/>

      </Route>
     
        
        
         
        </Route> 

        </Route> 
      
    </Routes>
    
  </>
    )


  
}

export default App;