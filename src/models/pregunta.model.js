const mongoose = require('mongoose');

const PreguntaSchema = new mongoose.Schema(
  {
    texto: {
      type: String,
      required: true
    },
    dificultad: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Dificultad'
    },
    rangoEdad: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'RangoEdad'
    },
    categoria: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Categoria'
    },
    subcategoria: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subcategoria'
    },
    estado: {
      type: String,
      enum: ['borrador', 'publicada'],
      default: 'borrador'
    },
    fecha_creacion: {
      type: Date,
      default: Date.now
    }
  },
  {
    collection: 'preguntas'
  }
);

module.exports = mongoose.model('Pregunta', PreguntaSchema);