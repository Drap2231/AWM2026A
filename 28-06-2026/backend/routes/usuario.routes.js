const UsuarioController = require("../controllers/usuario.controller")
const { protect } = require("../middlewares/autorizacion.middlesware")

module.exports = (app) => {
    app.post("/login", UsuarioController.loginUsuario)
    app.put("/usuario/:id", protect, UsuarioController.updateUsuario)
    app.post("/usuario", UsuarioController.createUsuario)
}