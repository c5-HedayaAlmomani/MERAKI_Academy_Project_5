const connection = require("../models/db");

const addOrder = (req, res) => {
  const user_email = req.token.email;
  const query =
    "INSERT INTO orders (user_email) VALUES (?)";
  const data = [user_email];
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
  const user_email = req.params.userName;
  const query = "SELECT * FROM orders WHERE is_deleted=1 AND user_email= ?";
  const data = [user_email];
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

const getLiveOrder = (req, res) => {
  const user_email = req.params.userName;
  const query = "SELECT * FROM orders WHERE is_deleted=0 AND user_email= ?";
  const data = [user_email];
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





const updateOrder = (req, res) => {
  const {orderId}=req.body
  const query =`UPDATE orders SET is_deleted=1,create_Date=CURRENT_TIMESTAMP WHERE id=?`;
  const data = [orderId];
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
      message: "update order success",
      result: result,
    });
  });
};

module.exports = { addOrder, getOrder,updateOrder,getLiveOrder};
