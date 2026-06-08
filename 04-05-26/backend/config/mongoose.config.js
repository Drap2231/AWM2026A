const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1/epn_bdd")
    .then(()=> console.log("Establecieminto de la conexion corecta "))
    .catch(err => console.log("Error al establcer conexion", err))