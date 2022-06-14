const express = require("express");
const CategoryRouter = express.Router();
const { Createcategory, deleteCategoryById,getAllCategory } = require("../controllers/category")
const {getAllCategoryPagination}=require("../controllers/paginationProduct")
const {Createsub_category}=require("../controllers/sub_category")
CategoryRouter.delete("/:id", deleteCategoryById)
CategoryRouter.post("/", Createcategory)
CategoryRouter.post("/sub",Createsub_category)
CategoryRouter.get("/",getAllCategory)

CategoryRouter.get("/pagination/:page", getAllCategoryPagination);





module.exports = CategoryRouter;