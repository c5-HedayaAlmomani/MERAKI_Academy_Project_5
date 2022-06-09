import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { orderAction } from "../../redux/reducers/auth";
import ("./style.css")


const Register = () => {
 //!redux===============
 const dispatch = useDispatch();
 const {token,isLoggedIn,orders} = useSelector((state) => {
   return {
     token: state.auth.token,
     isLoggedIn: state.auth.isLoggedIn,
     orders:state.auth.orderId
   };
 });
 //!redux===============

  const [firstName, setfirstname] = useState("");
  const [lastName, setlastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const register = () => {
    axios
      .post("http://localhost:5000/register", {
        firstName,
        lastName,
        email,
        password,
      })
      .then((result) => {
        console.log("REGISTER RESULT",result);
        setMessage(result.data.massage);
        dispatch(orderAction(result.data.orderId))
      })
      .catch((err) => {
        setMessage(err.response.data.massage);
      });
  };

  return (
    <div className="register">
      <input
        placeholder="Enter First Name"
        onChange={(e) => {
          setfirstname(e.target.value);
        }}
      />

      <input
        placeholder="Enter Last Name"
        onChange={(e) => {
          setlastname(e.target.value);
        }}
      />

      <input
        placeholder="Enter Your email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        placeholder="Enter Your Password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button onClick={register}>Sign Up</button>
      <h1>{message}</h1>
    </div>
  );
};
export default Register;
