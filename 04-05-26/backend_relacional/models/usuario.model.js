const { DataTypes } = require('sequelize');
const { createSequelize } = require('../config/sequelize.config');
const sequelize = createSequelize();

const Usuario = sequelize.define('Usuario', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    validate: {
      notNull: { msg: "Id is required" }
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: "email is required" }
    }
  },
  
 password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: "password is required" }
    }
  },
   rol: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: "rol is required" }
    }
  },
}, {
  tableName: 'usuarios'
});

module.exports = { Usuario };