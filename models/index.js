'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(module.filename);
var envProc   = process.env.NODE_ENV || 'development';
var config    = require(__dirname + '/../config/config.json')[envProc];
var db        = {};

const env = require("node-env-file");
const envPath = path.join(__dirname, "../.env");

try {
  if(fs.existsSync(envPath)) env(envPath);
} catch(err) {console.log("\nMissing .env file. Complete first time set up and then restart.");}

if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  var sequelize = new Sequelize(config.database, config.username, process.env.DB_PASSWORD, config);
}

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(function(file) {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
