// import ("./style.css")
import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";

import Payment from "../payment";

import {
  getCartAction,
  deleteFromCartAction,
  emptyCartAction,
  setTotalPriceAction,
  setquantityAction,
  reducequantityAction,
  iccuresquantityAction
} from "../../redux/reducers/cart";

import StripeCheckout from "react-stripe-checkout";

import { toast } from "react-toastify";

const Cart = () => {
  //! redux =========
  const dispatch = useDispatch();

  const { token, isLoggedIn, cart, quantity } = useSelector((state) => {
    return {
      token: state.auth.token,
      isLoggedIn: state.auth.isLoggedIn,
      cart: state.cart.cart,
      quantity: state.cart.quantity
    };
  });
  //! redux =========

  // const [availableQuantity, SetAvailableQuantity] = useState(0);
  const [subtotal, SetSubTotal] = useState(0);

  useEffect(() => {
    getCartItems();
  }, [quantity]);

  const getCartItems = async () => {
    await axios
      .get(`http://localhost:5000/cart`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((result) => {
        dispatch(getCartAction(result.data.result));
        console.log(cart);
        console.log(result.data.result);
        let priceTotal = result.data.result.reduce((acc, element, index) => {
          return acc + element.price * element.quantity;
        }, 0);
        // let sumQuant = result.data.result.reduce((acc, element, index) => {
        //   return acc + element.AvailableQuantity;
        // }, 0);
        SetSubTotal(priceTotal);
        // SetAvailableQuantity(sumQuant)

        // console.log(result.data.result[0].AvailableQuantity);


        dispatch(setTotalPriceAction(priceTotal));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const func = async () => {
    await axios
      .get(`http://localhost:5000/cart`, {
        headers: { authorization: `Bearer ${token}` },
      }).then((result) => {
        dispatch(setquantityAction(result.data.result[0].AvailableQuantity))

      }).catch((err) => {
        console.log(err);
      })



  }
  const addToCart = (id, quantity) => {

    if (!token) return alert("Please login to continue buying");

    axios
      .post(
        `http://localhost:5000/cart`,
        {
          productId: id,
          quantity: quantity,
        },
        { headers: { authorization: `Bearer ${token}` } }
      )
      .then((result) => {
        console.log(result.data);
        // setCart(result.data.result);
        getCartItems();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const emptyCart = async () => {
    await axios
      .delete(
        "http://localhost:5000/cart/",

        {
          headers: { authorization: `Bearer ${token}` },
        }
      )
      .then((result) => {
        dispatch(emptyCartAction());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteItemsFromCart = async (id) => {
    await axios
      .delete(`http://localhost:5000/cart/${id}`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((result) => {
        dispatch(deleteFromCartAction(id));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(func, [])
  return (
    <div className="cart_container">
      {isLoggedIn ? (
        cart.length === 0 ? (
          <h1>Your shopping cart is empty!</h1>
        ) : (
          cart.length &&
          cart.map((element, index) => {
            return (
              <div className="product_details" key={index}>
                <p
                  className="delete"
                  id={element.id}
                  onClick={(e) => {
                    deleteItemsFromCart(element.id);
                  }}
                >
                  ×
                </p>
                <div className="image_button">
                  <img
                    className="product_image"
                    src={element.image}
                    alt="product image"
                  />
                  <br></br>
                  <div className="all_detals">
                    <div className="information_cart">
                      <button
                        className="decrees"
                        id={element.id}
                        onClick={(e) => {

                          element.AvailableQuantity !== quantity ? dispatch(iccuresquantityAction()) : <></>


                          element.quantity > 1 ? (
                            addToCart(element.id, -1)


                          ) : (
                            <></>
                          );
                        }}
                      >
                        -
                      </button>

                      <p className="product-quantity">{element.quantity}</p>



                      <button

                        className="increase"
                        id={element.id}
                        onClick={(e) => {
                          console.log(quantity+"vvvvvvvvvvvvvv");
                          console.log(element.AvailableQuantity+"wwwwwwwwwww");
                          quantity !== element.AvailableQuantity ? addToCart(element.id, 1) : <></>;

                          quantity === 0 ? <></> : dispatch(reducequantityAction())

                          

                          getCartItems()





                        }}

                      >
                        +
                      </button>
                    </div>
                    <div className="details">
                      <p className="product_title">
                        {"Title : " + element.title}
                      </p>
                      <p className="product_total">
                        {"Total : " + element.price * element.quantity}JOD
                      </p>
                      <p className="product_details">
                        {"Description : " + element.description}
                      </p>
                      <p className="product_details">
                        {/* {availableQuantity.map((element,index)=>{
                          return<div key={index}>{element.AvailableQuantity}</div>
                        })} */}
                        {"AvailableQuantity : " + quantity}
                      </p>
                    </div>
                  </div>
                  <Payment />
                </div>
              </div>
            );
          })
        )
      ) : (
        <h1>Please Login First</h1>
      )}

      <h4 className="sub_total">{subtotal} JOD</h4>

      <button
        className="empty_cart"
        onClick={(e) => {
          emptyCart();
        }}
      >
        Empty Cart
      </button>
    </div>
  );
};

export default Cart;
