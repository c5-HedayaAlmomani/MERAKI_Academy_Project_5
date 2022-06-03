const express = require("express")
const googleRouter = express.Router();
const regGoogle = require("../middlewares/regGoogle")
const loginGoogle = require("../controllers/loginGoogle")
googleRouter.post("/" , regGoogle , loginGoogle)
module.exports = googleRouter