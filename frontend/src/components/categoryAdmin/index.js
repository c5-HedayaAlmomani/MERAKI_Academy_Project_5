import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategoryAction,
  addToCategoryAction,
  deleteFromCategory,
} from "../../redux/reducers/categoryAdmin";

const CategoryAdmin = () => {
  //! redux =========
  const dispatch = useDispatch();
  const [categoryName, setCategoryName] = useState("");

  const { token, isLoggedIn, category } = useSelector((state) => {
    return {
      token: state.auth.token,
      isLoggedIn: state.auth.isLoggedIn,
      category: state.category.category,
    };
  });
  //! redux =========
  const navigate = useNavigate();

  const addCategoryAdmin = (categoryName) => {
    axios
      .post(
        `http://localhost:5000/category`,
        { category: categoryName },
        { headers: { authorization: `Bearer ${token}` } }
      )
      .then((result) => {
        console.log(result);
        dispatch(
          addToCategoryAction({
            id: result.data.result.insertId,
            category: categoryName,
            is_deleted: 0,
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addSubCategoryAdmin = (subCategory) => {
    axios
      .post(
        `http://localhost:5000/category/sub`,
        { sub_category: subCategory },
        { headers: { authorization: `Bearer ${token}` } }
      )
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

//   const getSubCategoryAdmin = (id) => {
//     axios
//       .get(`http://localhost:5000/category`, {
//         headers: { authorization: `Bearer ${token}` },
//       })
//       .then((result) => {
//         dispatch(getCategoryAction(result.data.result));
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

  const getCategoryAdmin = () => {
    axios
      .get(`http://localhost:5000/category`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((result) => {
        dispatch(getCategoryAction(result.data.result));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteCategoryAdmin=(id)=>{
    axios
      .delete(`http://localhost:5000/category/${id}`, {
        headers: { authorization: `Bearer ${token}` },
      }).then((result)=>{
        dispatch(deleteFromCategory(id))
      }).catch((err)=>{
          console.log(err);
      })
  }

  useEffect(() => {
    getCategoryAdmin();
  }, []);

  return (
    <div className="category_Admin">
      <div className="category_contener">
        <table style={{ border: "1px solid black" ,display: "inline-block"}}>
          <tr>
            <th style={{ borderRight: "1px solid black" }}>ID</th>
            <th style={{ borderRight: "1px solid black" }}>Category Name</th>
            <th style={{ borderRight: "1px solid black" }}>sub_category</th>
            {/* <th style={{ borderRight: "1px solid black" }}>Edit</th> */}
            <th /* style={{borderRight:"1px solid black"}} */>Delete</th>
          </tr>
          {/* <tr> */}
          {category.length &&
            category.map((element,index) => {
              return (
                
                  <tr key={index}>
                    <td style={{ border: "1px solid black" }}>{element.id}</td>
                    <td style={{ border: "1px solid black" }}>
                      {element.category}
                    </td> 
                    <td style={{ border: "1px solid black" ,cursor:"pointer"}}><p onClick={()=>{deleteCategoryAdmin(element.id)}}>sub_category</p></td>

                    <td style={{ border: "1px solid black" ,cursor:"pointer"}}><p onClick={()=>{deleteCategoryAdmin(element.id)}}>Delete</p></td>
                    
                  </tr>
                
              );
            })}
          
        </table>
      </div>

      <h6>Add Category</h6>
      <input
        className="category"
        placeholder="category Name"
        onChange={(e) => {
          setCategoryName(e.target.value);
        }}
      />
      <button
        className="add_category"
        onClick={() => {
          addCategoryAdmin(categoryName);
        }}
      >
        Add Category{" "}
      </button>
    </div>
  );
};

export default CategoryAdmin;
