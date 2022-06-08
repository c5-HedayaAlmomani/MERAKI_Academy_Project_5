import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import products, {
  setProductsAction,
  addProductAction,
  updateProductAction,
  deleteProductAction,
} from "../../redux/reducers/products";
import { useEffect } from "react";
import { useState } from "react";
import Upload from "../upload";

const UpdateProductAdmin = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category_id, setCategory_id] = useState("");
  const [sub_category_id, setSub_Category_id] = useState("");

  //! redux =========
  const dispatch = useDispatch();

  const { token, isLoggedIn, users, products,cloudinary } = useSelector((state) => {
    return {
      token: state.auth.token,
      isLoggedIn: state.auth.isLoggedIn,
      products: state.products.products,
      cloudinary:state.cloudinary.cloudinary

    };
  });
  const navigate = useNavigate();

  const updateProduct = () => {
    axios
      .put(
        `http://localhost:5000/products/${id}`,
        {
          title: title,
          description: description,
          price: price,
          image: cloudinary,
          category_id: category_id,
          sub_category_id: sub_category_id,
        },
        {
          headers: { authorization: `Bearer ${token}` },
        }
      )
      .then((result) => {
        dispatch(updateProductAction(id));
        console.log(result);
      })
      .catch((err) => {
          console.log(err);
      });
  };

  return (
    <div className="UpdateProductAdmin">
      <div className="image_container">
        <h5> add new Picture</h5>
        <Upload/>
        
      </div>
      <div className="input_container">
        <h5>Title</h5>
        <input type="text" className="title" onChange={(e)=>{setTitle(e.target.value)}}/>
        <h5>Description</h5>
        <input type="text" className="description" onChange={(e)=>{setDescription(e.target.value)}}/>
        <h5>Price</h5>
        <input type="number" className="title" onChange={(e)=>{setPrice(e.target.value)}} />
      </div>
      <button onClick={()=>{updateProduct()}}>Edit Product</button>
    </div>
  );
};

export default UpdateProductAdmin;
