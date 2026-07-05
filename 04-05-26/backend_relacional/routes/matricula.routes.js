const MatriculaController = require('../controllers/matricula.controller');

module.exports = function(app) {
    app.post('/matricula', MatriculaController.matricularEstudiante);
    app.get('/estudiante/:estudianteId/matriculas', MatriculaController.getEstudianteMatriculas);
};