import { GoogleLogin } from "react-google-login";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { orderAction } from "../../redux/reducers/auth";

import { loginAction } from "../../redux/reducers/auth";

import axios from "axios";
const LogGoogle = () => {
  const navigate = useNavigate();

  //!redux===============
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return {
      token: state.auth.token,
      isLoggedIn: state.auth.isLoggedIn,
    };
  });
  //!redux===============

  const getLiveOrder = (email) => {
    axios
      .get(`http://localhost:5000/order/live/${email}`)
      .then((result) => {
        console.log(result);
        dispatch(orderAction(result.data.order[0].id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const responseGoogle = (response) => {
    axios
      .post("http://localhost:5000/loginGoogle", {
        firstName: response.profileObj.email,
        lastName: response.profileObj.familyName,
        email: response.profileObj.email,
      })
      .then((result) => {
        console.log("LOGINGoogle", result);
        dispatch(loginAction(result.data.token));
        getLiveOrder(response.Ru.Iv);

        navigate("/");
      })
      .catch((err) => {
        console.log({ err });
      });
  };

  return (
    <div>
      <GoogleLogin
        clientId="994328639474-ub85dkgodp4vrm5nvfaemiklfko5jpt9.apps.googleusercontent.com"
        buttonText="Log in with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
};

export default LogGoogle;
