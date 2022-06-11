import axios from "axios";
import { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import "./style.css";

const Order = () => {
  const [numOfOrder, setNumOfOrder] = useState([]);
  const [productByAllOrder, setProductByAllOrder] = useState([]);
  //! redux =========
  const { token, totalPrice } = useSelector((state) => {
    return {
      token: state.auth.token,
      totalPrice: state.cart.totalPrice,
    };
  });
  //! redux =========

  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    console.log("in getOrders");

    axios.get(`http://localhost:5000/order/product/cart`,{headers: {
      authorization: "Bearer " + token,
    },}).then((result)=>{
      setNumOfOrder(result.data.order)
      getOrderById()
    }).catch((err)=>{
      console.log(err);
    })
    // let result;
    // try {
    //   result = await axios.get("http://localhost:5000/order/product/cart", {
    //     headers: {
    //       authorization: "Bearer " + token,
    //     },
    //   });
    //   setOrders(result.data.order);
    //   console.log({ eeeeeeeeeee: result.data.order });
    //   result.data.order.forEach((element, index) => {
    //     // if (!numOfOrder.includes(element.id)) {
    //       numOfOrder.push(element.id);
    //     // }
    //   });
    //   getOrderById();
    //   console.log({ newwwwwwwwwwwwwww: numOfOrder });
    // } catch (error) {
    //   throw error;
    // }
  };
  const getOrderById =async () => {
    console.log("in getOrderById");
    numOfOrder.forEach(async (element, index) => {
     let result;
     try {
       result = await axios.get(
         `http://localhost:5000/order/cart/id/${element.id}`,
         {
           headers: {
             authorization: "Bearer " + token,
           },
         }
       );

      //  if (!productByAllOrder.includes(result.data.order)) {
        setProductByAllOrder(result.data.order);
      //  }
       console.log({ productByAllOrder: productByAllOrder });
     } catch (error) {
       throw error;
     }
   });
 };

 
  useEffect(() => {
    getOrders();
  }, [ ]);

  return (
    <div>

      <div>
        <div className="all_title">
          <h3 className="title1">User Email</h3>
          <h3 className="title2">Number of Products</h3>
          <h3 className="title3"> Date Order</h3>
          <h3 className="title4"> All Product</h3>
        </div>
      </div>

      {productByAllOrder.length &&
        productByAllOrder.map((element, index) => (
          <div className="one_order">
            <p className="user_order">{element[0].user_email}</p>
            <p className="number_product">{element.length}</p>
            <p className="date_order">
              {element[element.length - 1].create_Date}
            </p>

            <div>
              {element.length &&
                element.map((element2) => (
                  <div className="all_product">
                    <img src={element2.image} />
                    <p>{element2.title}</p>

                    <p>{element2.price}</p>
                  </div>
                ))}
            </div>
          </div>
        ))}
    </div>
  );
};

export default Order;
