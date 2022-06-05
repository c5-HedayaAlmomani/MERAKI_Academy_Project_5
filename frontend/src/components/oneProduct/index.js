import axios from "axios";
import { useParams } from "react-router-dom";
import "./style.css";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../../redux/reducers/auth";

const OneProduct = () => {
  const [product, setProduct] = useState([]);
  const { id } = useParams();

  //! redux =========
  const dispatch = useDispatch();

  const { token, isLoggedIn } = useSelector((state) => {
    return {
      token: state.auth.token,
      isLoggedIn: state.auth.isLoggedIn,
    };
  });
  //! redux =========

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
  const addToCart = async (id) => {
    if (!token) return alert("Please login to continue buying");
    await axios
      .post(
        `http://localhost:5000/cart`,
        {
          productId: id,
          quantity: 1,
        },
        { headers: { authorization: `Bearer ${token}` } }
      )
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(token);
        console.log(err);
      });
  };
//   const getFeedback = (product_id) => {

// axios.get(`http://localhost:5000/feedback/${product_id}`).then((result)=>{
//   console.log(result);
// }).catch((err)=>{
//   console.log(err);
// })



//   };

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
                <button
                  className="add_to_cart"
                  onClick={() => {
                    console.log("e");
                    addToCart(e.id);
                  }}
                >
                  Add To Cart
                </button>
              </div>
              
            </div>
          );
        })}
    </div>
  );
};

export default OneProduct;
