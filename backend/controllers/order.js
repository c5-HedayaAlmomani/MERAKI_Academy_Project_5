const connection = require("../models/db");
const addOrder = (req, res) => {
  const { user_id,  timestamp } = req.body;
  const query =
    "INSERT INTO orders (user_id ,cart_id , timestamp ) VALUES (?,?,?)";
  const data = [user_id,  timestamp];
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
      message: "add order successufully",
      result: result,
    });
  });
};

const getOrder = (req, res) => {
  const { user_id } = req.params;
  const query = "SELECT * FROM orders WHERE is_deleted=0 AND user_id= ?";
  const data = [user_id];
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
      message: "all the order",
      order: result,
    });
  });
};
module.exports = { addOrder, getOrder };
