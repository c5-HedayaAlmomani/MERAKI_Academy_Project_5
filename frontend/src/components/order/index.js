import axios from "axios";
import { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import {
  updateOrderAction,
  setNumOfOrderAcion,
  setCompletedOrderAction,
} from "../../redux/reducers/order";
import "./style.css";

const Order = () => {
  const dispatch = useDispatch();

  //! redux =========
  const { token, totalPrice, order, numOfOrder } = useSelector((state) => {
    return {
      token: state.auth.token,
      totalPrice: state.cart.totalPrice,
      order: state.order.order,
      numOfOrder: state.order.numOfOrder,
    };
  });
  //! redux =========

  useEffect(() => {
    console.log("IN EFFECT");
    getOrders();
  }, []);

  const getOrders = () => {
    console.log("in getOrders");

    axios
      .get(`http://localhost:5000/order/product/cart`, {
        headers: {
          authorization: "Bearer " + token,
        },
      })
      .then((result) => {
        dispatch(setCompletedOrderAction([]));
        result.data.order.map((element, index) => {
          console.log(element);
          getOrderById(element.id);
        });
        console.log(result.data.order, "IN GET ORDER");

        dispatch(setNumOfOrderAcion(result.data.order));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getOrderById = (id) => {
    console.log("getOrderById");
    console.log("numOfOrder", numOfOrder);

    axios
      .get(`http://localhost:5000/order/cart/id/${id}`, {
        headers: {
          authorization: "Bearer " + token,
        },
      })
      .then((result) => {
        dispatch(updateOrderAction(result.data.order));

        console.log(result, "IN GET BY ID");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log("order in  window", order);

  return (
    <div className="main">
      
      <div className="order_container">
       
      <h2 className="Title">
        Order History
      </h2>
        {order.length &&
          order.map((element, index) => (
            <div className="one_order">
              <div className="container">
                <h3 className="title1">#</h3>
                <p className="user_order">{index + 1}</p>
              </div>
              <div className="container">
                <h3 className="title2">Number Of Products</h3>
                <p className="number_product">{element.length}</p>
              </div>

              <div className="container">
                <h3 className="title3"> Date Of Order</h3>
                <p className="date_order">
                  {element[element.length - 1].created_at}
                </p>
              </div>
              <div className="container_P">
                <h3 className="title4">Products</h3>
                <div>
                  {element.length &&
                    element.map((element2) => (
                      <div className="all_product">
                        {/* <img src={element2.image} /> */}
                        <p>{element2.title}</p>
                        {/* <p>{element2.price}</p> */}
                      </div>
                    ))}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Order;
