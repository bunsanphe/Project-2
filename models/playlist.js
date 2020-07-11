const orm = require("../config/orm");

const playlist = {
  all(columns, cb) {
    orm.selectAll(columns, "playlist", cb);
  }
};

module.exports = playlist;
