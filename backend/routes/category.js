const express = require("express");
const CategoryRouter = express.Router();
const { Createcategory, deleteCategoryById } = require("../controllers/category")
CategoryRouter.delete("/:id", deleteCategoryById)
CategoryRouter.post("/create", Createcategory)
module.exports = CategoryRouter;