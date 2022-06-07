import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../../redux/reducers/auth";

import "./style.css";

const Product = () => {
  //! redux =========
  const dispatch = useDispatch();

  const [sorts, setSorts] = useState([]);

  const { token, isLoggedIn } = useSelector((state) => {
    // console.log(state);

    return {
      token: state.auth.token,
      isLoggedIn: state.auth.isLoggedIn,
    };
  });
  //! redux =========
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const gitAllProduct = () => {
    axios
      .get(`http://localhost:5000/products/pagination/${page}`)
      .then((result) => {
        setProducts(result.data.result);
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

  const sortFunction = (e) => {
    // console.log(result.data.result);
    if (e == "high Price") {
      let sortedProduct = products.sort((a, b) => b.price - a.price);
      setSorts(sortedProduct);
      console.log("product", sortedProduct);
    } else if (e == "low Price") {
      let sortedProduct = products.sort((a, b) => a.price - b.price);
      setSorts(sortedProduct);
      console.log("product", sortedProduct);
    } else if (e == "Select") {
      setSorts(products);
      console.log("product", products);
    }
  };



  
  useEffect(gitAllProduct, [page]);








  return (
    <div>
      <din>
        <select
          onClick={(e) => {
            sortFunction(e.target.value);
          }}
        >
          {sorts.length &&
            sorts.map((element, index) => {
              return (
                <div key={index}>
                  <p>{element.price}</p>
                </div>
              );
            })}
          <option>select</option>
          <option>high Price</option>
          <option>low Price</option>
        </select>
      </din>

  

      <div className="products">
        {products.length &&
          products.map((e, i) => {
            return (
              <div key={i} className="one_product">
                <img
                  onClick={() => {
                    navigate(`/product/${e.id}`);
                  }}
                  src={`${e.image}`}
                />
                <div className="information">
                  <div>
                    {" "}
                    {e.title}
                    {e.price}
                  </div>
                  <button
                    className="add_to_cart"
                    onClick={() => {
                      console.log(e.id);
                      addToCart(e.id);
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            );
          })}
      </div>
      {page != 1 ? (
        <>
          <button
            className="next"
            onClick={() => {
              setPage(page - 1);
              gitAllProduct();
              console.log(page);
            }}
          >
            back
          </button>
        </>
      ) : (
        <></>
      )}
      {page != 3 ? (
        <>
          <button
            className="next"
            onClick={() => {
              setPage(page + 1);
              gitAllProduct();
              console.log(page);
            }}
          >
            next
          </button>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};
export default Product;
