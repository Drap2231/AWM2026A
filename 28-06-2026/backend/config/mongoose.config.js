const mongoose = require ("mongoose")
mongoose.connect("mongodb://127.0.0.1/bdd_epn")
 .then(()=> console.log("Establecieminto de la conexion corecta "))
 .catch(err => console.log("Error al establcer conexion", err))