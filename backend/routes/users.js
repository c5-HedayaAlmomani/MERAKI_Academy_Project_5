const express = require("express");
const UsersRouter = express.Router();
const {getAllUsers,updateUser,deleteUser}=require("../controllers/users")

UsersRouter.get("/",getAllUsers)
// UsersRouter.post("/",getAllCategory)
UsersRouter.delete("/:id",deleteUser)
UsersRouter.put("/:id",updateUser)

module.exports = UsersRouter;


