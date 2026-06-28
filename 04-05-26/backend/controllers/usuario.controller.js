const Usuario = require("../models/usuario.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const jwt_secret = "ok123"
const generateToken = (id, email, nombre, rol) => {
    return jwt.sign({ id, email, nombre, rol }, jwt_secret, { expiresIn: "30d" })

}

module.exports.createUsuario = async (request, response) => {
    const {password, email, rol } = request.body;
    if (!password || !email || !rol) {
        response.status(400).json({ message: "todos son mandatorios" })
    }
    else {
        const usuarioFound = await Usuario.findOne({ email })
        if (usuarioFound) {
            response.status(400).json({ message: "Ya existe el estudiante tonto :v" })
        } else {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
                Usuario.create({email, password: hashedPassword, rol })
                .then(usuario=> response.json({email: usuario.email, rol: usuario.rol }))
                .catch(err => response.json(err));

        }
    }
};
module.exports.updateUsuario = (request, response) => {
    const { id } = request.params;
     
    Usuario.findByIdAndUpdate(id, request.body, { new: true })
        .select("-password") 
        .then(usuario => {
            if (!usuario) {
                return response.status(404).json({ message: "Usuario no encontrado" });
            }
            response.json(usuario);
        })
        .catch(err => response.status(500).json(err));

}
module.exports.loginUsuario = async (req, res) => {
    const { email, password } = req.body;
    const usuarioFound = await Usuario.findOne({ email });
    if (usuarioFound && (await bcrypt.compare(password, usuarioFound.password))) {
        res.json({ message: "entraste", email: usuarioFound.email, rol: usuarioFound.rol , token: generateToken(usuarioFound._id, usuarioFound.email, usuarioFound.rol) })

    } else {
        res.status(400).json({ message: "Login Failed" })
    }

}