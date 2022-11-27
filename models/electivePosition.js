const Sequelize = require("sequelize");

const sequelize = require("../context/appContext");

const electivePosition = sequelize.define("electivePosition", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = electivePosition;
