import axios from "axios";
import { useState } from "react";

const Register = () => {
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
        setMessage(result.data.massage);
      })
      .catch((err) => {
        setMessage(err.response.data.massage);
      });
  };

  return (
    <div>
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
