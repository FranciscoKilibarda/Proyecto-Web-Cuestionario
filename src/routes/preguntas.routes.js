const express = require('express');
const router = express.Router();
const Pregunta = require('../models/pregunta.model');

router.get('/', async (req, res) => {
  try {
    const preguntas = await Pregunta.find()
      .populate('dificultad')
      .populate('rangoEdad')
      .populate('categoria')
      .populate('subcategoria');

    res.json(preguntas);
  } catch (error) {
    console.error('Error obteniendo preguntas:', error.message);
    res.status(500).json({ message: 'Error obteniendo preguntas' });
  }
});

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
    console.error('Error creando pregunta:', error.message);
    res.status(500).json({ message: 'Error creando pregunta' });
  }
});

module.exports = router;
