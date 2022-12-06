const Sequelize = require("sequelize");

const sequelize = require("../context/appContext");

const Candidate = sequelize.define("candidate", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
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
  ProfilePhoto: {
    type: Sequelize.STRING,
    allowNull: false,
  },  
  status: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
});

module.exports = Candidate;