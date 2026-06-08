const mongoose = require('mongoose');
const EstudianteSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required : [
                true, 
                "El nombre es requerido OwO"
            ]
        },
        edad: {
            type: Number,
            required : [
                true, 
                "La edad es requerida UwU"
            ]
        },
        url: {
            type: String,

        }
    }
);
const Estudiante = mongoose.model("Estudiante", EstudianteSchema);
module.exports = Estudiante;