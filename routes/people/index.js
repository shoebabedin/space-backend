const express = require("express");
const multer = require("multer");
const route = express.Router();
const db = require("../../config/dbConnection");
const upload = require("../../middlewear/imageUploader");



// create People
route.post("/createpeople", upload.single("file"), async (req, res) => {

    const addData = [
      req.body.name,
      req.body.designation,
      req.file.filename
    ];
  
  
    if (!req.file) {
      console.log("No file upload");
    } else {
      const sql = `INSERT INTO people (name, designation, image) VALUES (?)`;
  
      db.query(sql, [addData], function (err, result) {
        if (err) throw err;
        res.json(result);
        console.log("file uploaded");
      });
    }
  });
  
  // all People
  route.get("/people", (req, res) => {
    const sql = `SELECT * FROM people`;
  
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.json(result);
    });
  });
  
  // Edit People
  route.post("/updatepeople/:id", upload.single("file"), async(req, res) => {
  
    const addData = [
      req.body.name,
      req.body.designation,
      req.body.file || req.file.filename
    ];
    
      const sql = `UPDATE people SET name='${req.body.name}', designation='${req.body.designation}', image='${req.body.file || req.file.filename}' WHERE id = ${req.params.id}`;
      db.query(sql, [addData], function (err, result) {
        if (err) throw err;
        res.json(result);
        console.log(result);
        console.log("file uploaded");
      });
  
  });
  
  // Delete People
  route.post("/deletepeople/:id", (req, res) => {
    const sql = `DELETE FROM people WHERE id = ${req.params.id}`;
  
    db.query(sql, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
  });
  


module.exports = route;