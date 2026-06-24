
const jwt = require("jsonwebtoken");
const Estudiante = require("../models/estudiante.model");
const jwt_secret = "ok123"
module.exports.protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            // se obtiene el token (p.ej., Bearer DJDHFHFHHFHFHFH#%%)
            token = req.headers.authorization;
            console.log('Token recibido con Bearer: ', token);

            token = token.split(' ')[1];
            console.log('Token extraído: ', token);

            // se verifica el token
            const decoded = jwt.verify(token, jwt_secret);

            // agregamos a cada petición información del usuario - excepto el password
            // (recuperado con base en el _id contenido en el payload del token)
            req.estudiante = await Estudiante.findOne({ _id: decoded.id }).select("-password");

            next();
        } catch (error) {
            res.status(401).json({ message: 'Not authorized!' });
        }
    }

    // si no se tiene un token de portador, entonces no estará autorizado
    if (!token) {
        res.status(401).json({ message: 'Not authorized, missed token!' });
    }
};