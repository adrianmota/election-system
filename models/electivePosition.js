const Sequelize = require("sequelize");

const sequelize = require("../context/appContext");

const ElectivePosition = sequelize.define("ElectivePosition", {
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
  status: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
});

module.exports = ElectivePosition;