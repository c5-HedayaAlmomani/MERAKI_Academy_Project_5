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
  const [arrayofPage, setArrayofPage] = useState([]);
  const [index, setIndex] = useState(0);
  const [numberOfPage, setNumberOfPage] = useState(0);
  const { token, isLoggedIn } = useSelector((state) => {
    return {
      token: state.auth.token,
      isLoggedIn: state.auth.isLoggedIn,
    };
  });
  //! redux =========
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  const getAllProductNoLimit = () => {
    axios
      .get("http://localhost:5000/products")
      .then((result) => {
        console.log({ all: result.data.result.length });
        console.log(Math.ceil(result.data.result.length / 6));
        setNumberOfPage(Math.ceil(result.data.result.length / 6));
        setArrayofPage(Array(Math.ceil(result.data.result.length / 6)).fill(0));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // Array(5).fill(1)=>[1, 1, 1, 1, 1]
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
    const orderId=localStorage.getItem("orderId")

    await axios
      .post(
        `http://localhost:5000/cart`,
        {
          productId: id,
          quantity: 1,
          order_id:orderId,

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
  useEffect(getAllProductNoLimit, []);

  return (
    <div>
      <div>
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
      </div>

      <div className="products">
        {products.length &&
          products.map((e, i) => {
            return (
              <div className="card">
              <ul className="ul">
              <li>
                <i>{e.price} $</i>
              </li>
              <li>
                <i></i>
              </li>
              <li>
                <i></i>
              </li>
              <li>
                <i></i>
              </li>
              </ul>
              <img src={e.image} alt="" />
              <div className="con-text">
                <h2>{e.title}</h2>
                <p>{e.description} {e.AvailableQuantity>0?(<button      className="add_to_cart"
                    onClick={() => {
                    console.log(e.id);
                    addToCart(e.id);
                    }}>Add to Cart</button>):(<button>SoldOut</button>)}       
                
                  <button onClick={() => {
                  navigate(`/product/${e.id}`);
                 }}>View Product</button></p>
              </div>
              </div>

              // <div key={i} className="one_product">
              //   <img
              //     onClick={() => {
              //       navigate(`/product/${e.id}`);
              //     }}
              //     src={`${e.image}`}
              //   />
              //   <div className="information">
              //     <div>
              //       {" "}
              //       {e.title}
              //       {e.price}
              //       {e.description}
              //       <br></br>
              //       {e.AvailableQuantity}
              //     </div>
              //     <button
              //       className="add_to_cart"
              //       onClick={() => {
              //         console.log(e.id);
              //         addToCart(e.id);
              //       }}
              //     >
              //       Add to Cart
              //     </button>
              //   </div>
              // </div>
            );
          })}
      </div>

      {arrayofPage.map((element, index) => {
        return (
          <div key={index}>
            <button
              onClick={() => {
                setPage(index + 1);
                gitAllProduct();
                setIndex(index + 1);
              }}
            >
              {index + 1}
            </button>
          </div>
        );
      })}

      {page != 1 ? (
        <>
          <button
            onClick={() => {
              setPage(index - 1);
              console.log(index - 1);
              setIndex(index - 1);
              gitAllProduct();
            }}
          >
            back
          </button>
        </>
      ) : (
        <></>
      )}
      {page != numberOfPage ? (
        <>
          <button
            onClick={() => {
              setPage(index + 1);
              setIndex(index + 1);

              gitAllProduct();
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
