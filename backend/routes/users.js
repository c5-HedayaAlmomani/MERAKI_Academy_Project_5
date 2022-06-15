const express = require("express");
const UsersRouter = express.Router();
const {getAllUsers,updateUser,deleteUser ,getUserById}=require("../controllers/users")

UsersRouter.get("/",getAllUsers)
// UsersRouter.post("/",getAllCategory)
UsersRouter.delete("/:id",deleteUser)
UsersRouter.put("/:id",updateUser)
UsersRouter.post("/" , getUserById)

module.exports = UsersRouter;


