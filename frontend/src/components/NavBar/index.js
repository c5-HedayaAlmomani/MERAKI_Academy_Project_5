import axios from "axios"
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutAction } from "../../redux/reducers/auth";

import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { getSearchAction } from "../../redux/reducers/sreach";
import Getbrand from "../getbrand";

import "./style.css"

const Dashboard = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const [product, setProduct] = useState([]);
  const [searchArray, setsearchArray] = useState([]);

  const { isLoggedIn, search, products, brands, category } = useSelector((state) => {
    return {
      isLoggedIn: state.auth.isLoggedIn,
      search: state.search.search,
      products: state.products.products,
      brands: state.brands.brands,
      category: state.category.category
    };
  });

  const searchFunction = (searchInput) => {

    axios
      .get(`http://localhost:5000/products`)
      .then((result) => {


        // console.log("result", result);
        const search1 = result.data.result.filter((element, index) => {

          return element.title.includes(searchInput)

        })
        setsearchArray(search1);

        // console.log("search1", search1);



      })
      .catch((err) => {
        console.log(err);
        console.log("search1");
      });

  };





  // const categoryDrop =()=>{

  // }

  //   <div>
  //       <select onClick={(e)=>{categoryDrop(e.target.value)}}>
  //         <optgroup label="Brand 1">
  //           <option>Option 1.1</option>
  //           <option>Option 1.2</option>
  //         </optgroup>
  //         <optgroup label="Brand 2">
  //           <option>Option 2.1</option>
  //           <option>Option 2.2</option>
  //         </optgroup>
  //       </select>
  //     </div>

  const brandFunction = () => {

  }

  return (
    <div>

      <div>
        <div className="icon_bar">
          <i onClick={() => {

          }} className="fa fa-bars" aria-hidden="true"></i>

        </div >
        <div className="navbar">
          <Link to="product">All Product</Link>
          <Link to="/">All Brand</Link>
          <Link to="/order">All Order</Link>
          <input className="search" onChange={(e) => { searchFunction(e.target.value) }} />
          {isLoggedIn ? (
            <>
              <Link className="cart" to="/cart">Cart</Link>
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
              <Link className="login_link" to="/login">Login</Link>
              <Link className="register_link" to="/register">Sign up</Link>
            </>
          )}
        </div>
        {/* <Link to="product">All Product</Link>
      <Link to="/">All Brand</Link> */}
        {/* <Link to="category">All category</Link> */}

        {/* <input onChange={(e) => { searchFunction(e.target.value) }} /> */}
        <div>
        </div>
      </div>
      {searchArray.length && searchArray.map((element, index) => {
        return <div onClick={() => {
          navigate(`/product/${element.id}`);
        }}
        >
          <img className="Serch_title" src={element.image} alt="image product" />
          <p className="Serch_title">{element.title}</p>
        </div>
      })}


      <div>
        {/* <select onClick={(e) => { brandFunction(e.target.value) }}>
  //         <optgroup label="Brand 1">
            <option>Option 1.1</option>
          </optgroup>
        </select> */}

      </div>
      {/* <p>aaa</p> */}

      <Getbrand />

    </div>
  );
};

export default Dashboard;