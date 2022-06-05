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
    <div>
      <table style={{ border: "1px solid black", display: "inline-block" }}>
        <tr>
          <th style={{ borderRight: "1px solid black" }}>ID</th>
          <th style={{ borderRight: "1px solid black" }}>User Name </th>
          <th style={{ borderRight: "1px solid black" }}>Email</th>
          <th style={{ borderRight: "1px solid black" }}>Edit Permissions</th>

          <th /* style={{borderRight:"1px solid black"}} */>Delete User</th>
        </tr>

        {users.length &&
          users.map((element, index) => {
            return (
              <>
                <tr>
                  <td style={{ border: "1px solid black" }}>{element.id}</td>
                  <td style={{ border: "1px solid black" }}>
                    {element.firstName + " " + element.lastName}
                  </td>
                  <td style={{ border: "1px solid black" }}>{element.email}</td>
                  <td style={{ border: "1px solid black" , cursor: "pointer" }} onClick={() => {
                      updateUserAdmin(element.id);
                    }}>Edit</td>
                  <td
                    style={{ border: "1px solid black", cursor: "pointer" }}
                    
                  >
                    <p
                      onClick={() => {
                        deleteUserAdmin(element.id);
                      }}
                    >
                      delete
                    </p>
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
