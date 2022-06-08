const express = require("express");
const filterRouter = express.Router();
const {
  getBrandCat,
  getProCategory,
  subCByCat,
  getProCB,
  getBrandCatById
} = require("../controllers/filter");


filterRouter.get("/display/product" , getProCategory)

filterRouter.get("/display/category/:brand" , getBrandCat)

filterRouter.get("/subCByCat/:category", subCByCat)

filterRouter.post ("/display/proCB" , getProCB)
module.exports= filterRouter

filterRouter.get("/display/category/id/:id" , getBrandCatById)
