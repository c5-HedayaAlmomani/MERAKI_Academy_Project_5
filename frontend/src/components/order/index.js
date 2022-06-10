import axios from "axios";
import { useEffect, useState } from "react";

// import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";

const Order = () => {
  //! redux =========
  //   const dispatch = useDispatch();

  const { token, totalPrice } = useSelector((state) => {
    return {
      token: state.auth.token,
      totalPrice: state.cart.totalPrice,
    };
  });
  //! redux =========
  const [orders, setOrders] = useState([]);

  const getOrders = () => {
    axios
      .get(`http://localhost:5000/order/product/cart`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((result) => {
        setOrders(result.data.order);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(()=>{getOrders()}, [totalPrice]);

  return (
    <div>
      <div className="all_title">
        <h3 className="title1">User Email</h3>
        <h3 className="title2">Number of Products</h3>
        <h3 className="title3"> Date Order</h3>
        <h3 className="title4"> All Product</h3>
        <h3 className="title5"> Total Price</h3>
      </div>

      <div className="one_order">
        <p className="user_order">{orders.length && orders[0].user_email}</p>

        <p className="number_product">{orders.length && orders.length}</p>

        <p className="date_order">
          {orders.length && orders[orders.length - 1].create_Date}
        </p>

        {orders.length &&
          orders.map((element, index) => {
            return (
              <div key={index}>
                <div className="all_product">
                  <img src={element.image} />
                  <p> title: {element.title}</p>
                  <p>price :{element.price}</p>
                </div>
              </div>
            );
          })}
          <p className="total_price">{totalPrice}JOD</p>
      </div>
      
    </div>
  );
};

export default Order;
