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

  useEffect(() => {
    getAllProduct();
  }, []);

  const getAllProduct = () => {
    axios
      .get(`http://localhost:5000/products`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((result) => {
        dispatch(setProductsAction(result.data.result));
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
//   const updateProduct = (id) => {
//     axios
//       .put(`http://localhost:5000/products/${id}`, {
//         headers: { authorization: `Bearer ${token}` },
//       })
//       .then((result) => {})
//       .catch((ree) => {});
//   };
  // console.log(products);

  return (
    <div className="ProductAdmin">
      <table style={{ border: "1px solid black", display: "inline-block" }}>
        <tr>
          <th style={{ borderRight: "1px solid black" }}>#</th>
          <th style={{ borderRight: "1px solid black" }}>Product Name</th>
          <th style={{ borderRight: "1px solid black" }}>Description </th>
          <th style={{ borderRight: "1px solid black" }}>Price </th>
          <th style={{ borderRight: "1px solid black" }}>Brand </th>
          <th style={{ borderRight: "1px solid black" }}>Category </th>

          <th /* style={{borderRight:"1px solid black"}} */>Actions</th>
        </tr>
        {products.length &&
          products.map((element, index) => {
            return (
              <tr key={index}>
                <td style={{ border: "1px solid black" }}>{index + 1}</td>
                <td style={{ border: "1px solid black" }}>
                  {element.description}
                </td>{" "}
                <td style={{ border: "1px solid black" }}>{element.title}</td>
                <td style={{ border: "1px solid black" }}>{element.price}</td>
                <td style={{ border: "1px solid black" }}>
                  {element.brand_id}
                </td>
                <td style={{ border: "1px solid black" }}>
                  {element.category_id}
                </td>
                <td style={{ border: "1px solid black" }}>
                  <button
                    className="delete_button"
                    onClick={() => {
                      deleteProduct(element.id);
                    }}
                  >
                    Delete
                  </button>
                  <button className="edit_button" onClick={()=>{navigate(`/Admin/product/edit/${element.id}`)
                
                }}>Edit</button>
                </td>
              </tr>
            );
          })}
      </table>
      <div className="Add_Product">
        <button className="Add_Product">Add Product</button>
      </div>
    </div>
  );
};
export default ProductAdmin;
