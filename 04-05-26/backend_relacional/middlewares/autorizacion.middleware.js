const jwt = require("jsonwebtoken");
const { Usuario } = require("../models/usuario.model");

const jwt_secret = "ok123";

module.exports.protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            // Obtener el token
            token = req.headers.authorization;
            console.log("Token recibido con Bearer:", token);

            token = token.split(" ")[1];
            console.log("Token extraído:", token);

            // Verificar el token
            const decoded = jwt.verify(token, jwt_secret);

            // Buscar el usuario por su id (sin devolver la contraseña)
            req.Usuario = await Usuario.findByPk(decoded.id, {
                attributes: { exclude: ["password"] }
            });

            if (!req.Usuario) {
                return res.status(401).json({
                    message: "Usuario no encontrado"
                });
            }

            next();

        } catch (error) {
            return res.status(401).json({
                message: "Not authorized!"
            });
        }
    }

    // Si no existe token
    if (!token) {
        return res.status(401).json({
            message: "Not authorized, missed token!"
        });
    }
};