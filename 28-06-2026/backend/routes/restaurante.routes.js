const RestauranteController = require("../controllers/restaurante.controller")
const {rollAccess} = require("../middlewares/rol.middleware")
const {protect} = require("../middlewares/autorizacion.middlesware")

 module.exports = function(app){
   app.get("/restaurantes", protect, rollAccess(["gestor", "visitante"]), RestauranteController.getAllRestaurantes)

   app.get("/restaurantes/:id", protect, rollAccess(["gestor"]), RestauranteController.getRestauranteById)
   app.post("/restaurantes", protect, rollAccess(["gestor"]), RestauranteController.createRestaurante)
   
   app.put("/restaurantes/:id", protect, rollAccess([]), RestauranteController.updateRestaurante)
   app.delete("/restaurantes/:id", protect, rollAccess([], RestauranteController.deleteRestaurante))
 }