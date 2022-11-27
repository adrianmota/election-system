const Sequelize = require("sequelize");

const sequelize = require("../context/appContext");

const Citizen = sequelize.define("Citizen", {
  id: {
    type: Sequelize.STRING(13),
    allowNull: false,
    primaryKey: true,
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
  status: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
});

module.exports = Citizen;
