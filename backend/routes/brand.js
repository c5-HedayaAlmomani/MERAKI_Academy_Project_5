const express = require("express");

const { addBrand,
    getAllBrand,
    getBrandById,
    deleteBrandById,
    updateBrandById } = require("../controllers/brand");

const BrandRouter = express.Router();

BrandRouter.post("/", addBrand);
BrandRouter.get("/", getAllBrand);
BrandRouter.get("/:id", getBrandById);
BrandRouter.delete("/:id", deleteBrandById);
BrandRouter.put("/:id", updateBrandById);


module.exports = BrandRouter;
