
const express = require('express');
const router = express.Router();
const Categoria = require('../models/categoria.model');

router.get('/', async (req, res) => {
  try {
    const categorias = await Categoria.find();
    res.json(categorias);
  } catch (error) {
    console.error('Error obteniendo categorias:', error.message);
    res.status(500).json({ message: 'Error obteniendo categorias' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;
    const categoria = await Categoria.create({ nombre, descripcion });
    res.status(201).json(categoria);
  } catch (error) {
    console.error('Error creando categoria:', error.message);
    res.status(500).json({ message: 'Error creando categoria' });
  }
});

module.exports = router;
