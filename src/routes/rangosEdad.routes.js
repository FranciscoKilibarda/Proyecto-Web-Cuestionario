const express = require('express');
const router = express.Router();
const {
  obtenerRangosEdad,
  obtenerRangoEdadPorId,
  crearRangoEdad,
  actualizarRangoEdad,
  eliminarRangoEdad,
} = require('../controllers/rangoEdad.controller');

router.get('/', obtenerRangosEdad);
router.get('/:id', obtenerRangoEdadPorId);
router.post('/', crearRangoEdad);
router.put('/:id', actualizarRangoEdad);
router.delete('/:id', eliminarRangoEdad);

module.exports = router;
