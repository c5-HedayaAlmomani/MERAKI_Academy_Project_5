import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
const Product = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const gitAllProduct = () => {
    axios
      .get(`http://localhost:5000/products/pagination/${page}`)
      .then((result) => {
        console.log(result.data.result);
        setProducts(result.data.result);
      })
      .catch((err) => {
        console.log({ err });
      });
  };

  useEffect(gitAllProduct, [page]);

  return (
    <div>
      <div className="products">
        {products.length &&
          products.map((e, i) => {
            return (
              <div key={i} className="one_product">
                <img
                  onClick={() => {
                    navigate(`/product/${e.id}`);
                  }}
                  src={`${e.image}`}
                />
                <div className="information">
                  <div>
                    {" "}
                    {e.title}
                    {e.price}
                  </div>
                  <button>Add to Cart</button>
                </div>
              </div>
            );
          })}
      </div>
      {page != 1 ? (
        <>
          <button
            className="next"
            onClick={() => {
              setPage(page - 1);
              gitAllProduct();
              console.log(page);
            }}
          >
            back
          </button>
        </>
      ) : (
        <></>
      )}
      {page != 3 ? (
        <>
          <button
            className="next"
            onClick={() => {
              setPage(page + 1);
              gitAllProduct();
              console.log(page);
            }}
          >
            next
          </button>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};
export default Product;
