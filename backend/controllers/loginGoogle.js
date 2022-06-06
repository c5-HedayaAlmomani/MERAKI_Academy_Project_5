const jwt = require("jsonwebtoken");
const connection = require("../models/db");
const loginGoogle = (req, res) => {
  const { email } = req.body;

  const query = "SELECT * FROM users WHERE email=? AND is_deleted=0";
  const data = [email];

  connection.query(query, data, (err, result) => {
    if (err) {
      res.json(err);
    }

    const payload = {
      firstName:result[0].firstName,
      userId: result[0].id,
      role: result[0].role_id,
    };

    const secret = process.env.SECRET;

    const token = jwt.sign(payload, secret);
    res.status(200).json({
      success: true,
      token,
      userId: result[0].id,
      firstName: result[0].firstName,
    });
  });
};
module.exports = loginGoogle;
