const { Usuario } = require("../models/usuario.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const jwt_secret = "ok123";

const generateToken = (id, email, rol) => {
    return jwt.sign(
        { id, email, rol },
        jwt_secret,
        { expiresIn: "30d" }
    );
};

// Crear usuario
module.exports.createUsuario = async (req, res) => {
    try {
        const { email, password, rol } = req.body;

        if (!email || !password || !rol) {
            return res.status(400).json({
                message: "Todos los campos son obligatorios"
            });
        }

        const usuarioFound = await Usuario.findOne({
            where: { email }
        });

        if (usuarioFound) {
            return res.status(400).json({
                message: "Ya existe un usuario con ese correo"
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const usuario = await Usuario.create({
            email,
            password: hashedPassword,
            rol
        });

        res.status(201).json({
            id: usuario.id,
            email: usuario.email,
            rol: usuario.rol
        });

    } catch (error) {
        res.status(500).json(error);
    }
};

// Actualizar usuario
module.exports.updateUsuario = async (req, res) => {
    try {
        const { id } = req.params;

        const usuario = await Usuario.findByPk(id);

        if (!usuario) {
            return res.status(404).json({
                message: "Usuario no encontrado"
            });
        }

        await usuario.update(req.body);

        const { password, ...usuarioSinPassword } = usuario.toJSON();

        res.json(usuarioSinPassword);

    } catch (error) {
        res.status(500).json(error);
    }
};

// Login
module.exports.loginUsuario = async (req, res) => {
    try {
        const { email, password } = req.body;

        const usuarioFound = await Usuario.findOne({
            where: { email }
        });

        if (
            usuarioFound &&
            await bcrypt.compare(password, usuarioFound.password)
        ) {
            res.json({
                message: "Entraste",
                email: usuarioFound.email,
                rol: usuarioFound.rol,
                token: generateToken(
                    usuarioFound.id,
                    usuarioFound.email,
                    usuarioFound.rol
                )
            });
        } else {
            res.status(400).json({
                message: "Login Failed"
            });
        }

    } catch (error) {
        res.status(500).json(error);
    }
};