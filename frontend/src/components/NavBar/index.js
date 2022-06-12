import axios from "axios";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutAction } from "../../redux/reducers/auth";

import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { getSearchAction } from "../../redux/reducers/sreach";
import Getbrand from "../getbrand";

import "./style.css";

const Dashboard = () => {

  const [show, setShow] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchArray, setsearchArray] = useState([]);

  const { isLoggedIn, search, products, brands, category } = useSelector(
    (state) => {
      return {
        isLoggedIn: state.auth.isLoggedIn,
        search: state.search.search,
        products: state.products.products,
        brands: state.brands.brands,
        category: state.category.category,
      };
    }
  );

  const searchFunction = (searchInput) => {

    if(searchInput.length===0){
      setsearchArray([]);

    }else{
      axios
      .get(`http://localhost:5000/products`)
      .then((result) => {
        // console.log("result", result);

        const search1 = result.data.result.filter((element, index) => {
          return element.title.includes(searchInput);
        });
        setsearchArray(search1);


      })
      .catch((err) => {
        console.log(err);
        console.log("search1");
      });
  };

  return (
    <div>
      <div>
        {/* <div className="icon_bar">
          <i
            onClick={() => {
              setShow(!show);
            }}
            className="fa fa-bars"
            aria-hidden="true"
          ></i>
        </div> */}
      
        {/* {show && ( */}

        
          <div className="navbar">
              <i onClick={()=>{
                setShow(!show)
              }} className="first_icon" class="fa fa-bars"
            aria-hidden="true"
          ></i>
            <img className="logo_img" src="https://res.cloudinary.com/hudhud/image/upload/v1655027682/maxqgc69/jewjejpruuyddsyu4uis.png" />

            {show && (<Link className="All_Product" to="product">
              All Product
            </Link>)}
            {show && (<Link className="All_Brand" to="/">All Brand</Link>)}
            {show && (<Link className="All_Order" to="/order">All Order</Link>)}
           
            <input placeholder="    SEARCH"
              className="search"
              onChange={(e) => {
                searchFunction(e.target.value);
              }}
            />
            {isLoggedIn ? (
              <>
                <Link className="cart" to="/cart">
                <i  class="fa fa-cart-plus" aria-hidden="true"></i>
                </Link>
                <a
                  className="logout"
                  onClick={() => {
                    dispatch(logoutAction());
                    navigate("/");
                  }}
                >
                  Logout
                </a>
              </>
            ) : (
              <>
                <Link className="login_link" to="/login">
                  Login
                </Link>
                <Link className="register_link" to="/register">
                  Sign up
                </Link>
              </>
            )}
          </div>
        


        <div></div>
      </div>
      {searchArray.length &&
        searchArray.map((element, index) => {
          return (
            <div
              onClick={() => {
                navigate(`/product/${element.id}`);
              }}
            >
              <img
                className="Serch_title"
                src={element.image}
                alt="image product"
              />
              <p className="Serch_title">{element.title}</p>
            </div>
          );
        })}


      <div></div>

      {show && (<Getbrand />)}

    </div>
  );
};

export default Dashboard;
