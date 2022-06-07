const connection = require("../models/db");
const addRate = (req, res) => {
  const { product_id, rate, user_id, id } = req.body;

  const query1 = "SELECT * FROM rate WHERE user_id=? ";
  const data1 = [user_id];
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
      const query3 =
        "UPDATE rate SET rate=? WHERE  user_id=? AND product_id=?";
      const data3 = [rate,  user_id, product_id];
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
  const id = req.params.id;
  // //   const user_id = req.token.userId;
  // //   const query = "UPDATE rate SET is_deleted=1 WHERE id = ? AND user_id=?;";
  const query = "DELETE FROM rate WHERE id=?";
  // //   const data = [id, user_id];
  const data = [id];
  connection.query(query, data, (err, result) => {
    if (err) {
      res.json({ err });
    }
    res.json({ result });
  });
  //     if (err) {
  //       res.json({
  //         success: false,
  //         message: "Server Error",
  //         err: err,
  //       });
  //     }
  //     res.json({
  //       success: true,
  //       message: "rate deleted",
  //       result: result,
  //       user_id: user_id,
  //     });
  //   });
};
const getuserId = (req, res) => {
  const user_id = req.token.userId;
  res.json({ user_id });
};
module.exports = { addRate, getRate, updateRate, deleteRate, getuserId };
