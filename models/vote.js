const Sequelize = require("sequelize");

const sequelize = require("../context/appContext");

const Vote = sequelize.define("vote", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  }    
});

module.exports = Vote;