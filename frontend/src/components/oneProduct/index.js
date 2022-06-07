import axios from "axios";
import { useParams } from "react-router-dom";
import "./style.css";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaStar } from "react-icons/fa";

import { loginAction } from "../../redux/reducers/auth";

const OneProduct = () => {
  const [product, setProduct] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [newFeedback, setNewFeedback] = useState("");
  const [updated, setUpdated] = useState("");
  const [user_id, setUser_id] = useState(0);
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const { id } = useParams();
  const [number, setNumber] = useState(3);
  //? ======Rate=================
  const stars = [1, 1, 1, 1, 1];
  const [rate, setRate] = useState(0);
  const [allRate, setAllRate] = useState([]);

  //! redux =========
  const dispatch = useDispatch();

  const { token, isLoggedIn } = useSelector((state) => {
    return {
      token: state.auth.token,
      isLoggedIn: state.auth.isLoggedIn,
    };
  });
  //! redux =========

  const handleClick = (value) => {
    setCurrentValue(value);
  };
  const handleMouseOver = (newHoverValue) => {
    setHoverValue(newHoverValue);
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };
  //? ======Rate=================
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
  const getFeedback = (id) => {
    axios
      .get(`http://localhost:5000/feedback/${id}`)
      .then((result) => {
        console.log(result.data.result);

        setFeedback(result.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const addFeedback = (feedback) => {
    axios
      .post(
        "http://localhost:5000/feedback",
        { product_id: id, feedback },
        {
          headers: {
            authorization: "Bearer " + token,
          },
        }
      )
      .then((result) => {
        console.log(result);
        getFeedback(id);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteFeedback = (feedback_id) => {
    axios
      .delete(`http://localhost:5000/feedback/${feedback_id}`, {
        headers: {
          authorization: "Bearer " + token,
        },
      })
      .then((result) => {
        console.log({ feedback_id });
        console.log(result.data);

        getFeedback(id);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getUserId = () => {
    axios
      .get("http://localhost:5000/feedback/user/id", {
        headers: {
          authorization: "Bearer " + token,
        },
      })
      .then((result) => {
        console.log(result.data);
        setUser_id(result.data.user_id);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const updateFeedback = (feedback, feedback_id) => {
    axios
      .put(
        `http://localhost:5000/feedback/`,
        {
          feedback,
          id: feedback_id,
        },
        {
          headers: {
            authorization: "Bearer " + token,
          },
        }
      )
      .then((result) => {
        console.log(result);
        getFeedback(id);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const clickStar = (index) => {
    handleClick(index);
    axios
      .post(
        "http://localhost:5000/rate",
        { product_id: id, rate: index, user_id: user_id },
        {
          headers: {
            authorization: "Bearer " + token,
          },
        }
      )
      .then((result) => {
        console.log(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
    getAllRate();
  };
  const getAllRate = () => {
    axios
      .get(`http://localhost:5000/rate/${id}`)
      .then((result) => {
        console.log({ getAllRate: result.data.result });
        setAllRate(result.data.result);
      })
      .catch((err) => {
        console.log({ err });
      });
  };
  const calculationRate = () => {
    let totalRate = 0;
    allRate.forEach((element, index) => {
      totalRate = totalRate + element.rate;
    });
    let avgRate = totalRate / allRate.length;
    setRate(avgRate);
    console.log({ avgRate: avgRate });
  };

  useEffect(oneProduct, []);
  useEffect(() => {
    getFeedback(id);
  }, []);
  useEffect(getUserId, []);
  useEffect(getAllRate, []);
  useEffect(calculationRate, [allRate]);
  

  return (
    <div>
      <div>
        {product.length &&
          product.map((e, i) => {
            return (
              <div key={i} className="only_product">
                <div>
                  <img src={`${e.image}`} />
                  {/* //!rate========================== */}
                  <p>Add Rate:</p>
                  {stars.map((e, index) => {
                    return (
                      <FaStar
                        key={index}
                        size={24}
                        onClick={() => {
                          clickStar(index + 1);
                        }}
                        onMouseOver={() => handleMouseOver(index + 1)}
                        onMouseLeave={handleMouseLeave}
                        color={
                          (hoverValue || currentValue) > index
                            ? "#FFBA5A"
                            : "#a9a9a9"
                        }
                        style={{
                          marginRight: 10,
                          cursor: "pointer",
                        }}
                      />
                    );
                  })}
                </div>
                <div className="detals">
                  {/* //!=================Rate================= */}
                  {/* //? الي فووووووووووووووووووووووووووووووووووووووووق */}
                  <div>
                    {stars.map((e, index) => {
                      return (
                        <FaStar
                          key={index}
                          size={24}
                          color={rate > index ? "#FFBA5A" : "#a9a9a9"}
                          style={{
                            marginRight: 10,
                            cursor: "pointer",
                          }}
                        />
                      );
                    })}
                  </div>
                  {/* //!================= End Rate================= */}

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

        {/* //!=============================feedback============================= */}
        <div>
          {feedback.length &&
            feedback.slice(0, number).map((element, index) => {
              return (
                <div key={index}>
                  <p>{element.firstName + ": " + element.feedback} </p>

                  {user_id == element.user_id ? (
                    <div>
                      <input
                        onChange={(e) => {
                          setNewFeedback(e.target.value);
                        }}
                      />
                      <button
                        onClick={() => {
                          updateFeedback(newFeedback, element.id);
                        }}
                      >
                        Update
                      </button>
                    </div>
                  ) : (
                    <></>
                  )}
                  {user_id == element.user_id ? (
                    <button
                      onClick={() => {
                        deleteFeedback(element.id);
                      }}
                    >
                      Delete
                    </button>
                  ) : (
                    <></>
                  )}
                </div>
              );
            })}

          <input
            onChange={(e) => {
              setNewFeedback(e.target.value);
            }}
          />
        </div>
        <button
          onClick={() => {
            addFeedback(newFeedback);
          }}
        >
          Add Feedback
        </button>
      </div>
      <div>
        <button
          onClick={() => {
            setNumber(number + 3);
          }}
        >
          See More
        </button>
        <button
          onClick={() => {
            setNumber(3);
          }}
        >
          See Less
        </button>
      </div>
    </div>
  );
};

export default OneProduct;
