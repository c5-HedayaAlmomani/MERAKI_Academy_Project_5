import "./App.css";
import Dashboard from "./components";
import Register from "./components/register/index";
import Login from "./components/login/index";
import Product from "./components/product/index";
import Cart from "./components/cart";
import OneProduct from "./components/oneProduct";
import Brand from "./components/brand/beands";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      Welcome APP
      <Dashboard />
      <Routes>
        {/* <Route path="/" element={<Dashboard />}></Route> */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/product" element={<Product />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/product/:id" element={<OneProduct />}></Route>
        <Route path="/brand" element={<Brand />}></Route>
      </Routes>
    </div>
  );
}

export default App;
