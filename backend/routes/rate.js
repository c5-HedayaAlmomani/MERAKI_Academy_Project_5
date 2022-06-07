const express = require("express");
const rateRouter = express.Router();
const { addRate, getRate, deleteRate } = require("../controllers/rate");
const authentication = require("../middlewares/authentication");
rateRouter.post("/", authentication, addRate);
rateRouter.get("/:product_id", getRate);
rateRouter.delete("/:id", deleteRate);
module.exports = rateRouter;
