const express = require("express");
require("dotenv").config();
const cors = require("cors");
require("./models/db");

const roleRouter = require("./routes/role");
const permissionRouter = require("./routes/permission");
const registerRouter=require("./routes/register")
const loginRouter=require("./routes/login")
const productsRouter=require("./routes/products")
const CategoryRouter =require ("./routes/category")
const cartRouter=require("./routes/cart")


//routers
const app = express();

//built-in middleware
app.use(express.json());
app.use(cors());

// router middleware
app.use("/roles", roleRouter);
app.use("/permission", permissionRouter);
app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/products",productsRouter)
app.use("/category",CategoryRouter)
app.use("/cart",cartRouter)


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server on ${PORT}`);
});

//!------------------- test -------------------

/*

http://localhost:5000/cart/  
delete

http://localhost:5000/cart/:id  
delete

http://localhost:5000/cart/  
post

http://localhost:5000/cart/  
get


http://localhost:5000/products/1
http://localhost:5000/category/sub

http://localhost:5000/register

http://localhost:5000/permission/2
http://localhost:5000/roles
http://localhost:5000/register

http://localhost:5000/login

http://localhost:5000/login

{
"firstName":"a",
"lastName":"a",
"email":"a",
"password":"a"

}

{"permission":"mo"}

{
"email":"a",
"password":"a"

}

{"sub_category":"data",
"category_id":1}

{
    "title":"product 10",
    "description":"kkk",
    "price" :3,
    "image":"kkk"



}

"sub_category_id":1}
"password":"1"}


*/