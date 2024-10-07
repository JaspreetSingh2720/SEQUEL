const { Sequelize, DataTypes } = require('sequelize');
const {sequelize} = require("../config/dbConnection")


const UserModel = sequelize.define('user', {
  id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
  },
  username: {
      type: DataTypes.STRING,
      allowNull: false
  }
}, {
  freezeTableName: true,
  timestamps: true
});


module.exports = {UserModel}