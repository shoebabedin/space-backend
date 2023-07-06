const express = require("express");
const cors = require("cors");
var mysql = require("mysql");
// const route = require("./routes");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("./config/dbConnection");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const routes = require("./routes")

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());
// app.use(express.static("public"));
app.use("/uploads", express.static("public/uploads"));
app.use(routes)
const port = 5000;


app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
