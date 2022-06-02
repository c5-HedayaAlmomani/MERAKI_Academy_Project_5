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


const getAllBrand = (req,res)=>{
    const query = `SELECT * FROM brand WHERE is_deleted=0 ;`;
    connection.query(query, (err, result) => {
        if (err) {
            res.status(500).json({
                success: false,
                massage: "server error",
                err: err,
            });
        }
        res.status(200).json({
            success: true,
            massage: "All the brand",
            result: result,
        });
    });
}; 






module.exports={addBrand,
    getAllBrand}
