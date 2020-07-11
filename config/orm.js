const db = require("../models/index");

const orm = {
  selectAll(columns, tableName, cb) {
    const queryString = "SELECT ?? FROM ??";
    db.query(queryString, [columns, tableName], (err, data) => {
      if (err) {
        throw err;
      }
      console.log(data);
      cb(data);
    });
  }
};

module.exports = orm;
