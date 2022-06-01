import axios from "axios";
import { useState } from "react";

const Register = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [message, setMessage] = useState();

  const register = () => {
    axios
      .post("http://localhost:5000/register", { name, email, password })
      .then((result) => {
        console.log(result.data.massage);
        setMessage(result.data.massage);
      })
      .catch((err) => {
        console.log(err.response.data.massage);
        setMessage(err.response.data.massage);
      });
  };

  return (
    <div>
      <input
        placeholder="Enter Your Name"
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <input
        placeholder="Enter Your email"
        onClick={(e) => {
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
