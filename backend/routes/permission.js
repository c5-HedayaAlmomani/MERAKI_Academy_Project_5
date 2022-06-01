
const express = require("express");
const permissionRouter = express.Router();
const createPermission = require("../controllers/permission")
permissionRouter.post("/" ,createPermission )
module.exports = permissionRouter