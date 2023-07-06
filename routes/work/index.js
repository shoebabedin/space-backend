const express = require("express");
const multer = require("multer");
const route = express.Router();
const db = require("../../config/dbConnection");
const path = require("path");
const upload = require("../../middlewear/imageUploader");

// create work
route.post("/creatework", upload.array("files"), async (req, res) => {
  const imgsrc = JSON.stringify(req.files.map((file) => file.filename));

  const addData = [req.body.title, req.body.description, imgsrc];

  if (!req.files) {
    console.log("No file upload");
  } else {
    const sql = `INSERT INTO works (title, description, image) VALUES (?)`;

    db.query(sql, [addData], function (err, result) {
      if (err) throw err;
      res.json(result);
      console.log("file uploaded");
    });
  }
});

// all work
route.get("/work", (req, res) => {
  const sql = `SELECT * FROM works`;

  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// Edit work
route.post("/updatework/:id", upload.array("files"), (req, res) => {
  const imgsrc = JSON.stringify(req.files.map((file) => file.filename));
  const addData = [req.body.title, req.body.description, imgsrc];

  if (req.files.length > 0) {
    const sql = `UPDATE works SET title='${req.body.title}',description='${req.body.description}',image='${imgsrc}' WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.json(result);
      console.log(result);
      console.log("file uploaded");
    });
  } else {
    const sql = `UPDATE works SET title='${req.body.title}',description='${req.body.description}' WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.json(result);
      console.log(result);
      console.log("no file uploaded");
    });
  }
});

// Delete work
route.post("/deletework/:id", (req, res) => {
  const sql = `DELETE FROM works WHERE id = ${req.params.id}`;

  db.query(sql, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

module.exports = route;
