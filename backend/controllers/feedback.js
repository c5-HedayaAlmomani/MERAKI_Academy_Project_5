
const connection = require("../models/db");
const addFeedback = (req, res) => {
  const { product_id, feedback } = req.body;
  const user_id = req.token.userId
  const query =
    "INSERT INTO feedback (product_id ,user_id , feedback) VALUES (? , ? , ?);";
  const data = [product_id, user_id, feedback];

  connection.query(query, data, (err, result) => {
    if (err) {
      return res.json({
        success: false,
        message: "Server Error",
        err: err,
      });
    }

    res.json({
      success: true,
      message: "add feedback successufuly",
      result: result,
    });
  });
};

const getFeedback = (req, res) => {
    const {product_id}= req.params
    
  const query = "SELECT  feedback.id , users.firstName ,feedback.feedback, feedback.user_id  FROM feedback INNER JOIN users ON feedback.user_id=users.id WHERE feedback.is_deleted=0 AND feedback.product_id=?";

  const data=[product_id]
  connection.query(query,data , (err, result) => {
    if (err) {
      res.json({
        sucsess: false,
        messege: "Server Error",
        err: err,
      });
    }
    res.json({
      success: true,
      message: "All the feedback",
      result: result,
      
    });
  });
};
const updateFeedback = (req, res) => {
  const { feedback, id } = req.body;
  const user_id = req.token.userId
  const query = "UPDATE feedback SET feedback=? WHERE id = ? AND is_deleted=0 AND user_id=?";
  const data = [feedback, id , user_id] ;
  connection.query(query, data, (err, result) => {
    if (err) {
      res.json({
        success: false,
        message: "Server Error",
        err: err,
      });
    }
    res.status(200).json({
      success: true,
      message: "feedback updated",
      result: result,
    });
  });
};
const deleteFeedback = (req, res) => {
  const { id } = req.params;
  const user_id = req.token.userId
  const query = "UPDATE feedback SET is_deleted=1 WHERE id = ? AND user_id=?;";
  const data = [id , user_id];
  connection.query(query, data, (err, result) => {
    if (err) {
      res.json({
        success: false,
        message: "Server Error",
        err: err,
      });
    }
    res.json({
      success: true,
      message: "feedback deleted",
      result: result,
      user_id:user_id
    });
  });
};
const getuserId = (req , res)=>{
  const user_id = req.token.userId;
  res.json({user_id})
}
module.exports = { addFeedback, getFeedback, updateFeedback, deleteFeedback, getuserId };
