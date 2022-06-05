
//!==============================


import { useState } from "react";

import StripeCheckout from "react-stripe-checkout";

import axios from "axios";

import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { useSelector , useDispatch } from "react-redux";
import {setTotalPriceAction} from "../../redux/reducers/cart"
function Payment() {

const dispatch = useDispatch();
const {totalPrice, cart} = useSelector((state) => {
  return {
 
    totalPrice:state.cart.totalPrice,
    cart:state.cart.cart
  };
});

  const [product] = useState({
    name: "Ecma shop",
    price: totalPrice,
    description: "This is a product",
  });

  async function handleToken(token, addresses) {
    console.log(totalPrice);
    const response = await axios.post(
      "http://localhost:5000/checkout",
      { token, product }
    );

    console.log(response.status)

    if (response.status === 200) {
      toast("Success! Check email for details", { type: "success" });
      console.log("success");
    } else {
      toast("Something went wrong", { type: "error" });
    }
  }

  return (
    <div className="App">
      <div className="container">
        <br />
        <br />
   
        <br />
     
        <br />
        <div className="form-group container">
          <StripeCheckout
            className="center"
            stripeKey="pk_test_51L7FmeFUovKQAs7tzXDWBjxwe0bDN5TjP7Ymdw28krNO6i3HUVKoe3OvG1xtcRu8p4O9jQCvhZR9Gm0Bgx2aK2sC00oM8KfmIm"
          
            token={handleToken}
            amount={totalPrice}
            name="Ecma shop"
            billingAddress
            shippingAddress
          />
        </div>
      </div>
    </div>
  );
}

export default Payment;