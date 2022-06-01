import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../../redux/reducers/auth";

const Login = () => {
  //!redux===============
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return {
      token: state.auth.token,
      isLoggedIn: state.auth.isLoggedIn,
    };
  });
  //!redux===============
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [message, setMessage] = useState();

  const login = () => {
    axios
      .post("http://localhost:5000/login", { email, password })
      .then((result) => {
        setMessage("Login Successfuly");
        dispatch(loginAction(result.data.token));
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response.data.message);

        setMessage(err.response.data.message);
      });
  };

  return (
    <div>
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
      <button onClick={login}>Log in</button>
      <h1>{message}</h1>
    </div>
  );
};
export default Login;
