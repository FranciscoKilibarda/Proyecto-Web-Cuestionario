const mongoose = require('mongoose');

const CategoriaSchema = new mongoose.Schema({
    nombre : {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    descripcion: {
        type: String,
        default: ''
    }
},
{
 collection: 'categorias'
});
module.exports = mongoose.model('Categoria', CategoriaSchema);