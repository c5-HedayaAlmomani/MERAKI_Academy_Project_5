const express = require("express");
const authorization=require("../middlewares/authorization")
const authentication =require("../middlewares/authentication")

const productsRouter = express.Router();



const { CreateProduct,
    getAllProduct,
    getProductById,
    deleteProductById,
    updateProductById, } = require("../controllers/products")


productsRouter.post("/", CreateProduct)
productsRouter.get("/", getAllProduct)
productsRouter.get("/:id", getProductById)
productsRouter.delete("/:id", deleteProductById)
productsRouter.put("/:id", authentication,authorization("UPDATE_PRODUCT"),updateProductById)

module.exports = productsRouter