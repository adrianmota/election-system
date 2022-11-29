const { Sequelize } = require("sequelize");
const path = require("path");
require("dotenv").config(path.join(require.main.path, ".env"));

const sequelize = new Sequelize(
  "electionsystem",
  process.env.USER,
  process.env.PASSWORD,
  {
    dialect: "mysql",
    host: "localhost",
    port: 3306,
  }
);

module.exports = sequelize;