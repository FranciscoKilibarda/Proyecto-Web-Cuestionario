const express = require('express');
const router = express.Router();
const Pregunta = require('../models/pregunta.model');

// Obtener todas
router.get('/', async (req, res) => {
  try {
    const preguntas = await Pregunta.find()
      .populate('dificultad')
      .populate('rangoEdad')
      .populate('categoria')
      .populate('subcategoria');

    res.json(preguntas);
  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo preguntas' });
  }
});

// Crear
router.post('/', async (req, res) => {
  try {
    const {
      texto,
      dificultadId,
      rangoEdadId,
      categoriaId,
      subcategoriaId,
      estado
    } = req.body;

    const pregunta = await Pregunta.create({
      texto,
      dificultad: dificultadId,
      rangoEdad: rangoEdadId,
      categoria: categoriaId,
      subcategoria: subcategoriaId,
      estado
    });

    res.status(201).json(pregunta);
  } catch (error) {
    res.status(500).json({ message: 'Error creando pregunta' });
  }
});

// Obtener por ID
router.get('/:id', async (req, res) => {
  try {
    const pregunta = await Pregunta.findById(req.params.id);
    if (!pregunta) return res.status(404).json({ message: 'No encontrada' });
    res.json(pregunta);
  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo pregunta' });
  }
});

// Actualizar
router.put('/:id', async (req, res) => {
  try {
    const pregunta = await Pregunta.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(pregunta);
  } catch (error) {
    res.status(500).json({ message: 'Error actualizando pregunta' });
  }
});

// Eliminar
router.delete('/:id', async (req, res) => {
  try {
    await Pregunta.findByIdAndDelete(req.params.id);
    res.json({ message: 'Pregunta eliminada' });
  } catch (error) {
    res.status(500).json({ message: 'Error eliminando pregunta' });
  }
});

module.exports = router;
