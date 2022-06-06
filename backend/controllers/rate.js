const connection = require("../models/db");
const addRate = (req, res) => {
  const { product_id, rate } = req.body;
  const user_id = req.token.userId;
  const query =
    "INSERT INTO rate (product_id ,user_id , rate) VALUES (? , ? , ?);";
  const data = [product_id, user_id, rate];

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
      message: "add rate successufuly",
      result: result,
    });
  });
};

const getRate = (req, res) => {
  const { product_id } = req.params;

  const query =
    "SELECT rate.id , users.email,users.firstName ,rate.rate, rate.user_id FROM rate INNER JOIN users ON rate.user_id=users.id INNER JOIN products ON rate.product_id=products.id WHERE rate.is_deleted=0 AND rate.product_id=?";

  const data = [product_id];
  connection.query(query, data, (err, result) => {
    if (err) {
      res.json({
        sucsess: false,
        messege: "Server Error",
        err: err,
      });
    }
    res.json({
      success: true,
      message: "All the rate",
      result: result,
    });
  });
};

const updateRate = (req, res) => {
  const { rate, id } = req.body;
  const user_id = req.token.userId;
  const query =
    "UPDATE rate SET rate=? WHERE id = ? AND is_deleted=0 AND user_id=?";
  const data = [rate, id, user_id];
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
      message: "rate updated",
      result: result,
    });
  });
};

const deleteRate = (req, res) => {
  const { id } = req.params;
  const user_id = req.token.userId;
  const query = "UPDATE rate SET is_deleted=1 WHERE id = ? AND user_id=?;";
  const data = [id, user_id];
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
      message: "rate deleted",
      result: result,
      user_id: user_id,
    });
  });
};
const getuserId = (req, res) => {
  const user_id = req.token.userId;
  res.json({ user_id });
};
module.exports = { addRate, getRate, updateRate, deleteRate, getuserId };
