import "./App.css";
import NavBar from "./components/NavBar";
import Register from "./components/register/index";
import Login from "./components/login/index";
import Product from "./components/product/index";
import Cart from "./components/cart";
import OneProduct from "./components/oneProduct";
import Brand from "./components/brand/beands";
import Category from "./components/Category/category";
import CategoryAdmin from "./components/categoryAdmin";
import { Routes, Route } from "react-router-dom";
import CatByBrand from "./components/CatByBrand";
import ProCB from "./components/ProCB";
import UsersComponent from "./components/users"; 
import AdminDashbord from "./components/adminDashbord";
import Upload from "./components/upload";

function App() {

  return (
    <div className="App">
  
        Welcome APP
        <NavBar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/product" element={<Product />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/product/:id" element={<OneProduct />}></Route>
          <Route path="/" element={<Brand />}></Route>
          // <Route path="/category" element={<Category />}></Route>
          <Route path="/Admin/category" element={<CategoryAdmin />}></Route>
          <Route path="/allCategory/:brand" element={<CatByBrand />}></Route>
          <Route
            path="/allCategory/:brand/PRO/:brand/:category"
            element={<ProCB />}
          ></Route>
          <Route path="/Admin/users" element={<UsersComponent />}></Route>
          <Route path="/Admin" element={<AdminDashbord />}></Route>
        </Routes>
     
   
   <Upload />
    </div>
  );
}

export default App;
