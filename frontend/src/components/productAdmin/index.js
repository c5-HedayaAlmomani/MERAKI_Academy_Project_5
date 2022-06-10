import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import products, {
  setProductsAction,
  addProductAction,
  updateProductAction,
  deleteProductAction,
} from "../../redux/reducers/products";
import { useEffect } from "react";
import { useState } from "react";
import("./style.css");

const ProductAdmin = () => {
  //   const [title, setTitle] = useState("");
  //   const [description, setDescription] = useState("");
  //   const [price, setPrice] = useState("");
  //   const [image, setImage] = useState("");
  //   const [category_id, setCategory_id] = useState("");
  //   const [sub_category_id, setSub_Category_id] = useState("");

  //! redux =========
  const dispatch = useDispatch();

  const { token, isLoggedIn, users, products } = useSelector((state) => {
    return {
      token: state.auth.token,
      isLoggedIn: state.auth.isLoggedIn,
      products: state.products.products,
    };
  });
  const navigate = useNavigate();

  //! redux =========

  const getAllProduct = () => {
    axios
      .get(`http://localhost:5000/products`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((result) => {
        dispatch(setProductsAction(result.data.result));
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteProduct = (id) => {
    console.log(id);
    axios
      .delete(`http://localhost:5000/products/${id}`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((result) => {
        dispatch(deleteProductAction(id));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getAllProduct();
  }, []);

  return (
    <div className="ProductAdmin">
      <table id="productT">
        <tr>
          <th>#</th>
          <th>Product Name</th>
          <th>Description </th>
          <th>Price </th>
          <th>Create Date </th>

          <th>Brand </th>
          <th>Category </th>

          <th /* style={{borderRight:"1px solid black"}} */>Actions</th>
        </tr>
        {products.length &&
          products.map((element, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{element.description}</td>
                <td>{element.title}</td>
                <td>{element.price}</td>
                <td>{new Date(element.created_at).toLocaleString("es-CL")}</td>
                <td>{element.brand}</td>
                <td>{element.category}</td>
                <td>
                  <button
                    className="delete_button"
                    onClick={() => {
                      console.log(element);
                      deleteProduct(element.id);
                    }}
                  >
                    Delete
                  </button>
                  <button
                    className="edit_button"
                    onClick={() => {
                      navigate(`/Admin/product/edit/${element.id}`);
                    }}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            );
          })}
      </table>
      <div className="Add_Product">
        <button
          className="Add_Product"
          onClick={() => {
            navigate("/Admin/product/create");
          }}
        >
          Add Product
        </button>
      </div>
    </div>
  );
};
export default ProductAdmin;
