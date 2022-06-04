const connection = require("../models/db");

const getAllUsers = (req, res) => {
    const query=`SELECT * FROM user WHERE is_deleted=0`

    connection.query(query,(err,result)=>{
        if (err) {
            return res.status(500).json({
                success: false,
                massage: "Server error",
                err: err,
            });
        } 
        res.status(200).json({
            success: true,
            massage: "All the users",
            result: result,
        })
    })
};

const updateUser = (req, res) => {
    const {userId}=req.body
    const query = `Update users SET role_id=2 WHERE id=? AND is_deleted=0`
    const data=[userId]

    connection.query(query.data,(err,result)=>{
        
    })

};
const deleteUser = (req, res) => {};

module.exports = {
  getAllUsers,
  updateUser,
  deleteUser,
};
