
import { useNavigate } from "react-router-dom";

const AdminDashbord=()=>{
    const navigate=useNavigate()
    return(
        <div>
        <h1 className="Users" onClick={()=>{
            navigate("/Admin/users")
        }}>Users Table</h1>
        <h1 className="category" onClick={()=>{
            navigate("/Admin/category")
        }}>Category Table</h1>
        <h1 className="product" onClick={()=>{
            navigate("/Admin/product")
        }}>Products Table</h1>
        </div>

    )
}

export default AdminDashbord;
