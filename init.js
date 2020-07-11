const inquirer = require("inquirer");
const env = "development";
const config = require("./config/config.json")[env];
const fs = require("fs");

if (!config.DB_PASSWORD) {
  inquirer
    .prompt({
      _message: "Please enter your password for MySQL",
      get message() {
        return this._message;
      },
      set message(value) {
        this._message = value;
      },
      type: "input",
      name: "password"
    })
    .then(({ password }) => {
      fs.writeFile("./.env", `DB_PASSWORD="${password}"`, err => {
        if (err) {
          throw err;
        }
        console.log("Password configuration file created!");
      });
    });
} else {
  console.log("Configuration file already created!");
}
