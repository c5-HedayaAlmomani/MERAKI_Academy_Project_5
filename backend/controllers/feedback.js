const connection = require("../models/db");
const addFeedback = (req, res) => {
  const { product_id, user_id, feedback } = req.body;
  const query =
    "INSERT INTO feedback (product_id ,user_id , feedback) VALUES (? , ? , ?);";
  const data = [product_id, user_id, feedback];

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
      message: "add feedback successufuly",
      result: result,
    });
  });
};

const getFeedback = (req, res) => {
    const {product_id}= req.params
    
  const query = "SELECT * FROM feedback INNER JOIN users ON feedback.user_id=users.id WHERE feedback.is_deleted=0 AND feedback.product_id=?";
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
  const query = "UPDATE feedback SET feedback=? WHERE id = ? AND is_deleted=0";
  const data = [feedback, id];
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
  const { id } = req.body;
  const query = "UPDATE feedback SET is_deleted=1 WHERE id = ?;";
  const data = [id];
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
    });
  });
};
module.exports = { addFeedback, getFeedback, updateFeedback, deleteFeedback };
