const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator'); 

const UsuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true, 
    validate: {
      validator: (email) => validator.isEmail(email),
      message: 'El correo debe ser válido'
    }
  },
  password: {
    type: String,
    required: true,
    minlength: [6, 'La contraseña debe tener al menos 6 caracteres']
  },
  rol: {
    type: String,
    default: 'usuario', 
    enum: ['usuario', 'admin']
  }
}, {
  timestamps: true
});

UsuarioSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UsuarioSchema.methods.matchPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('Usuario', UsuarioSchema);
