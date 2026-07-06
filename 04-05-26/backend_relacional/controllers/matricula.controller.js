const Matricula = require('../models/matricula.model');
const Estudiante = require('../models/estudiante.model');
const Asignatura = require('../models/asignatura.model');

// Controlador para matricular un estudiante en una asignatura
module.exports = {
    matricularEstudiante: async (req, res) => {
        try {
            const { estudianteId, asignaturaId } = req.body;
            const matricula = await Matricula.create({ 
                EstudianteId: estudianteId, 
                AsignaturaId: asignaturaId 
            });
            
            res.json(matricula);
        } catch (err) {
            res.status(500).json({ msg: "Ocurrió un error al registrar la matriculación" });
        }
    }
};

module.exports = {
    getEstudianteMatriculas: async (req, res) => {
        try {
            const matriculas = await Matricula.findAll({
                where: { EstudianteId: req.params.estudianteId },
                include: [Asignatura]
            });
            res.json(matriculas);
        } catch (err) {
            res.status(500).json({ msg: "Ocurrió un error al obtener las asignaturas matriculadas" });
        }
    }
};
