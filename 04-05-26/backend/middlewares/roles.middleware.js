
module.exports.grantAccess = (rolesPermitidos) => {
    return (req, res, next) => {
        // Aseguramos que el middleware 'protect' ya se haya ejecutado y exista el usuario
        if (!req.Usuario) {
            return res.status(401).json({ message: "No autenticado, falta el usuario." });
        }

        const rolUsuario = req.Usuario.rol;

        // Regla: El rol 'admin' siempre tiene acceso a todo
        if (rolUsuario === 'admin') {
            return next();
        }

        // Verificar si el rol del usuario está dentro de los permitidos para esta ruta
        if (rolesPermitidos.includes(rolUsuario)) {
            return next();
        }

        // Si no cumple ninguna, denegar acceso
        return res.status(403).json({ message: "No tienes permisos para realizar esta acción." });
    };
};