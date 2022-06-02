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


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server on ${PORT}`);
});

