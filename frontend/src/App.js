import "./App.css";
import Dashboard from "./components";
import Register from "./components/register/index";
import Login from "./components/login/index";
import Product from "./components/product/index";
import Cart from "./components/cart";
import { useSelector, useDispatch } from "react-redux";
import { loginAction } from "./redux/reducers/auth";
import { Routes, Route, Link, useNavigate } from "react-router-dom";

function App() {
  return (
    <div className="App">
      Welcome APP
      <Dashboard />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/product" element={<Product />}></Route>
        <Route path="/cart" element={<Cart />}></Route>

      </Routes>
    </div>
  );
}

export default App;
