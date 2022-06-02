const express = require("express");

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
productsRouter.put("/:id", updateProductById)


const getAllProductPagination = require("../controllers/paginationProduct")
productsRouter.get('/pagination/:page', getAllProductPagination);

module.exports = productsRouter