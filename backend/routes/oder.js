const express = require("express")
const orderRouter = express.Router();
const {addOrder , getOrder,updateOrder,getLiveOrder,getOrderWithProduct, getOrderWithProductById,getAllOrderAllUsers
} = require("../controllers/order")
const authorization = require("../middlewares/authorization");
const authentication = require("../middlewares/authentication");

orderRouter.post("/" ,authentication, addOrder)
orderRouter.get("/:userName" ,authentication,getOrder )
orderRouter.put("/" ,authentication,updateOrder )
orderRouter.get("/live/:userName",getLiveOrder )

orderRouter.get("/product/cart",authentication,getOrderWithProduct )
orderRouter.get("/cart/id/:order_id",authentication,getOrderWithProductById )
orderRouter.get("/orders/Admin",authentication,getAllOrderAllUsers )


module.exports = orderRouter ;