import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
const ProCB = () => {
  const { brand, category } = useParams();
  const [allPCat, setPAllCat] = useState([]);
  const func = () => {
    axios
      .post(`http://localhost:5000/filter/display/proCB`, {
        brand,
        category,
      })
      .then((result) => {
        console.log({ brand, category });
        console.log(result.data);
        setPAllCat(result.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(func, []);

  return (
    <div>
      <p>{brand}</p>
      <p>{category}</p>
      {allPCat.length &&
        allPCat.map((element, index) => {
          return (
            <div key={index} className="categoryCont">
              <p>{element.title}</p>
            </div>
          );
        })}
    </div>
  );
};

export default ProCB;
