
const Pregunta = require('../models/pregunta.model');

const obtenerPreguntas = async (req, res) => {
  try {
    const preguntas = await Pregunta.find()
      .populate('categoria')
      .populate('subcategoria')
      .populate('dificultad')
      .populate('rango_edad');
    return res.json(preguntas);
  } catch (error) {
    console.error('Error obteniendo preguntas:', error.message);
    return res.status(500).json({ message: 'Error obteniendo preguntas' });
  }
};

const obtenerPreguntaPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const pregunta = await Pregunta.findById(id)
      .populate('categoria')
      .populate('subcategoria')
      .populate('dificultad')
      .populate('rango_edad');

    if (!pregunta) {
      return res.status(404).json({ message: 'Pregunta no encontrada' });
    }

    return res.json(pregunta);
  } catch (error) {
    console.error('Error obteniendo pregunta:', error.message);
    return res.status(500).json({ message: 'Error obteniendo pregunta' });
  }
};

const crearPregunta = async (req, res) => {
  try {
    const {
      enunciado,
      categoria,
      subcategoria,
      dificultad,
      rango_edad,
      opciones,
      respuesta_correcta,
    } = req.body;

    if (!enunciado || enunciado.trim() === '') {
      return res.status(400).json({ message: 'El enunciado es obligatorio' });
    }

    if (!categoria) {
      return res.status(400).json({ message: 'La categoría es obligatoria' });
    }

    if (!dificultad) {
      return res.status(400).json({ message: 'La dificultad es obligatoria' });
    }

    if (!opciones || !Array.isArray(opciones) || opciones.length < 2) {
      return res
        .status(400)
        .json({ message: 'Debe proporcionar al menos 2 opciones de respuesta' });
    }

    if (respuesta_correcta == null) {
      return res.status(400).json({ message: 'La respuesta correcta es obligatoria' });
    }

    const pregunta = await Pregunta.create({
      enunciado,
      categoria,
      subcategoria,
      dificultad,
      rango_edad,
      opciones,
      respuesta_correcta,
    });

    return res.status(201).json(pregunta);
  } catch (error) {
    console.error('Error creando pregunta:', error.message);
    return res.status(500).json({ message: 'Error creando pregunta' });
  }
};

const actualizarPregunta = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      enunciado,
      categoria,
      subcategoria,
      dificultad,
      rango_edad,
      opciones,
      respuesta_correcta,
    } = req.body;

    if (!enunciado || enunciado.trim() === '') {
      return res.status(400).json({ message: 'El enunciado es obligatorio' });
    }

    const pregunta = await Pregunta.findByIdAndUpdate(
      id,
      {
        enunciado,
        categoria,
        subcategoria,
        dificultad,
        rango_edad,
        opciones,
        respuesta_correcta,
      },
      { new: true }
    );

    if (!pregunta) {
      return res.status(404).json({ message: 'Pregunta no encontrada' });
    }

    return res.json(pregunta);
  } catch (error) {
    console.error('Error actualizando pregunta:', error.message);
    return res.status(500).json({ message: 'Error actualizando pregunta' });
  }
};

const eliminarPregunta = async (req, res) => {
  try {
    const { id } = req.params;
    const pregunta = await Pregunta.findByIdAndDelete(id);

    if (!pregunta) {
      return res.status(404).json({ message: 'Pregunta no encontrada' });
    }

    return res.json({ message: 'Pregunta eliminada correctamente' });
  } catch (error) {
    console.error('Error eliminando pregunta:', error.message);
    return res.status(500).json({ message: 'Error eliminando pregunta' });
  }
};

module.exports = {
  obtenerPreguntas,
  obtenerPreguntaPorId,
  crearPregunta,
  actualizarPregunta,
  eliminarPregunta,
};
