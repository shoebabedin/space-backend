const express = require("express");
const multer = require("multer");
const route = express.Router();
const db = require("../../config/dbConnection");
const path = require("path");

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

// all blog
route.get("/blog", (req, res) => {
  const sql = `SELECT * FROM blogs`;

  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// create blog
route.post("/createblog", upload.array("files"), async (req, res) => {
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
route.post("/updateblog/:id", upload.array("files"), (req, res) => {
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
route.post("/deleteblog/:id", (req, res) => {
  const sql = `DELETE FROM blogs WHERE id = ${req.params.id}`;

  db.query(sql, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

module.exports = route;
