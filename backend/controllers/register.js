const connection = require("../models/db");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const register = async (req, res) => {
const {firstName,lastName,email,password}=req.body
const role=1
const encryptedPassword = await bcrypt.hash(password, saltRounds);
const data=[firstName,lastName,email,encryptedPassword,role]


const query=`INSERT INTO users (firstName,lastName,email,password,role_id) VALUES (?,?,?,?,?)`;

connection.query(query,data,(err,result)=>{
    if (err) {
        return res.status(409).json({
          success: false,
          massage: "The email already exists",
          err:err
        });
        
      }
      const query=`INSERT INTO orders (user_email) VALUES (?)`
      const data=[email]
      connection.query(query,data,(err,result)=>{
        if (err) {
          return res.status(409).json({
            success: false,
            massage: "The email already exists",
            err:err
          });
          
        }
        // localStorage.setItem('orderID', "aa");


      })
      res.status(200).json({
        success: true,
        massage: "Account Created Successfully",
        result:result,
        orderId:result.insertId
      });
})

};

module.exports = {
  register,
};

