import { Routes, Route, Link, useNavigate } from "react-router-dom";
import "./style.css"

const SidebarAdmin =()=>{
    return (
      <div className="sidebar_admin">
        <Link className="register_link" to="/Admin/users">
          admin
        </Link>

        <Link className="register_link" to="/Admin/brand">
          admin
        </Link>

        <Link className="register_link" to="/Admin">
          admin
        </Link>

        <Link className="register_link" to="/Admin/product">
          admin
        </Link>


        <Link className="register_link" to="/Admin/product/edit/:id">
          admin
        </Link>

        <Link className="register_link" to="/Admin/product/create">
          admin
        </Link>

        <Link className="register_link" to="/Admin/Orders">
          admin
        </Link>
      </div>
    );
}

export default SidebarAdmin;