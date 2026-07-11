const EstudianteController = require("../controllers/estudiante.controller");
const { protect } = require("../middlewares/autorizacion.middleware");
const { grantAccess } = require("../middlewares/roles.middleware");

module.exports = function(app){
    // Permitido para admin y visualizador
    app.get("/estudiantes", protect, grantAccess(["visualizador"]) ,EstudianteController.getAllEstudiantes);
    app.get("/estudiantes/:id", protect, grantAccess(["visualizador"]), EstudianteController.getEstudianteById);
    
    // Solo permitido para admin
    app.post("/estudiantes", protect, grantAccess([]), EstudianteController.createEstudiante);
    app.put("/estudiantes/:id", protect, grantAccess([]), EstudianteController.updateEstudiante);
    app.delete("/estudiantes/:id", protect, grantAccess([]), EstudianteController.deleteEstudiante);
};