const mongoose = require("mongoose")
const RestauranteSchema = new mongoose.Schema({
    nombre:{
        type : String,
        required: [true, "El nombre es requerido"]
    },

    direccion : {
        type : String,
        required: [true, "La direccion es requerida"]
    },

    estrellas : {
        type : Number
    }
},
  {versionKey : false}  
);
const Restaurante = mongoose.model ("Restaurante", RestauranteSchema);
module.exports = Restaurante;