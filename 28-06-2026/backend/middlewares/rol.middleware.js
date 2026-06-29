const Usuario = require("../models/usuario.model");

module.exports.rollAccess = (rolesPermitidos) => {
    return (req ,res, next) => {
        if(!req.Usuario)
            return res.status(400).json({message: "Autenticate Primero xD"})
        const rol = req.Usuario.rol
        if(rol=='admin')
            return next()
        if(rolesPermitidos.includes(rol))
            return next()
        return res.status(401).json({message: `No tienes acceso a esto con tu rol de: (${rol})`})
    }
}