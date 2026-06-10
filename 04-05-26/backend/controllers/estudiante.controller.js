const Estudiante = require("../models/estudiante.model");

module.exports.getAllEstudiantes = (_,response) => {
    Estudiante.find({})
        .then (estudiantes => response.json(estudiantes))
        .catch (err => response.json(err))
}
module.exports.getEstudianteID = (request,response) => {
    
    Estudiante.find({})
        .then (estudiantes => response.json(estudiantes))
        .catch (err => response.json(err))
}