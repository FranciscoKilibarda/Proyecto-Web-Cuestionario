const express = require('express');
const router = express.Router();
const RangoEdad = require('../models/rangoEdad.model');


router.get('/', async (req, res) => {
  try {
    const rangos = await RangoEdad.find();
    res.json(rangos);
  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo rangos de edad' });
  }
});


router.post('/', async (req, res) => {
  try {
    const { edad_min, edad_max, etiqueta } = req.body;
    const rango = await RangoEdad.create({ edad_min, edad_max, etiqueta });
    res.status(201).json(rango);
  } catch (error) {
    res.status(500).json({ message: 'Error creando rango de edad' });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const rango = await RangoEdad.findById(req.params.id);
    if (!rango) return res.status(404).json({ message: 'No encontrado' });
    res.json(rango);
  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo rango' });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const rango = await RangoEdad.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(rango);
  } catch (error) {
    res.status(500).json({ message: 'Error actualizando rango' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await RangoEdad.findByIdAndDelete(req.params.id);
    res.json({ message: 'Rango eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error eliminando rango' });
  }
});

module.exports = router;
