
const express = require("express");
const feedbackRouter = express.Router();
const {addFeedback , getFeedback , updateFeedback , deleteFeedback}= require("../controllers/feedback")
feedbackRouter.post("/", addFeedback);
feedbackRouter.get("/:product_id" ,getFeedback )
feedbackRouter.put("/", updateFeedback);
feedbackRouter.delete("/", deleteFeedback);
module.exports = feedbackRouter