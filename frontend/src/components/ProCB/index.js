import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

const ProCB = () => {
  const { token, isLoggedIn } = useSelector((state) => {
   

    return {
      token: state.auth.token,
      isLoggedIn: state.auth.isLoggedIn,
    };
  });
  const navigate = useNavigate();
  const { brand, category } = useParams();
  const [allPCat, setPAllCat] = useState([]);
  const func = () => {
    axios
      .post(`http://localhost:5000/filter/display/proCB`, {
        brand,
        category,
      })
      .then((result) => {
        console.log({ brand, category });
        console.log(result.data);
        setPAllCat(result.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const addToCart = async (id) => {
    if (!token) return alert("Please login to continue buying");
    await axios
      .post(
        `http://localhost:5000/cart`,
        {
          productId: id,
          quantity: 1,
        },
        { headers: { authorization: `Bearer ${token}` } }
      )
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(token);
        console.log(err);
      });
  };

  useEffect(func, []);

  
  return (
    <div className="products">
      {allPCat.length &&
        allPCat.map((element, index) => {
          return (<div key={index} className="one_product">

            <img src={`${element.image}`}
                  onClick={() => {
                    navigate(`/product/${element.id}`);
                    console.log({allPCat});
                  }}
                   />
          <div className="information">
            <div>
              {" "}
              {element.title}
              {element.price}
            </div>
            <button
              className="add_to_cart"
              onClick={() => {
                console.log(element.id);
                addToCart(element.id);
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>

            // <div key={index} className="categoryCont">
            //   <p>{element.title}</p>
            //   <img
            //     onClick={() => {
            //       navigate(`/product/${element.id}`);
            //     }}
            //     src={`${element.image}`}
            //   />
            // </div>
          );
        })}
    </div>
  );
};

export default ProCB;
