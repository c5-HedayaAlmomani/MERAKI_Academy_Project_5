import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getUsersAction,
  addToUsersAction,
  deleteFromUsers,
  updateProductAction,
} from "../../redux/reducers/users";
import { FaTrash } from "react-icons/fa";
import { FaUserEdit } from "react-icons/fa";

import "./style.css";

const UsersComponent = () => {
  //! redux =========
  const dispatch = useDispatch();

  const { token, isLoggedIn, users } = useSelector((state) => {
    return {
      token: state.auth.token,
      isLoggedIn: state.auth.isLoggedIn,
      users: state.users.users,
    };
  });
  //! redux =========
  const navigate = useNavigate();

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = () => {
    axios
      .get(`http://localhost:5000/admin/users`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((result) => {
        console.log(result.data.result);
        dispatch(getUsersAction(result.data.result));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteUserAdmin = (id) => {
    axios
      .delete(`http://localhost:5000/admin/users/${id}`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((result) => {
        dispatch(deleteFromUsers(id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateUserAdmin = (id) => {
    axios
      .put(`http://localhost:5000/admin/users/${id}`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((result) => {
        console.log(result);
        getAllUsers()
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="UsersComponent">
      <h3>Users Table</h3>
      
      <br></br>
      <br></br>

      <table id="usersT">
        <tr>
          <th>#</th>
          <th>User Name </th>
          <th>Email</th>
          <th>Register Date</th>
          <th>Last Login </th>
          <th>Role</th>
          <th className="thAction">Actions</th>
        </tr>

        {users.length &&
          users.map((element, index) => {
            return (
              <>
                <tr>
                  <td>{index+1}</td>
                  <td>{element.firstName }</td>
                  <td>{element.email}</td>
                  <td>
                    {new Date(element.created_at).toLocaleString("es-CL")}
                  </td>
                  <td>
                     {new Date(element.userLoginTime).toLocaleString("es-CL")}
                  </td>
                 

                  <td>{element.role}</td>

                  <td className="ActionsCont"
                    onClick={() => {
                      updateUserAdmin(element.id);
                    }}
                  >
                    
                    <button className="Update"
                      onClick={() => {
                        updateUserAdmin(element.id);
                      }}
                    >
                      <FaUserEdit/>  Make Admin
                    </button>
                    
                  

                    <button className="Delete"
                      onClick={() => {
                        deleteUserAdmin(element.id);
                      }}
                    >
                      <FaTrash/>  Delete User
                    </button>
                  </td>
                </tr>
              </>
            );
          })}
      </table>
    </div>
  );
};

export default UsersComponent;
