const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Estudiante', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      validate: {
        notNull: { msg: "Id is required" }
      }
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Nombre is required" }
      }
    },
    edad: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "Edad is required" },
        isInt: { msg: "Edad debe ser un número entero" },
        min: { args: [0], msg: "Edad no puede ser negativa" }
      }
    },
    url: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: { msg: "URL no válida" }
      }
    }
  });
};