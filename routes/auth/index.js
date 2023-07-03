const express = require("express");
const route = express.Router()
const signup = require("./signup")

route.use("/auth", signup)




module.exports = route;