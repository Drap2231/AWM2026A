const Estudiante = require("../models/estudiante.model");
const bcrypt = require("bcryptjs")

module.exports.getAllEstudiantes = (_,response) => {
    Estudiante.find({})
        .then (estudiantes => response.json(estudiantes))
        .catch (err => response.json(err))
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
   const {nombre, edad, url, password, email} = request.body;
     if(!nombre||!edad||!password|| !email){
        response.status(400).json({message :"todos son mandatorios"})
     }
     else{
    const estudianteFound = await Estudiante.findOne({email})
    if (estudianteFound){
         response.status(400).json({message :"Ya existe el estudiante tonto :v"})
    }else{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        Estudiante.create({nombre, edad, url, email ,password: hashedPassword})
        .then(estudiante => response.json({nombre: estudiante.nombre, edad: estudiante.edad, url: estudiante.url, email: estudiante.email}))
        .catch(err => response.json(err));
    
        }
    }
};

module.exports.updateEstudiante = (request, response) => {
    const {id} = request.params;
    Estudiante.findByIdAndUpdate(id, request.body, { new: true})
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
module.exports.loginEstudiante = async(req, res) => {
    const{email, password} = req.body;
    const estudianteFound = await Estudiante.findOne({email});
    if(estudianteFound && (await bcrypt.compare(password, estudianteFound.password))){
        res.json({message:"entraste"})

    }else{
        res.status(400).json({message: "Login Failed"})
    }

}