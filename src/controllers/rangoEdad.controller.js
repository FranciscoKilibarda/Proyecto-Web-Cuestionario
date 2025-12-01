const RangoEdad = require('../models/rangoEdad.model');

const obtenerRangosEdad = async (req, res) => {
  try {
    const rangos = await RangoEdad.find();
    return res.json(rangos);
  } catch (error) {
    console.error('Error obteniendo rangos de edad:', error.message);
    return res.status(500).json({ message: 'Error obteniendo rangos de edad' });
  }
};
const obtenerRangoEdadPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const rango = await RangoEdad.findById(id);

    if (!rango) {
      return res.status(404).json({ message: 'Rango de edad no encontrado' });
    }

    return res.json(rango);
  } catch (error) {
    console.error('Error obteniendo rango de edad:', error.message);
    return res.status(500).json({ message: 'Error obteniendo rango de edad' });
  }
};

const crearRangoEdad = async (req, res) => {
  try {
    const { etiqueta, edad_min, edad_max } = req.body;

    if (!etiqueta || etiqueta.trim() === '') {
      return res.status(400).json({ message: 'La etiqueta es obligatoria' });
    }

    if (edad_min == null || edad_max == null) {
      return res.status(400).json({ message: 'Edad mínima y máxima son obligatorias' });
    }

    if (edad_min < 0 || edad_max < 0) {
      return res.status(400).json({ message: 'Las edades no pueden ser negativas' });
    }

    if (edad_min >= edad_max) {
      return res.status(400).json({ message: 'La edad mínima debe ser menor a la máxima' });
    }

    const rango = await RangoEdad.create({ etiqueta, edad_min, edad_max });
    return res.status(201).json(rango);
  } catch (error) {
    console.error('Error creando rango de edad:', error.message);
    return res.status(500).json({ message: 'Error creando rango de edad' });
  }
};
const actualizarRangoEdad = async (req, res) => {
  try {
    const { id } = req.params;
    const { etiqueta, edad_min, edad_max } = req.body;

    if (!etiqueta || etiqueta.trim() === '') {
      return res.status(400).json({ message: 'La etiqueta es obligatoria' });
    }

    const rango = await RangoEdad.findByIdAndUpdate(
      id,
      { etiqueta, edad_min, edad_max },
      { new: true }
    );

    if (!rango) {
      return res.status(404).json({ message: 'Rango de edad no encontrado' });
    }

    return res.json(rango);
  } catch (error) {
    console.error('Error actualizando rango de edad:', error.message);
    return res.status(500).json({ message: 'Error actualizando rango de edad' });
  }
};
const eliminarRangoEdad = async (req, res) => {
  try {
    const { id } = req.params;
    const rango = await RangoEdad.findByIdAndDelete(id);

    if (!rango) {
      return res.status(404).json({ message: 'Rango de edad no encontrado' });
    }

    return res.json({ message: 'Rango de edad eliminado correctamente' });
  } catch (error) {
    console.error('Error eliminando rango de edad:', error.message);
    return res.status(500).json({ message: 'Error eliminando rango de edad' });
  }
};

module.exports = {
  obtenerRangosEdad,
  obtenerRangoEdadPorId,
  crearRangoEdad,
  actualizarRangoEdad,
  eliminarRangoEdad,
};