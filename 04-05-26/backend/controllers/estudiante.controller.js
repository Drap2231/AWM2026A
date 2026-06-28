const Estudiante = require("../models/estudiante.model");

//Generar jwt
const jwt_secret = "ok123"
const generateToken = (id, email, nombre, rol) => {
    return jwt.sign({ id, email, nombre, rol }, jwt_secret, { expiresIn: "30d" })
}
module.exports.getAllEstudiantes = (_, response) => {
    Estudiante.find({})
        .then(estudiantes => response.json(estudiantes))
        .catch(err => response.json(err))
}
module.exports.getEstudianteById = (request, response) => {
    const { id } = request.params;
    Estudiante.findById(id)
        .then(estudiante => {
            response.json(estudiante);
        })
        .catch(err => response.json(err));
};
module.exports.createEstudiante = async (request, response) => {
    const { nombre, edad, url} = request.body;
    if (!nombre || !edad ) {
        response.status(400).json({ message: "Son mandatorios" })
    }
    else {
        const estudianteFound = await Estudiante.findOne({ nombre })
        if (estudianteFound) {
            response.status(400).json({ message: "Ya existe el estudiante tonto :v" })
        } else {
            Estudiante.create({ nombre, edad, url })
                .then(estudiante => response.json({ nombre: estudiante.nombre, edad: estudiante.edad, url: estudiante.url }))
                .catch(err => response.json(err));

        }
    }
};

module.exports.updateEstudiante = (request, response) => {
    const { id } = request.params;
    Estudiante.findByIdAndUpdate(id, request.body, { new: true })
        .then(estudiante => {
            response.json(estudiante);
        })
        .catch(err => response.json(err));
}
module.exports.deleteEstudiante = (request, response) => {

    const { id } = request.params;
    Estudiante.findByIdAndDelete(id)
        .then(() => response.json({ msg: "Estudiante eliminado correctamente" }))
        .catch(err => response.json(err));
}
