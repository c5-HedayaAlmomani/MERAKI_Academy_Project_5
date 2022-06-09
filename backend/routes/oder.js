const express = require("express")
const orderRouter = express.Router();
const {addOrder , getOrder} = require("../controllers/order")
orderRouter.post("/" , addOrder)
orderRouter.get("/:id" ,getOrder )
module.exports = orderRouter ;