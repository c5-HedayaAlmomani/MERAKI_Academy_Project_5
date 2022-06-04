import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const CatByBrand = () => {
  const navigate = useNavigate();
  const { brand } = useParams();
  const [allCat, setAllCat] = useState([]);

  const func = () => {
    axios
      .get(`http://localhost:5000/filter/display/category/${brand}`)
      .then((result) => {
        console.log(result.data.result);
        setAllCat(result.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(func, []);

  return (
    <div className="categoryContenar">
      {allCat.length &&
        allCat.map((element, index) => {
          return (
            <div key={index} className="categoryCont">
              <img
                onClick={() => {
                  navigate(`PRO/${brand}/${element.category}`);
                }}
                src={`${element.image}`}
              ></img>
              <p>{element.category}</p>
            </div>
          );
        })}
    </div>
  );
};

export default CatByBrand;
