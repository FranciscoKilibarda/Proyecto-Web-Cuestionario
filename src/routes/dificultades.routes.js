const express = require('express');
const router = express.Router();
const Dificultad = require('../models/dificultad.model');

// Obtener todas
router.get('/', async (req, res) => {
  try {
    const dificultades = await Dificultad.find();
    res.json(dificultades);
  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo dificultades' });
  }
});

// Crear
router.post('/', async (req, res) => {
  try {
    const { nombre } = req.body;
    const nueva = await Dificultad.create({ nombre });
    res.status(201).json(nueva);
  } catch (error) {
    res.status(500).json({ message: 'Error creando dificultad' });
  }
});

// Obtener por ID
router.get('/:id', async (req, res) => {
  try {
    const dificultad = await Dificultad.findById(req.params.id);
    if (!dificultad) return res.status(404).json({ message: 'No encontrada' });
    res.json(dificultad);
  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo dificultad' });
  }
});

// Actualizar
router.put('/:id', async (req, res) => {
  try {
    const dificultad = await Dificultad.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(dificultad);
  } catch (error) {
    res.status(500).json({ message: 'Error actualizando dificultad' });
  }
});

// Eliminar
router.delete('/:id', async (req, res) => {
  try {
    await Dificultad.findByIdAndDelete(req.params.id);
    res.json({ message: 'Dificultad eliminada' });
  } catch (error) {
    res.status(500).json({ message: 'Error eliminando dificultad' });
  }
});

module.exports = router;
