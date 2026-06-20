const EstudianteController = require("../controllers/estudiante.controller");

module.exports = function(app){
    app.get("/estudiantes", EstudianteController.getAllEstudiantes);
    app.get("/estudiantes/:id/detalle",EstudianteController.getEstudianteById)
    app.post("/estudiantes/crear",EstudianteController.createEstudiante)
    app.put("/estudiantes/:id",EstudianteController.updateEstudiante)
    app.delete("/estudiantes/:id",EstudianteController.deleteEstudiante)
    app.post('/estudiantes/login',EstudianteController.loginEstudiante)
}