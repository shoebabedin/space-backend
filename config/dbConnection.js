var mysql = require("mysql");



// function dbConnection() {
  var db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "test_insapce"
  });

  db.connect(function (err) {
    if (err) {
      console.error("error connecting: " + err.stack);
      return;
    }

    console.log("connected as id " + db.threadId);
  });
// }

module.exports = db;
