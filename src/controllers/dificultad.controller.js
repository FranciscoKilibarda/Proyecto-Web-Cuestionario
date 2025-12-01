const Dificultad = require('../models/dificultad.model');

const obtenerDificultades = async (req, res) => {
  try {
    const dificultades = await Dificultad.find();
    return res.json(dificultades);
  } catch (error) {
    console.error('Error obteniendo dificultades:', error.message);
    return res.status(500).json({ message: 'Error obteniendo dificultades' });
  }
};

const obtenerDificultadPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const dificultad = await Dificultad.findById(id);

    if (!dificultad) {
      return res.status(404).json({ message: 'Dificultad no encontrada' });
    }

    return res.json(dificultad);
  } catch (error) {
    console.error('Error obteniendo dificultad:', error.message);
    return res.status(500).json({ message: 'Error obteniendo dificultad' });
  }
};

const crearDificultad = async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;

    if (!nombre || nombre.trim() === '') {
      return res.status(400).json({ message: 'El nombre es obligatorio' });
    }

    const dificultad = await Dificultad.create({ nombre, descripcion });
    return res.status(201).json(dificultad);
  } catch (error) {
    console.error('Error creando dificultad:', error.message);
    return res.status(500).json({ message: 'Error creando dificultad' });
  }
};

const actualizarDificultad = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;

    if (!nombre || nombre.trim() === '') {
      return res.status(400).json({ message: 'El nombre es obligatorio' });
    }

    const dificultad = await Dificultad.findByIdAndUpdate(
      id,
      { nombre, descripcion },
      { new: true }
    );

    if (!dificultad) {
      return res.status(404).json({ message: 'Dificultad no encontrada' });
    }

    return res.json(dificultad);
  } catch (error) {
    console.error('Error actualizando dificultad:', error.message);
    return res.status(500).json({ message: 'Error actualizando dificultad' });
  }
};

const eliminarDificultad = async (req, res) => {
  try {
    const { id } = req.params;
    const dificultad = await Dificultad.findByIdAndDelete(id);

    if (!dificultad) {
      return res.status(404).json({ message: 'Dificultad no encontrada' });
    }

    return res.json({ message: 'Dificultad eliminada correctamente' });
  } catch (error) {
    console.error('Error eliminando dificultad:', error.message);
    return res.status(500).json({ message: 'Error eliminando dificultad' });
  }
};

module.exports = {
  obtenerDificultades,
  obtenerDificultadPorId,
  crearDificultad,
  actualizarDificultad,
  eliminarDificultad,
};

