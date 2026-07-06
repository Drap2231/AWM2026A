const Matricula = require('../models/matricula.model');
//const Estudiante = require('../models/estudiante.model');
const Asignatura = require('../models/asignatura.model');
const { where } = require('sequelize');

// Controlador para matricular un estudiante en una asignatura
module.exports.matricularEstudiante = async (req, res) => {
    try {
        const { estudianteId, asignaturaId } = req.body;

        const matricula = await Matricula.create({
            EstudianteId: estudianteId,
            AsignaturaId: asignaturaId
        });

        res.json(matricula);
    } catch (err) {
        res.status(500).json({
            msg: "Ocurrió un error al registrar la matrícula"
        });
    }
};
module.exports.getEstudianteMatricula = async (req, res) => {
    try{
        const matricula = await Matricula.findAll({
            where : {EstudianteId: req.params.estudianteId},
            include: [Asignatura]
        }) ;
        res.json(matricula);
    } catch (err) {
        res.status(500).json({msg: "Ocurrio un error al obtner las asignaturas matriculadas" })
    }
    }
