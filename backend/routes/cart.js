const express = require("express");
const cartRouter = express.Router();

const {addToCart,emptyCart,deleteFromCart,getCartItem}=require("../controllers/cart")

const authentication=require("../middlewares/authentication")

cartRouter.post("/",authentication,addToCart)
cartRouter.delete("/",authentication,emptyCart)
cartRouter.delete("/:id",authentication,deleteFromCart)
cartRouter.get("/",authentication,getCartItem)

module.exports=cartRouter