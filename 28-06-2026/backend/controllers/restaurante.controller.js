const Restaurante = require("../models/restaurante.model");

module.exports.getAllRestaurantes = (_, response) => {
  Restaurante.find({})
    .then((restaurantes) => response.json(restaurantes))
    .catch((err) => response.json(err));
};
module.exports.getRestauranteById = (request, response) => {
  const { id } = request.params;
  Restaurante.findById(id)
    .then((restaurante) => response.json(restaurante))
    .catch((err) => response.json(err));
};
module.exports.createRestaurante = async (request, response) => {
  const { nombre, direccion, estrellas } = request.body;
  if (!nombre || !direccion) {
    response
      .status(400)
      .json({ message: "nombre y direccion son mandatorios" });
  } else {
    const restauranteFound = await Restaurante.findOne({ nombre });
    if (restauranteFound) {
      response
        .status(400)
        .json({ message: "Ya existe el restaurante tonto xD :v" });
    } else {
      Restaurante.create({ nombre, direccion, estrellas })
        .then((restaurante) =>
          response.json({
            nombre: restaurante.nombre,
            direccion: restaurante.direccion,
            estrellas: restaurante.estrellas,
          }),
        )
        .catch((err) => response.json(err));
    }
  }
};

module.exports.updateRestaurante = (request, response) => {
  const { id } = request.params;
  const { nombre, direccion, estrellas } = request.body;
  Restaurante.findByIdAndUpdate(
    id,
    { nombre, direccion, estrellas },
    { new: true },
  )
    .then((restaurante) => response.json(restaurante))
    .catch((err) => response.json(err));
};
module.exports.deleteRestaurante = (request, response) => {
  const { id } = request.params;
  Restaurante.findByIdAndDelete(id)
    .then(() =>
      respons.json({ msg: "Se elimino correctamente el restaurante owo" }),
    )
    .catch((err) => response.json(err));
};
