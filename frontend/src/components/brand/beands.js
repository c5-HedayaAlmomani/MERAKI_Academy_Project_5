import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import{setBrandsAction,addToBrandAction,deleteFromBrand,getBrandsAction}from "../../redux/reducers/brand"
import("./style.css");

const Brand = () => {
  const navigate = useNavigate();
  const [brand, setBrand] = useState([]);
  const dispatch = useDispatch();
  const { id } = useParams();
  const { token, isLoggedIn } = useSelector((state) => {
    return {
      token: state.auth.token,
      isLoggedIn: state.auth.isLoggedIn,
    };
  });

  const brandD = () => {
    axios
      .get(`http://localhost:5000/brand`)
      .then((result) => {

        setBrand(result.data.result);
        console.log(result.data);
        dispatch(setBrandsAction(result.data.result))
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(brandD, []);
  return (
    <div className="all_brand">
      {brand.length &&
        brand.map((element, index) => {
          return (
            <div key={index} className="branddiv">
              <img className="img_brand"
                onClick={() => {
                  navigate(`/allCategory/${element.brand}`);
                }}
                src={`${element.image}`}
              />
              <div className="name_brand">
                <p>{"Drand  :" + element.brand}</p>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Brand;
