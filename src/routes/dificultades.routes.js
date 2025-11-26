
const express = require('express');
const router = express.Router();
const Dificultad = require('../models/dificultad.model');

router.get('/', async (req, res) => {
  try {
    const dificultades = await Dificultad.find();
    res.json(dificultades);
  } catch (error) {
    console.error('Error obteniendo dificultades:', error.message);
    res.status(500).json({ message: 'Error obteniendo dificultades' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { nombre } = req.body;
    const nueva = await Dificultad.create({ nombre });
    res.status(201).json(nueva);
  } catch (error) {
    console.error('Error creando dificultad:', error.message);
    res.status(500).json({ message: 'Error creando dificultad' });
  }
});

module.exports = router;
