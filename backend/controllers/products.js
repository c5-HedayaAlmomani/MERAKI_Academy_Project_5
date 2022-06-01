const CreateProduct = () => {
    const { title, img, price, catgry_id, description, subcatgry_id } = req.body;

    const query = `INSERT INTO Products (title, img, price,catgry_id,description,subcatgry_id) VALUES (?,?,?,?,?,?,?);`;
    const data = [title, img, price, catgry_id, description, subcatgry_id];

    connection.query(query, data, (err, result) => {
        console.log(result);
        if (err) {
            res.status(500).json({
                success: false,
                massage: "Server error",
                err: err,
            });
        }
        res.status(200).json({
            success: true,
            massage: "Product created",
            result: result,
        });
    });
}


const getAllProduct = (req, res) => {
    const query = `SELECT * FROM Product WHERE is_deleted=0;`;
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
            massage: "All the Product",
            result: result,
        });
    });
};



module.exports = {
    CreateProduct,
    getAllProduct,
    
 
}