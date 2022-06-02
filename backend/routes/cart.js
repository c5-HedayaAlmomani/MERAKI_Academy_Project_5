const connection = require("../models/db");

const addToCart = (req, res) => {
    const { productId} = req.body;
    const userId = req.token.userId;

    const query = `INSERT INTO cart (product_id,user_id) VALUES (?,?,?)`;
    const data = [productId, userId];
    connection.query(query, data, (err, result) => {
      if (err) {
        res.status(500).json({
          success: false,
          massage: "Server error",
          err: err,
        });
      }
      res.status(200).json({
        success: true,
        massage: "cart created",
        result: result,
      });
    });
  };





const Cart = (req, res) => {
  

  const getCartItem = () => {};

  const deleteFromCart = () => {};

  const emptyCart = () => {};
};

module.exports={
    addToCart,
}