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
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="UsersComponent">
      <table id="usersT">
        <tr>
          <th>ID</th>
          <th>User Name </th>
          <th>Email</th>
          <th>Role</th>
          <th>Actions</th>        
        </tr>

        {users.length &&
          users.map((element, index) => {
            return (
              <>
                <tr>
                  <td >
                    {element.id}
                  </td>
                  <td >
                    {element.firstName + " " + element.lastName}
                  </td>
                  <td >
                    {element.email}
                  </td>
                  <td >
                    {element.role}
                  </td>

                  <td
                    onClick={() => {
                      updateUserAdmin(element.id);
                    }}
                  >
                    <button
                      onClick={() => {
                        updateUserAdmin(element.id);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        deleteUserAdmin(element.id);
                      }}
                    >
                      delete
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
