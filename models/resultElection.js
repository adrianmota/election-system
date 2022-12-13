const Sequelize = require("sequelize");

const sequelize = require("../context/appContext");

const ResultElection = sequelize.define("resultElection", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  fullName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  namePolitic: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  nameElectivePosition: {
    type: Sequelize.STRING,
    allowNull: false,
  },  
  votes:{
    type: Sequelize.INTEGER,
    allowNull: false,
  }
});

module.exports = ResultElection;