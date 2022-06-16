import axios from "axios";
import SidebarAdmin from "../sidebarAdmin";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import brand from "../../redux/reducers/brand";

import {
  getBrandsAction,
  addToBrandAction,
  deleteFromBrand,
} from "../../redux/reducers/brand";
import {
  getCategoryAction,
  addToCategoryAction,
  deleteFromCategory,
} from "../../redux/reducers/categoryAdmin";
import "./style.css";
const Getbrand = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token, isLoggedIn, category, brands, show, cloudinary, isAdmin } =
    useSelector((state) => {
      return {
        token: state.auth.token,
        isLoggedIn: state.auth.isLoggedIn,
        brands: state.brands.brands,
        cloudinary: state.cloudinary.cloudinary,
        category: state.category.category,
        show: state.brands.show,
        isAdmin: state.auth.isAdmin,
      };
    });
  console.log("brands", brands);
  console.log("category", category);

  const getCategory = () => {
    axios
      .get(`http://localhost:5000/category`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((result) => {
        dispatch(getCategoryAction(result.data.result));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getBrand = () => {
    axios
      .get(`http://localhost:5000/brand`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((result) => {
        console.log(result.data.result);
        dispatch(getBrandsAction(result.data.result));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getCategory();
    getBrand();
  }, []);
  console.log("isAdmin", isAdmin);

  return (
    <div>
      {isAdmin && show && <SidebarAdmin />}
      {!isAdmin && show && (
        <div className="filter_item">
          <ul class="menu">
            <li class="item" id="mn1">
              <a class="btn" href="/">
                Home
              </a>
              {/* <div class="submenu">
          <a href="#">User List</a>
          <a href="#">Add User</a>
          <a href="#">Delete User</a>
        </div> */}
            </li>
            <li class="item" id="mn2">
              <a class="btn" href="product">
                All Product
              </a>

              {/* <div class="submenu">
          <a href="#">File List</a>
          <a href="#">Add File</a>
          <a href="#">Felete File</a>
        </div> */}
            </li>

            <li class="item" id="mn3">
              <a class="btn" href="/order">
                Orders
              </a>
              {/* <div class="submenu">
          <a href="#">File List</a>
          <a href="#">Add File</a>
          <a href="#">Felete File</a>
        </div> */}
            </li>

            <li class="item" id="mn4">
              <a class="btn" href="#mn4">
                Brands
              </a>
              <div class="submenu">
                {brands.map((element, index) => {
                  return (
                    <>
                      <a  href={`/allCategory/${element.brand}`}>{element.brand}</a>
                      
                    </>
                  );
                })}
              </div>
            </li>

            <li class="item" id="mn2">
              <a class="btn" href="#mn2">
                Files
              </a>
              <div class="submenu">
                <a href="#">File List</a>
                <a href="#">Add File</a>
                <a href="#">Felete File</a>
              </div>
            </li>
          </ul>

         
        </div>
      )}
    </div>
  );
};

export default Getbrand;
