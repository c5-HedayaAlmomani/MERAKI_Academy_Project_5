const connection = require("../models/db");

const getAllProductPagination = (req, res) => {
  const limit = 6;

  const page = req.params.page;

  const offset = (page - 1) * limit;

  const query = `SELECT * FROM Products WHERE is_deleted=0 LIMIT ${limit} OFFSET ${offset};`;

  connection.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "server error",
        err: err,
      });
    }
    res.status(200).json({
      success: true,
      massage: "All the Product",
      result: result,
    });
  });
};

module.exports = getAllProductPagination;
