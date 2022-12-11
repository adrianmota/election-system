const Sequelize = require("sequelize");

const sequelize = require("../context/appContext");

const Election = sequelize.define("Election", {
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
  dateRealization: {
    type: Sequelize.STRING,
    allowNull: false,
  }, 
  status: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
});

module.exports = Election;