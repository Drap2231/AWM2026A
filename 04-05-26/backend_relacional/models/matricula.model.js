const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize.config');
const Estudiante = require('./estudiante.model');
const Asignatura = require('./asignatura.model');

const Matricula = sequelize.define('Matricula', {
    fechaMatricula: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW, //fecha actual será el valor por default
        allowNull: false
    }
});

// Definición de relación muchos a muchos
Estudiante.belongsToMany(Asignatura, { through: Matricula });
Asignatura.belongsToMany(Estudiante, { through: Matricula });

// Definición de relaciones uno a muchos para cargar con `include` en el controlador
Matricula.belongsTo(Estudiante, { foreignKey: 'EstudianteId' });
Matricula.belongsTo(Asignatura, { foreignKey: 'AsignaturaId' });

module.exports = Matricula;