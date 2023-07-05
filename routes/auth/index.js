const express = require("express");
const db = require("../../config/dbConnection");
const route = express.Router();
const bcrypt = require("bcrypt");

// login
route.post("/loginuser", (req, res) => {
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

// Signup
route.post("/createuser", async (req, res) => {
  const sql = `INSERT INTO users (email, password, u_name) VALUES (?)`;

  const hashedPwd = await bcrypt.hash(req.body.password, 10);

  const addData = [req.body.email, hashedPwd, req.body.u_name];

  db.query(sql, [addData], function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

module.exports = route;
