// import ("./style.css")
import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import {useNavigate} from ("react-router-dom")
import { loginAction } from "../../redux/reducers/auth";

const Cart = () => {
  // const navigate=useNavigate()
  //! redux =========
  const dispatch = useDispatch();
  const { token, isLoggedIn } = useSelector((state) => {
    return {
      token: state.auth.token,
      isLoggedIn: state.auth.isLoggedIn,
    };
  });
  //! redux =========

  const [cart, setCart] = useState([]);
  const [total, SetTotal] = useState(0);

  useEffect(() => {
    getCartItems();
  }, []);

  const getCartItems = async () => {
    await axios
      .get(`http://localhost:5000/cart`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((result) => {
        setCart(result.data.result);
        console.log(result.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addToCart = (id, quantity) => {
    if (!token) return alert("Please login to continue buying");
    axios.post(
      `http://localhost:5000/cart`,
      {
        productId: id,
        quantity: quantity,
      },
      { headers: { authorization: `Bearer ${token}` } }
    ).then((result)=>{
      setCart(result.data.result);
      getCartItems()
    }).catch((error)=>{
      console.log(error);
    })
  };

  return (
    <div className="cart_container">
      {isLoggedIn ? (
        !cart && !cart ? (
          <h1>Your shopping cart is empty!</h1>
        ) : (
          cart.length &&
          cart.map((element, index) => {
            // SetTotal(total+element.price)
            console.log(element);
            return (
              <div className="product_details" key={index}>
                <div className="image_button">
                  <img
                    className="product_image"
                    src={element.image}
                    alt="product image"
                  />
                  <br></br>
                  <button className="decrees" id={element.id}onClick={(e)=>{addToCart(element.id,-1)}}>-</button>
                  <p className="product-quantity">{element.quantity}</p>
                  <button className="increase" id={element.id}onClick={(e)=>{addToCart(element.id,1)}}>+</button>
                </div>
                <div className="details">
                  <p className="product_title">{element.title}</p>
                  <p className="product_total">
                    Total={element.price * element.quantity}JOD
                  </p>
                  <p className="product_details">{element.description}</p>
                </div>
              </div>
            );
          })
        )
      ) : (
        <h1>Please Login First</h1>
      )}
    </div>
  );
};

export default Cart;

// {isLoggedIn?(<h1>Please Login First</h1>):(!cart ? (
//     <h1>Your shopping cart is empty!</h1>
//   ) : (
//     cart &&
//     cart.map((element, index) => {
//       // SetTotal(total+element.price)
//       console.log(element);
//       return (
//         <div className="product_details" key={index}>
//             <div className="image_button">
//           <img
//             className="product_image"
//             src={element.image}
//             alt="product image"
//           /><br></br>
//           <button className="decrees">-</button>
//           <p className="product-quantity">{element.quantity}</p>
//           <button className="increase">+</button>

//           </div>
//           <div className="details">
//           <p className="product_title">{element.title}</p>
//           <p className="product_total">Total={element.price*element.quantity}JOD</p>
//           <p className="product_details">{element.description}</p>
//           </div>
//         </div>
//       );
//     })))}
