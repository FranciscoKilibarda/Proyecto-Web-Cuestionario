const express = require('express');
const router = express.Router();
const Subcategoria = require('../models/subcategoria.model');

router.get('/', async (req, res) => {
  try {
    const subcategorias = await Subcategoria.find().populate('categoria');
    res.json(subcategorias);
  } catch (error) {
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
    res.status(500).json({ message: 'Error creando subcategoria' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const sub = await Subcategoria.findById(req.params.id).populate('categoria');
    if (!sub) return res.status(404).json({ message: 'No encontrada' });
    res.json(sub);
  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo subcategoria' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const sub = await Subcategoria.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(sub);
  } catch (error) {
    res.status(500).json({ message: 'Error actualizando subcategoria' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Subcategoria.findByIdAndDelete(req.params.id);
    res.json({ message: 'Subcategoria eliminada' });
  } catch (error) {
    res.status(500).json({ message: 'Error eliminando subcategoria' });
  }
});

module.exports = router;
