import axios from "axios";
import { useState,useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import products, {
    setProductsAction,
    addProductAction,
    updateProductAction,
    deleteProductAction,
  } from "../../redux/reducers/products";
  import Upload from "../upload";
  import { getCloudinaryAction ,addToCloudinaryAction} from "../../redux/reducers/cloudinary";

  const AddProductAdmin=()=>{
    // const { id } = useParams();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState("");
    const [category_id, setCategory_id] = useState("");
    const [sub_category_id, setSub_Category_id] = useState("");
    const [brand_id, setBrand_id] = useState("");

    //! redux =========
  const dispatch = useDispatch();

  const { token, isLoggedIn, users, products ,cloudinary,category,brands} = useSelector((state) => {
    return {
      token: state.auth.token,
      isLoggedIn: state.auth.isLoggedIn,
      products: state.products.products,
      cloudinary:state.cloudinary.cloudinary,
      brands:state.brands.brands,
      category: state.category.category,
    };
  });

  //! redux =========

  const creatProduct=()=>{
      axios.post(`http://localhost:5000/products`,{
        title:title,
        description:description,
        price:price,
        image:cloudinary,
        category_id:category_id,
        sub_category_id:sub_category_id,
        brand_id:brand_id,
      },{
        headers: { authorization: `Bearer ${token}` },
      }).then((result)=>{
          console.log(result);
        dispatch(addProductAction(result));

      }).catch((err)=>{
          console.log(err);
      })
    
  }

  return(
      <div className="AddProductAdmin">
          <div className="UpdateProductAdmin">
      <div className="image_container">
        <h5>Picture</h5>
      <Upload/>
       
      </div>
      <div className="input_container">
        <h5>Title</h5>
        <input type="text" className="title" onChange={(e)=>{setTitle(e.target.value)}}/>
        <h5>Description</h5>
        <input type="text" className="description" onChange={(e)=>{setDescription(e.target.value)}}/>
        <h5>Price</h5>
        <input type="number" className="title" onChange={(e)=>{setPrice(e.target.value)}} />

        <h5>Brand</h5>
        
        <select onClick={(e)=>{setBrand_id(e.target.value)}}>
          {brands&& brands.map((element,index)=>{
            return (<>
              <option value="0">Select</option> 
              <option value={element.id}>{element.brand}</option>   
              </>
                      )
          })}
        </select>

        {/* <h5>Category</h5>
        <input type="number" className="category" onChange={(e)=>{setCategory_id(e.target.value)}} /> */}
        <h5>Category</h5>
        <select onClick={(e)=>{setCategory_id(e.target.value)}}>
        <option value="0">Select</option> 
          {category&& category.map((element,index)=>{
            
            return (<>              
              <option value={element.id}>{element.category}</option>   
              </>
                      )
          })}
        </select>

        <h5>sub Category</h5>
        <input type="number" className="sub_category" onChange={(e)=>{setSub_Category_id(e.target.value)}} />
      </div>
      <button onClick={()=>{creatProduct()}}>Create Product</button>
    </div>
      </div>
  )
  }
  export default AddProductAdmin
