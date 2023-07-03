const express = require("express");
const cors = require("cors");
var mysql = require("mysql");
// const route = require("./routes");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("./config/dbConnection");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());
const port = 5000;

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
  db.query(sql, [req.body.email], (err, data) =>{
    if (err) {
      return res.json("Error");
    }
    if (data.length > 0) {
      bcrypt.compare(req.body.password.toString(), data[0].password, (err, response)=>{
        if (err) {
          return res.json('Error')
        }
        if (response) {
          console.log({data})
          return res.json({Login: true, data})
        }
        return res.json({Login: false})
      })
    }
  })
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
app.post("/updateuser/:id", (req, res) => {
  const addData = [req.body.email, req.body.u_name];
  const sql = `UPDATE users SET email = '${req.body.email}', u_name = '${req.body.u_name}' WHERE id = ${req.params.id}`;

  db.query(sql, [addData], function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

// user delete
app.post("/deleteuser/:id", (req, res) => {
  const sql = `DELETE FROM users WHERE id = ${req.params.id}`;

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
