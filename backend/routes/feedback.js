
const express = require("express");
const feedbackRouter = express.Router();
const authentication = require("../middlewares/authentication")
const {addFeedback , getFeedback , updateFeedback , deleteFeedback , getuserId}= require("../controllers/feedback")
feedbackRouter.post("/",authentication , addFeedback);
feedbackRouter.get("/:product_id" ,getFeedback )
feedbackRouter.put("/",authentication, updateFeedback);
feedbackRouter.delete("/:id",authentication, deleteFeedback);
feedbackRouter.get("/user/id" , authentication , getuserId)
module.exports = feedbackRouter
