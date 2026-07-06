const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize.config');

const Asignatura = sequelize.define('Asignatura', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "El nombre de la asignatura es requerido" }
        }
    }
});

module.exports = Asignatura;