const express = require('express');
const router = express.Router();

// 1. Importamos el Controlador (Lógica de negocio)
const {
  obtenerCategorias,
  obtenerCategoriaPorId,
  crearCategoria,
  actualizarCategoria,
  eliminarCategoria,
} = require('../controllers/categoria.controller');

// 2. Importamos el Validador (El policía)
// Asegúrate de que la ruta '../validators/categoria.validator' sea correcta
const { validateCreateCategoria } = require('../validators/categoria.validator');

// --- RUTAS ---

router.get('/', obtenerCategorias);

router.get('/:id', obtenerCategoriaPorId);

// 3. APLICAMOS LA VALIDACIÓN AQUÍ
// El orden importa: Ruta -> Validador -> Controlador
// Si el validador encuentra errores, 'crearCategoria' NUNCA se ejecuta.
router.post('/', validateCreateCategoria, crearCategoria);

// También es buena práctica validar al actualizar (PUT)
router.put('/:id', validateCreateCategoria, actualizarCategoria);

router.delete('/:id', eliminarCategoria);

module.exports = router;