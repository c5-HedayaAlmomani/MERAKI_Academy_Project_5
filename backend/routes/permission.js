
const express = require("express");
const permissionRouter = express.Router();
const createPermission = require("../controllers/permission")
permissionRouter.post("/:id" ,createPermission )
module.exports = permissionRouter