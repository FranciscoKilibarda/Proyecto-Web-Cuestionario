const express = require('express');
const router = express.Router();
const Categoria = require('../models/categoria.model');

router.get('/', async (req, res) => {
  try {
    const categorias = await Categoria.find();
    res.json(categorias);
  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo categorias' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;
    const categoria = await Categoria.create({ nombre, descripcion });
    res.status(201).json(categoria);
  } catch (error) {
    res.status(500).json({ message: 'Error creando categoria' });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const categoria = await Categoria.findById(req.params.id);
    if (!categoria) return res.status(404).json({ message: 'No encontrada' });
    res.json(categoria);
  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo categoria' });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const categoria = await Categoria.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(categoria);
  } catch (error) {
    res.status(500).json({ message: 'Error actualizando categoria' });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    await Categoria.findByIdAndDelete(req.params.id);
    res.json({ message: 'Categoría eliminada' });
  } catch (error) {
    res.status(500).json({ message: 'Error eliminando categoria' });
  }
});

module.exports = router;
