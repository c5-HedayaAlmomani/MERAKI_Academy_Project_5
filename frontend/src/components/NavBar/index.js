import axios from "axios";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutAction } from "../../redux/reducers/auth";
import { setShoeAction } from "../../redux/reducers/brand";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { getSearchAction } from "../../redux/reducers/sreach";
import Getbrand from "../getbrand";

import "./style.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [Check,setCheck]=useState(false)

  const [searchArray, setsearchArray] = useState([]);

  const { isLoggedIn, search, products, brands, category, show } = useSelector(
    (state) => {
      return {
        isLoggedIn: state.auth.isLoggedIn,
        search: state.search.search,
        products: state.products.products,
        brands: state.brands.brands,
        category: state.category.category,
        show: state.brands.show,
      };
    }
  );
// const Check=false
  const searchFunction = (searchInput) => {
    if (searchInput.length === 0) {
      setsearchArray([]);
      setCheck(false)
    } else {
      axios
        .get(`http://localhost:5000/products`)
        .then((result) => {
          const search1 = result.data.result.filter((element, index) => {
            return element.title.includes(searchInput);
          });
          if(search1.length===0){
            setCheck(false)

          }else{
            setCheck(true)

          }
          setsearchArray(search1);
        })
        .catch((err) => {
          console.log(err);
          console.log("search1");
        });
    }
  };

  return (
    <div className="navv">
      
        <div className="navbar">
          <i
            onClick={() => {
              dispatch(setShoeAction(!show));
            }}
            className="first_icon"
            class="fa fa-bars"
            aria-hidden="true"
          ></i>
          <img
            className="logo_img"
            src="https://res.cloudinary.com/hudhud/image/upload/v1655027682/maxqgc69/jewjejpruuyddsyu4uis.png"
          />

<Link className="All_Product_nav" to="product">
        All Product
      </Link>


          <input
            placeholder="    SEARCH"
            className="search"
            onChange={(e) => {

              searchFunction(e.target.value);
            }}
          />
          {isLoggedIn ? (
            <>
              <Link className="cart" to="/cart">
                <i class="fa fa-cart-plus" aria-hidden="true"></i>
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
    </div>
  );
};

export default Dashboard;
