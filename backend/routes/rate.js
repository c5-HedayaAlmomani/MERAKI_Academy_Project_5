const express = require("express")
const rateRouter = express.Router();
const {addRate ,getRate , updateRate , deleteRate ,getuserId } = require("../controllers/rate")
const authentication = require("../middlewares/authentication")
rateRouter.post("/",authentication , addRate)
rateRouter.get("/:product_id" , getRate)
rateRouter.put ("/" ,authentication, updateRate)
rateRouter.delete("/:id", authentication , deleteRate)
rateRouter.get("/user_id" , getuserId)
module.exports = rateRouter ;