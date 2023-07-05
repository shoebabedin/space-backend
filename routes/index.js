const express = require("express");
const route = express.Router();
const authRoutes = require("./auth")
const userRoutes = require("./user")
const homeRoutes = require("./home")
const blogRoutes = require("./blog")

route.use("/api", authRoutes);
route.use("/api", userRoutes);
route.use("/api", homeRoutes);
route.use("/api", blogRoutes);


route.use("/api", (req, res) => {
  res.json("hello api");
});

module.exports = route;
