import axios from "axios";
import { useParams } from "react-router-dom";
import "./style.css";
import { useEffect } from "react";
import { useState } from "react";
const OneProduct = () => {
  const [product, setProduct] = useState([]);
  const { id } = useParams();

  const oneProduct = () => {
    axios
      .get(`http://localhost:5000/products/${id}`)
      .then((result) => {
        console.log(result.data.result);
        setProduct(result.data.result);
      })
      .catch((err) => {
        console.log({ err });
      });
  };

  useEffect(oneProduct, []);

  return (
    <div>
      {product.length &&
        product.map((e, i) => {
          return (
            <div key={i} className="only_product">
              <img src={`${e.image}`} />
              <div className="detals">
                <p>{"Title  :" + e.title}</p>
                <p>{"Description  : " + e.description}</p>
                <p>{"Price : " + e.price}</p>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default OneProduct;
