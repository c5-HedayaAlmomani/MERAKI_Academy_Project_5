import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setBrandsAction,
  addToBrandAction,
  deleteFromBrand,
  getBrandsAction,
} from "../../redux/reducers/brand";
import ProductMain from "../productMain";
import Slider from "../Slider/Slider";
import("./style.css");

const Brand = () => {
  const [index, setIndex] = useState(0);
  const [numberOfPage, setNumberOfPage] = useState(0);

  const [page, setPage] = useState(1);
  const [arrayofPage, setArrayofPage] = useState([]);

  const navigate = useNavigate();
  const [brand, setBrand] = useState([]);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [categorys, setCategorys] = useState([]);

  const { token, isLoggedIn } = useSelector((state) => {
    return {
      token: state.auth.token,
      isLoggedIn: state.auth.isLoggedIn,
    };
  });

  const getAllProductNoLimit = () => {
    axios
      .get("http://localhost:5000/category/")
      .then((result) => {
        console.log({ all: result.data.result.length });
        console.log(Math.ceil(result.data.result.length / 6));
        setNumberOfPage(Math.ceil(result.data.result.length / 6));
        setArrayofPage(Array(Math.ceil(result.data.result.length / 6)).fill(0));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const brandD = () => {
    axios
      .get(`http://localhost:5000/brand`)
      .then((result) => {
        setBrand(result.data.result);
        console.log(result.data);
        dispatch(setBrandsAction(result.data.result));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const category = () => {
    axios
      .get(`http://localhost:5000/category/pagination/${page}`)
      .then((result) => {
        setCategorys(result.data.result);
        console.log(result.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(category, []);

  useEffect(getAllProductNoLimit, []);

  useEffect(brandD, []);

  return (
    <div>
      <Slider />
      <h1 className="all_brand">All_brand</h1>
      <div>
        <div className="all_brand-only">
          {brand.length &&
            brand.map((element, index) => {
              return (
                <div key={index} className="branddivv">
                  <div className="imgAndName">
                    <img
                      className="img_brand"
                      onClick={() => {
                        navigate(`/allCategory/${element.brand}`);
                      }}
                      src={`${element.image}`}
                    />
                  </div>
                  <div className="name_brand"></div>
                </div>
              );
            })}
        </div>
        {<h1 className="all_brand">All_Category</h1>}
        <div className="all_category-only">
        {categorys.length &&
          categorys.map((element, index) => {
            console.log("element---------------", element);
            return (
              <div key={index} className="contenar_category_brands">
                <img
                  src={element.img}
                  className="img_category_brands"
                  onClick={() => {
                    navigate(
                      `allCategory/${element.brand}/PRO/${element.brand}/${element.category}`
                    );
                  }}
                />

                <div className="contenar_namecategoryand_bands">
                  <img src={element.image} className="img_brand_brands" />
                  <p className="p_category_brands">{element.category}</p>
                </div>
              </div>
            );
          })}
          </div>
        {
          <div className="buttons">
            {arrayofPage.map((element, index) => {
              return (
                <div key={index}>
                  <button
                    onClick={() => {
                      setPage(index + 1);
                      category();
                      setIndex(index + 1);
                    }}
                  >
                    {index + 1}
                  </button>
                </div>
              );
            })}

            {page != 1 ? (
              <>
                <button
                  onClick={() => {
                    setPage(index - 1);

                    setIndex(index - 1);
                    category();
                  }}
                >
                  back
                </button>
              </>
            ) : (
              <></>
            )}
            {page != numberOfPage ? (
              <>
                <button
                  onClick={() => {
                    setPage(index + 1);
                    setIndex(index + 1);

                    category();
                  }}
                >
                  next
                </button>
              </>
            ) : (
              <></>
            )}
          </div>
        }
      </div>
      <ProductMain />
    </div>
  );
};

export default Brand;
