const EstudianteController = require("../controllers/estudiante.controller");
const {protect} = require("../middlewares/autorizacion.middleware")
module.exports = function(app){
    app.get("/estudiantes",protect,EstudianteController.getAllEstudiantes);
    app.get("/estudiantes/:id",protect,EstudianteController.getEstudianteById)
    app.post("/estudiantes",EstudianteController.createEstudiante)
    app.put("/estudiantes/:id",protect ,EstudianteController.updateEstudiante)
    app.delete("/estudiantes/:id",protect ,EstudianteController.deleteEstudiante)
    app.post("/estudiantes/login",EstudianteController.loginEstudiante)
}