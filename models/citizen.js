const Sequelize = require("sequelize");

const sequelize = require("../context/appContext");

const Citizen = sequelize.define("Citizen", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  documentId: {
    type: Sequelize.STRING(13),
    allowNull: false,
    unique: true,
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  voted: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  status: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
});

module.exports = Citizen;