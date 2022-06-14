import { Routes, Route, Link, useNavigate } from "react-router-dom";
import "./style.css"

const SidebarAdmin =()=>{
    return (
      <div className="sidebar_admin">
        <Link className="register_link" to="/Admin/users">
          USERS
        </Link>

        <Link className="register_link" to="/Admin/brand">
          BRAND
        </Link>

        <Link className="register_link" to="/Admin">
          ADMIN
        </Link>

        <Link className="register_link" to="/Admin/product">
          PRODUCT
        </Link>


        {/* <Link className="register_link" to="/Admin/product/edit/:id">
          admin
        </Link> */}

        {/* <Link className="register_link" to="/Admin/product/create">
          admin
        </Link> */}

        <Link className="register_link" to="/Admin/Orders">
          ORDER
        </Link>
      </div>
    );
}

export default SidebarAdmin;