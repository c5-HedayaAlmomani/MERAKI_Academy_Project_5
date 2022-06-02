const connection = require("../models/db")

const addBrand=(req,res)=>{

const {brand,image}=req.body;
const query=`INSERT INTO brands (brand,image) VALUES (?,?)`;
const data =[brand,image];
connection.query(query,data,(err,result)=>{
    if(err){
        res.status(500).json({
            success:false,
            massage: "server error",
            err:err,
        });
    }
    res.status(201).json({
        success: true,
        massage: "brand created",
        result: result,
    });
});
};







module.exports={addBrand}
