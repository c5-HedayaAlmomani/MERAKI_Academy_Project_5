import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setBrandsAction, addToBrandAction, deleteFromBrand, getBrandsAction } from "../../redux/reducers/brand"
import ProductMain from "../productMain";
import Slider from "../Slider/Slider";
import("./style.css");

const Brand = () => {
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

  const brandD = () => {
    axios
      .get(`http://localhost:5000/brand`)
      .then((result) => {

        setBrand(result.data.result);
        console.log(result.data);
        dispatch(setBrandsAction(result.data.result))
      })
      .catch((err) => {
        console.log(err);
      });
  };



  const category = () => {
    axios.get(`http://localhost:5000/category`).then((result) => {
      setCategorys(result.data.result)
      console.log(result.data.result);
    }).catch((err) => {
      console.log(err);
    })
  }

  useEffect(category, []);




  useEffect(brandD, []);
  return (
    <div>
      <Slider />
      <h1 className="all_brand">All_brand</h1>
      <div className="all_brand">
        {brand.length &&
          brand.map((element, index) => {
            return (
              <div key={index} className='branddiv'>
                <div className="imgAndName">
                  <img className="img_brand"
                    onClick={() => {
                      navigate(`/allCategory/${element.brand}`);
                    }}
                    src={`${element.image}`}
                  />
                </div>
                <div className="name_brand">
                  <p>{element.brand}</p>

                </div>
              </div>
            );
          })}

        {<h1 className="all_brand" >All_Category</h1>}
        {

          categorys.length && categorys.map((element, index) => {
            return (<div key={index} className="contenar_category_brands">
              <img src={element.image} className="img_category_brands" onClick={() => {
                navigate(
                  `allCategory/${element.brand}/PRO/${element.brand}/${element.category}`
                );
              }} />


              <div className="contenar_namecategoryand_bands">
                <img src={element.image} className="img_brand_brands" />
                <p className="p_category_brands">{element.category}</p>

              </div>
            </div>)
          })

        }


      </div>
      <ProductMain />
    </div>
  );
};

export default Brand;
