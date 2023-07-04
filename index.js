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

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());
app.use(express.static("public"));
const port = 5000;

// Use of Multers
var storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, "public/uploads/"); // 'uploads/' directory name where save the file
  },
  filename: (req, file, callBack) => {
    callBack(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  }
});

var upload = multer({
  storage: storage
});

// user all get
app.get("/viewuser", (req, res) => {
  const sql = `SELECT * FROM users`;

  db.query(sql, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

// login
app.post("/loginuser", (req, res) => {
  const sql = "SELECT * FROM users WHERE `email` = ?";
  db.query(sql, [req.body.email], (err, data) => {
    if (err) {
      return res.json("Error");
    }
    if (data.length > 0) {
      bcrypt.compare(
        req.body.password.toString(),
        data[0].password,
        (err, response) => {
          if (err) {
            return res.json("Error");
          }
          if (response) {
            console.log({ data });
            return res.json({ Login: true, data });
          }
          return res.json({ Login: false });
        }
      );
    }
  });
});

// user create
app.post("/createuser", async (req, res) => {
  const sql = `INSERT INTO users (email, password, u_name) VALUES (?)`;

  const hashedPwd = await bcrypt.hash(req.body.password, 10);

  const addData = [req.body.email, hashedPwd, req.body.u_name];

  db.query(sql, [addData], function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

// user update
app.post("/updateuser/:id", upload.single("file"), (req, res) => {
  var imgsrc = req.file.filename;
  const addData = [req.body.email, req.body.u_name, imgsrc];
  if (!req.file) {
    console.log("No file upload");
  } else {
    const sql = `UPDATE users SET email = '${req.body.email}', u_name = '${req.body.u_name}', image = '${imgsrc}' WHERE id = ${req.params.id}`;

    db.query(sql, [addData], function (err, result) {
      if (err) throw err;
      res.json(result);
      console.log("file uploaded");
    });
  }
});

// user delete
app.post("/deleteuser/:id", (req, res) => {
  const sql = `DELETE FROM users WHERE id = ${req.params.id}`;

  db.query(sql, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

// Blog

// all blog
app.get("/blog", (req, res) => {
  const sql = `SELECT * FROM blogs`;

  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// create blog
app.post("/createblog", upload.array("files"), async (req, res) => {
  
  const imgsrc = JSON.stringify(req.files.map((file) => file.filename));

  const addData = [req.body.title, req.body.content, imgsrc];

  if (!req.files) {
    console.log("No file upload");
  } else {
    const sql = `INSERT INTO blogs (title, content, blog_Img) VALUES (?)`;

    db.query(sql, [addData], function (err, result) {
      if (err) throw err;
      res.json(result);
      console.log("file uploaded");
    });
  }
});


// Edit blog
app.post("/updateblog/:id", upload.array("files"), (req, res) => {
  const imgsrc = JSON.stringify(req.files.map((file) => file.filename));
  const addData = [req.body.title, req.body.content, imgsrc];

  if (!req.files) {
    console.log("No file upload");
  } else {
    // const sql = `INSERT INTO blogs (title, content, blog_Img) VALUES (?)`;
    const sql = `UPDATE blogs SET title = '${req.body.title}', content = '${req.body.content}', blog_Img = '${imgsrc}' WHERE id = ${req.params.id}`;

    db.query(sql, [addData], function (err, result) {
      if (err) throw err;
      res.json(result);
      console.log("file uploaded");
    });
  }
});


// Delete blog
app.post("/deleteblog/:id", (req, res) => {
  const sql = `DELETE FROM blogs WHERE id = ${req.params.id}`;

  db.query(sql, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
