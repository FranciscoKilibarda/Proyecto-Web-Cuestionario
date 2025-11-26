const express = require('express');
const router = express.Router();
const Subcategoria = require('../models/subcategoria.model');

router.get('/', async (req, res) => {
  try {
    const subcategorias = await Subcategoria.find().populate('categoria');
    res.json(subcategorias);
  } catch (error) {
    console.error('Error obteniendo subcategorias:', error.message);
    res.status(500).json({ message: 'Error obteniendo subcategorias' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { nombre, categoriaId } = req.body;
    const subcategoria = await Subcategoria.create({
      nombre,
      categoria: categoriaId
    });
    res.status(201).json(subcategoria);
  } catch (error) {
    console.error('Error creando subcategoria:', error.message);
    res.status(500).json({ message: 'Error creando subcategoria' });
  }
});

module.exports = router;
