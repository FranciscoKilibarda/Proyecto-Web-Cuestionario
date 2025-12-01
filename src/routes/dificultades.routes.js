const express = require('express');
const router = express.Router();
const {
  obtenerDificultades,
  obtenerDificultadPorId,
  crearDificultad,
  actualizarDificultad,
  eliminarDificultad,
} = require('../controllers/dificultad.controller');

router.get('/', obtenerDificultades);
router.get('/:id', obtenerDificultadPorId);
router.post('/', crearDificultad);
router.put('/:id', actualizarDificultad);
router.delete('/:id', eliminarDificultad);

module.exports = router;
