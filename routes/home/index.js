const express = require("express");
const multer = require("multer");
const route = express.Router();
const db = require("../../config/dbConnection");
const path = require("path");
const upload = require("../../middlewear/imageUploader");





// create Home
route.post("/createhome", upload.fields([{ name: "file" }, { name: "files" }]), async (req, res) => {

  const imgsrc = req.files["files"] ? req.files["files"].map((file) => file.filename) : [];

  const addData = [
    req.body.companyName,
    req.body.address,
    req.body.phone,
    req.body.email,
    req.body.googleMap,
    req.files["file"] ? req.files["file"][0].filename : null,
    JSON.stringify(imgsrc)
  ];



  if (req.files["file"] && req.files["file"][0].filename.length > 0 || imgsrc.length > 0) {
    console.log("No file upload");
  } else {
    const sql = `INSERT INTO home (company_name, address, phone, email, map , image, home_slider) VALUES (?)`;

    db.query(sql, [addData], function (err, result) {
      if (err) throw err;
      res.json(result);
      console.log("file uploaded");
    });
  }
});

// all Home
route.get("/home", (req, res) => {

    const sql = `SELECT * FROM home`;
  
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.json(result);
    });


});

// Edit blog
route.post("/updatehome/:id", upload.fields([{ name: "file" }, { name: "files" }]), (req, res) => {
 

  const imgsrc = req.files["files"] ? req.files["files"].map((file) => file.filename) : [];
  const addData = [
    req.body.companyName,
    req.body.address,
    req.body.phone,
    req.body.email,
    req.body.googleMap,
    req.files["file"] ? req.files["file"][0].filename : null,
    JSON.stringify(imgsrc)
  ];



  if (req.files["file"] && req.files["file"][0].filename.length > 0 || imgsrc.length > 0) {
    const sql = `UPDATE home SET company_name='${req.body.companyName}',address='${req.body.address}',phone='${req.body.phone}',email='${req.body.email}',map ='${req.body.googleMap}',image='${req.files["file"][0].filename}', home_slider='${JSON.stringify(imgsrc)}' WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.json(result);
      console.log(result);
      console.log("file uploaded");
    });
  } else {
    const sql = `UPDATE home SET company_name='${req.body.companyName}',address='${req.body.address}',phone='${req.body.phone}',email='${req.body.email}',map ='${req.body.googleMap}' WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.json(result);
      console.log(result);
      console.log("no file uploaded");
    });
  }
});


// Delete home
route.post("/deletehome/:id", (req, res) => {
  const sql = `DELETE FROM home WHERE id = ${req.params.id}`;

  db.query(sql, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

module.exports = route;
