const express = require("express");
const authorization = require("../middlewares/authorization");
const authentication = require("../middlewares/authentication");

const productsRouter = express.Router();

const {
  CreateProduct,
  getAllProduct,
  getProductById,
  deleteProductById,
  updateProductById,
  updateProductSold
} = require("../controllers/products");

productsRouter.post("/", CreateProduct);
productsRouter.get("/", getAllProduct);
productsRouter.get("/:id", getProductById);
productsRouter.delete("/:id", deleteProductById);
productsRouter.put(
  "/:id",
  /* authentication,
  authorization("UPDATE_PRODUCT"), */
  updateProductById
);
productsRouter.put(
  "/update/product",
  /* authentication,
  authorization("UPDATE_PRODUCT"), */
  updateProductSold
);


const getAllProductPagination = require("../controllers/paginationProduct");
productsRouter.get("/pagination/:page", getAllProductPagination);

module.exports = productsRouter;
