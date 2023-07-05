const express = require("express");
const route = express.Router();

// create Home
route.post("/createhome", upload.array("files"), async (req, res) => {
  const imgsrc = JSON.stringify(req.files.map((file) => file.filename));

  const addData = [
    req.body.companyName,
    req.body.address,
    req.body.phone,
    req.body.email,
    req.body.googleMap,
    imgsrc
  ];

  if (!req.files) {
    console.log("No file upload");
  } else {
    const sql = `INSERT INTO home (company_name, address, phone, email, google_map, image) VALUES (?)`;

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
route.post("/updatehome/:id", upload.array("files"), (req, res) => {
  const imgsrc = JSON.stringify(req.files.map((file) => file.filename));
  const addData = [
    req.body.companyName,
    req.body.address,
    req.body.phone,
    req.body.email,
    req.body.googleMap,
    imgsrc
  ];

  if (req.files.length > 0) {
    const sql = `UPDATE home SET company_name='${req.body.companyName}',address='${req.body.address}',phone='${req.body.phone}',email='${req.body.email}',google_map='${req.body.googleMap}',image='${imgsrc}' WHERE id = ${req.params.id}`;
    db.query(sql, [addData], function (err, result) {
      if (err) throw err;
      res.json(result);
      console.log(result);
      console.log("file uploaded");
    });
  } else {
    const sql = `UPDATE home SET company_name='${req.body.companyName}',address='${req.body.address}',phone='${req.body.phone}',email='${req.body.email}',google_map='${req.body.googleMap}' WHERE id = ${req.params.id}`;
    db.query(sql, [addData], function (err, result) {
      if (err) throw err;
      res.json(result);
      console.log(result);
      console.log("file uploaded");
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
