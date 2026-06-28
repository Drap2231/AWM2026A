const mongoose = require('mongoose');
const UsuarioSchema = new mongoose.Schema(
    {
        email : {
            type: String,
            required: [true, "email is required" ]
        },
        password : {
            type: String,
            required: [true, "Password is required" ]
        },
         
          rol : {
            type: String,
             required: [true, "rol is required" ]

          }
    }
    ,
    { versionKey: false }
);
const Usuario = mongoose.model("Usuario", UsuarioSchema);
module.exports = Usuario;