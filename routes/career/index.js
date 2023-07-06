const express = require("express");
const multer = require("multer");
const db = require("../../config/dbConnection");
const route = express.Router();
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
  

// create Career
route.post("/createcareer", upload.single("file"), async (req, res) => {

    const addData = [
      req.body.title,
      req.body.vacancy,
      req.body.context,
      req.body.responsibilities,
      req.body.education,
      req.body.requirement,
      req.body.salary
    ];
  
  
  
      const sql = `INSERT INTO careers (title, vacancy, context, responsibilities, education, requirement, salary) VALUES (?)`;
  
      db.query(sql, [addData], function (err, result) {
        if (err) throw err;
        res.json(result);
        console.log("file uploaded");
      });
    
  });
  
  // all Career
  route.get("/career", (req, res) => {
    const sql = `SELECT * FROM careers`;
  
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.json(result);
    });
  });
  
  // Edit Career
  route.post("/updatecareer/:id", upload.single("file"), async(req, res) => {
  
    const addData = [
      req.body.title,
      req.body.vacancy,
      req.body.context,
      req.body.responsibilities,
      req.body.education,
      req.body.requirement,
      req.body.salary
    ];
    
      const sql = `UPDATE careers SET title='${req.body.title}', vacancy='${req.body.vacancy}', context='${req.body.context}', responsibilities='${req.body.responsibilities}', education='${req.body.education}', requirement='${req.body.requirement}', salary='${req.body.salary}' WHERE id = ${req.params.id}`;
      db.query(sql, [addData], function (err, result) {
        if (err) throw err;
        res.json(result);
        console.log(result);
        console.log("file uploaded");
      });
  
  });
  
  // Delete Career
  route.post("/deletecareer/:id", (req, res) => {
    const sql = `DELETE FROM careers WHERE id = ${req.params.id}`;
  
    db.query(sql, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
  });






  module.exports = route;