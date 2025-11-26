
const express = require('express');
const router = express.Router();
const RangoEdad = require('../models/rangoEdad.model');

router.get('/', async (req, res) => {
  try {
    const rangos = await RangoEdad.find();
    res.json(rangos);
  } catch (error) {
    console.error('Error obteniendo rangos de edad:', error.message);
    res.status(500).json({ message: 'Error obteniendo rangos de edad' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { edad_min, edad_max, etiqueta } = req.body;
    const rango = await RangoEdad.create({ edad_min, edad_max, etiqueta });
    res.status(201).json(rango);
  } catch (error) {
    console.error('Error creando rango de edad:', error.message);
    res.status(500).json({ message: 'Error creando rango de edad' });
  }
});

module.exports = router;
