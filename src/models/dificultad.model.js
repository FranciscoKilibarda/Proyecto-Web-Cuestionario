// src/models/dificultad.model.js
const mongoose = require('mongoose');

const DificultadSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      unique: true,
      trim: true
    }
  },
  {
    collection: 'dificultades' 
  }
);

module.exports = mongoose.model('Dificultad', DificultadSchema);
