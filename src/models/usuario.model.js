const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true // No puede haber dos usuarios con el mismo correo
    },
    password: {
        type: String,
        required: true
    },
    rol: {
        type: String,
        default: 'usuario', // o 'admin'
        enum: ['usuario', 'admin']
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Usuario', UsuarioSchema);