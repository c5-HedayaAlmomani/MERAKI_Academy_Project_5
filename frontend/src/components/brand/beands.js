import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(brandD, []);
  return (
    <div>
      {brand.length &&
        brand.map((element, index) => {
          return (
            <div key={index} className="branddiv">
              <img
                onClick={() => {
                  navigate(`/allCategory/${element.brand}`);
                }}
                src={`${element.image}`}
              />
              <div className="branddiv">
                <p>{"Drand  :" + element.brand}</p>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Brand;
