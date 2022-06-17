const connection = require("../models/db");

const getAllProductPagination = (req, res) => {
  const limit = 12;

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
const getfourProductPagination = (req, res) => {
  const limit = 4;

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



const getAllCategoryPagination = (req, res) => {
  const limit = 6;

  const page = req.params.page;

  const offset = (page - 1) * limit;

  const query = `SELECT * ,category.id ,category.img, brands.image FROM category INNER JOIN brands ON category.brand_id=brands.id WHERE category.is_deleted=0  LIMIT ${limit} OFFSET ${offset};`;

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
      massage: "All the category",
      result: result,
    });
  });
};

module.exports = {getAllProductPagination , getfourProductPagination,getAllCategoryPagination};
