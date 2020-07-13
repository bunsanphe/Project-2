"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(module.filename);
const envProc = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[envProc];
const db = {};

const env = require("node-env-file");
const envPath = path.join(__dirname, "../.env");

try {
  if (fs.existsSync(envPath)) {
    env(envPath);
  }
} catch (err) {
  console.log(
    "\nMissing .env file. Complete first time set up and then restart."
  );
}

if (config.use_env_variable) {
  const sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  const sequelize = new Sequelize(
    config.database,
    config.username,
    process.env.DB_PASSWORD,
    config
  );
}

fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
