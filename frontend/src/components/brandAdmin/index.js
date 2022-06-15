import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getBrandsAction,
  addToBrandAction,
  deleteFromBrand,
} from "../../redux/reducers/brand";
import { getCloudinaryAction ,addToCloudinaryAction} from "../../redux/reducers/cloudinary";
import { FaTrash } from "react-icons/fa";

import Upload from "../upload";
import "./style.css"

const BrandAdmin = () => {
  //! redux =========
  const dispatch = useDispatch();
  const [brandName, setBrandName] = useState("");
  const [image, setImage] = useState("");

  const { token, isLoggedIn, category, brands ,cloudinary} = useSelector((state) => {
    return {
      token: state.auth.token,
      isLoggedIn: state.auth.isLoggedIn,
      brands: state.brands.brands,
      cloudinary:state.cloudinary.cloudinary
    };
  });
  console.log(brands);
  //! redux =========
  const navigate = useNavigate();

  const getBrandAdmin = () => {
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

  const deleteBrandAdmin = (id) => {
    axios
      .delete(`http://localhost:5000/brand/${id}`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((result) => {
        dispatch(deleteFromBrand(id));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const addBrandAdmin = () => {
    axios
      .post(
        `http://localhost:5000/brand`,
        { brand: brandName, image: cloudinary },
        { headers: { authorization: `Bearer ${token}` } }
      )
      .then((result) => {
        console.log(result);
        dispatch(
          addToBrandAction({
            id: result.data.result.insertId,
            brand: brandName,
            image:image,
            is_deleted: 0,
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getBrandAdmin();
  }, []);

  return (
    <div className="BrandAdmin">
      <div className="category_contener">
        <table id="adminT">
          <tr>
            <th >#</th>
            <th >Brand image </th>
            <th >Brand Name </th>

            
            <th >Actions</th>
          </tr>
          
          {brands.length &&
            brands.map((element, index) => {
              return (
                <tr key={index}>
                  <td >{index + 1}</td>
                  <td ><img className="tableImage" src={element.image}/></td>
                  <td >{element.brand}</td>
                  <td>
                    <button className="DeleteBrand"
                      onClick={() => {
                        deleteBrandAdmin(element.id);
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

      <h3>Add Brand</h3>
      <Upload/>
        
      <input
        type="text"
        className="brand_Name"
        placeholder="brand_Name"
        onChange={(e) => {
          setBrandName(e.target.value)
        }}
      />
      <button
        className="add_brand"
        onClick={() => {
          addBrandAdmin();
        }}
      >
        Add Brand{" "}
      </button>
    </div>
  );
};

export default BrandAdmin;
