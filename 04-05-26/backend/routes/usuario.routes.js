const UsuarioController = require("../controllers/usuario.controller");
const {protect} = require("../middlewares/autorizacion.middleware")
module.exports = function(app){
    app.post("/usuarios",UsuarioController.createUsuario)
    app.put("/usuarios/:id",protect ,UsuarioController.updateUsuario)
    app.post("/usuarios/login",UsuarioController.loginUsuario)
}