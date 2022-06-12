import LogGoogle from "../../components/loginGoogle";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../../redux/reducers/auth";
import { useNavigate } from "react-router-dom";
import { orderAction } from "../../redux/reducers/auth";
import("./style.css");

const Login = () => {
  const navigate = useNavigate();
  //!redux===============
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return {
      token: state.auth.token,
      isLoggedIn: state.auth.isLoggedIn,
      orders: state.auth.orderId,

    };
  });
  //!redux===============
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [message, setMessage] = useState();

  const getLiveOrder = () => {
    axios
      .get(`http://localhost:5000/order/live/${email}`)
      .then((result) => {
        console.log(result);
        dispatch(orderAction(result.data.order[0].id))
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const login = () => {
    axios
      .post("http://localhost:5000/login", { email, password })
      .then((result) => {
        setMessage("Login Successfuly");
        dispatch(loginAction(result.data.token));
        getLiveOrder()
        if (result.data.token === 1) {
          navigate("/");
        } else {
          navigate("/admin");
        }
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response.data.message);

        setMessage(err.response.data.message);
      });
  };

  return (
    <div className="loginDiv">
      <input
        className="input1"
        placeholder="Enter Your email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        className="input2"
        placeholder="Enter Your Password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />

      <button className="button" onClick={login}>Log in</button>
      <h1 className="ms">{message}</h1>
      <LogGoogle />
    </div>
  );
};
export default Login;
