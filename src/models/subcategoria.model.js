const mongoose = require('mongoose');

const SubcategoriaSchema = new mongoose.Schema(
{
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  categoria: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Categoria',
    required: true
  },
  categoria:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Categoria',
    required: true
  }
},
{
    collection: 'subcategorias'
}
);

module.exports = mongoose.model('Subcategoria', SubcategoriaSchema);