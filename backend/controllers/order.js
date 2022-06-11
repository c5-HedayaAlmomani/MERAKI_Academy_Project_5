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


const getOrderWithProduct = (req, res) => {
// const {order_id}= req.params
  const user_email = req.token.email;
  // const query = "SELECT *,orders.id FROM orders INNER JOIN cart ON cart.order_id=orders.id INNER JOIN products ON products.id=cart.product_id WHERE orders.is_deleted=1 AND  orders.user_email=?;";
  const query = "SELECT * FROM orders  WHERE orders.is_deleted=1 AND  orders.user_email=?;"; 
  const data = [ user_email];
  connection.query(query,data,(err, result) => {
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
const getOrderWithProductById = (req, res) => {
  
  const {order_id}= req.params

    // const user_email = req.token.email;
    const query = "SELECT * FROM cart INNER JOIN products ON cart.product_id=products.id WHERE cart.order_id=?;";
    const data = [ order_id];
    connection.query(query,data,(err, result) => {
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
module.exports = { addOrder, getOrder,updateOrder,getLiveOrder, getOrderWithProduct , getOrderWithProductById};
