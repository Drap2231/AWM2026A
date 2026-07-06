const express = require('express');
const router = express.Router();
const asignaturaController = require('../controllers/asignatura.controller');

// Rutas del CRUD para Asignatura
router.post('/asignaturas', asignaturaController.crear);
router.get('/asignaturas', asignaturaController.obtenerTodas);
router.get('/asignaturas/:id', asignaturaController.obtenerPorId);
router.put('/asignaturas/:id', asignaturaController.actualizar);
router.delete('/asignaturas/:id', asignaturaController.eliminar);

module.exports = router;