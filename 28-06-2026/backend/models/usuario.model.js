const mongoose = require("mongoose")
const UsuarioSchema = new mongoose.Schema({
    email:{
        type : String,
        required: [true, "El nombre es requerido"]
    },

    password : {
        type : String,
        required: [true, "La direccion es requerida"]
    },

    rol : {
        type : String,
        required: [true, "La direccion es requerida"]
    },
    
},
  {versionKey : false}  
);
const Usuario = mongoose.model ("Usuario", UsuarioSchema);
module.exports = Usuario;