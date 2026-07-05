const Asignatura = require('../models/asignatura.model');

module.exports = {

    crear: async (req, res) => {
        try {
            const nuevaAsignatura = await Asignatura.create(req.body);
            res.status(201).json(nuevaAsignatura);
        } catch (err) {
            res.status(400).json({ msg: err.message || "Error al crear la asignatura" });
        }
    },


    obtenerTodas: async (req, res) => {
        try {
            const asignaturas = await Asignatura.findAll();
            res.json(asignaturas);
        } catch (err) {
            res.status(500).json({ msg: "Error al obtener las asignaturas" });
        }
    },

  
    obtenerPorId: async (req, res) => {
        try {
            const asignatura = await Asignatura.findByPk(req.params.id);
            if (!asignatura) {
                return res.status(404).json({ msg: "Asignatura no encontrada" });
            }
            res.json(asignatura);
        } catch (err) {
            res.status(500).json({ msg: "Error al obtener la asignatura" });
        }
    },


    actualizar: async (req, res) => {
        try {
            const asignatura = await Asignatura.findByPk(req.params.id);
            if (!asignatura) {
                return res.status(404).json({ msg: "Asignatura no encontrada" });
            }
            await asignatura.update(req.body);
            res.json({ msg: "Asignatura actualizada con éxito", asignatura });
        } catch (err) {
            res.status(400).json({ msg: err.message || "Error al actualizar la asignatura" });
        }
    },


    eliminar: async (req, res) => {
        try {
            const asignatura = await Asignatura.findByPk(req.params.id);
            if (!asignatura) {
                return res.status(404).json({ msg: "Asignatura no encontrada" });
            }
            await asignatura.destroy();
            res.json({ msg: "Asignatura eliminada con éxito" });
        } catch (err) {
            res.status(500).json({ msg: "Error al eliminar la asignatura" });
        }
    }
};