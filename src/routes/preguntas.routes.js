const express = require('express');
const router = express.Router();
const {
  obtenerPreguntas,
  obtenerPreguntaPorId,
  crearPregunta,
  actualizarPregunta,
  eliminarPregunta,
} = require('../controllers/pregunta.controller');

router.get('/', obtenerPreguntas);
router.get('/:id', obtenerPreguntaPorId);
router.post('/', crearPregunta);
router.put('/:id', actualizarPregunta);
router.delete('/:id', eliminarPregunta);

module.exports = router;
