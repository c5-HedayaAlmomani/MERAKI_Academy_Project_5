const connection = require("../models/db");
const addRate = (req, res) => {
  const { product_id, rate, user_id, id } = req.body;

  const query1 = "SELECT * FROM rate WHERE product_id=? ";
  const data1 = [product_id];
  connection.query(query1, data1, (err, result) => {
    if (err) {
      return res.json({
        success: false,
        message: "Server Error",
        err: err,
      });
    }

    if (result.length == 0) {
      const query2 =
        "INSERT INTO rate (product_id ,user_id , rate) VALUES (? , ? , ?);";
      const data2 = [product_id, user_id, rate];

      connection.query(query2, data2, (err, result) => {
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
    } else {
      const query3 = "UPDATE rate SET rate=? WHERE  user_id=? AND product_id=?";
      const data3 = [rate, user_id, product_id];
      connection.query(query3, data3, (err, result) => {
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
          rate: rate,
        });
      });
    }
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

const deleteRate = (req, res) => {
  const id = req.params.id;

  const query = "DELETE FROM rate WHERE id=?";

  const data = [id];
  connection.query(query, data, (err, result) => {
    if (err) {
      res.json({ err });
    }
    res.json({ result });
  });
};

module.exports = { addRate, getRate, deleteRate };
