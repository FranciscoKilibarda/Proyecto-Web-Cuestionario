const express = require('express');
const router = express.Router();
const {
  obtenerSubcategorias,
  obtenerSubcategoriaPorId,
  crearSubcategoria,
  actualizarSubcategoria,
  eliminarSubcategoria,
} = require('../controllers/subcategoria.controller');

router.get('/', obtenerSubcategorias);
router.get('/:id', obtenerSubcategoriaPorId);
router.post('/', crearSubcategoria);
router.put('/:id', actualizarSubcategoria);
router.delete('/:id', eliminarSubcategoria);

module.exports = router;
