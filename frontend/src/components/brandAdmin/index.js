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
import Upload from "../upload";

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
        <table style={{ border: "1px solid black", display: "inline-block" }}>
          <tr>
            <th style={{ borderRight: "1px solid black" }}>#</th>
            <th style={{ borderRight: "1px solid black" }}>Brand image </th>
            <th style={{ borderRight: "1px solid black" }}>Brand Name </th>

            {/* <th style={{ borderRight: "1px solid black" }}>Edit</th> */}
            <th /* style={{borderRight:"1px solid black"}} */>Actions</th>
          </tr>
          {/* <tr> */}
          {brands.length &&
            brands.map((element, index) => {
              return (
                <tr key={index}>
                  <td style={{ border: "1px solid black" }}>{index + 1}</td>
                  <td style={{ border: "1px solid black" }}><img src={element.image}/></td>
                  <td style={{ border: "1px solid black" }}>{element.brand}</td>
                  <td style={{ border: "1px solid black", cursor: "pointer" }}>
                    <button
                      onClick={() => {
                        deleteBrandAdmin(element.id);
                      }}
                    >
                      Delete
                    </button>
                  </td>

                  {/*                   
                  <td style={{ border: "1px solid black", cursor: "pointer" }}>
                    <p
                      onClick={() => {
                        deleteCategoryAdmin(element.id);
                      }}
                    >
                      sub_category
                    </p>
                  </td>

                  <td style={{ border: "1px solid black", cursor: "pointer" }}>
                    <p
                      onClick={() => {
                        deleteCategoryAdmin(element.id);
                      }}
                    >
                      Delete
                    </p>
                  </td> */}
                </tr>
              );
            })}
        </table>
      </div>

      <h6>Add Brand</h6>
      <h5>Picture</h5>
      <Upload/>
        <input type="text"  className="title" onChange={(e)=>{setImage(e.target.value)}}/>
        
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
