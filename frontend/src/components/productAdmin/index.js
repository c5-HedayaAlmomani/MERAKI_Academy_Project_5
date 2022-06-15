import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import products, {
  setProductsAction,
  addProductAction,
  updateProductAction,
  deleteProductAction,
} from "../../redux/reducers/products";
import { useEffect } from "react";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { FaUserEdit } from "react-icons/fa";

import("./style.css");

const ProductAdmin = () => {
  
  //! redux =========
  const dispatch = useDispatch();

  const { token, isLoggedIn, users, products } = useSelector((state) => {
    return {
      token: state.auth.token,
      isLoggedIn: state.auth.isLoggedIn,
      products: state.products.products,
    };
  });
  const navigate = useNavigate();

  //! redux =========

  const getAllProduct = () => {
    axios
      .get(`http://localhost:5000/products`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((result) => {
        dispatch(setProductsAction(result.data.result));
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteProduct = (id) => {
    
    axios
      .delete(`http://localhost:5000/products/${id}`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((result) => {
        dispatch(deleteProductAction(id));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getAllProduct();
  }, []);

  return (
    <div className="ProductAdmin">
     
       <div className="Add_Product">
        <br></br>
        <button
          className="Add_Productbutton" role="button"
          onClick={() => {
            navigate("/Admin/product/create");
          }}
          
        >
          <span class="text"> Add Product</span>
        </button>
      </div>
      
      <br></br>
      <br></br>
      <table id="usersT">
        <tr>
          <th>#</th>
          <th>Product Name</th>
          <th>Description </th>
          <th>Price </th>
          <th>Available Quantity </th>
          <th>Sold</th>
          <th>Create Date </th>
          <th>Brand </th>
          <th>Category </th>

          <th className="thAction">Actions</th>
        </tr>
        {products.length &&
          products.map((element, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{element.description}</td>
                <td>{element.title}</td>
                <td>{element.price}</td>
                <td>{element.AvailableQuantity}</td>
                <td>{element.sold}</td>
                <td>{new Date(element.create_Date).toLocaleString("es-CL")}</td>
                <td>{element.brand}</td>
                <td>{element.category}</td>
                <td className="ActionsCont">
                <button
                    className="Update"
                    onClick={() => {
                      navigate(`/Admin/product/edit/${element.id}`);
                    }}
                  >
                   <FaUserEdit/>  Edit
                  </button>
                  <button
                    className="Delete"
                    onClick={() => {
                      console.log(element);
                      deleteProduct(element.id);
                    }}
                  >
                    <FaTrash/>  Delete 
                  </button>
                  
                </td>
              </tr>
            );
          })}
      </table>
     
    </div>
  );
};
export default ProductAdmin;
