const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario.model');

// Registrar un nuevo usuario
router.post('/register', async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const userExists = await Usuario.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    const usuario = await Usuario.create({ email, password, role });
    return res.status(201).json({ message: 'Usuario creado correctamente' });
  } catch (error) {
    console.error('Error registrando usuario:', error.message);
    return res.status(500).json({ message: 'Error creando usuario' });
  }
});

// Iniciar sesión y generar token JWT
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const isMatch = await usuario.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(
      { id: usuario._id, email: usuario.email, role: usuario.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (error) {
    console.error('Error iniciando sesión:', error.message);
    return res.status(500).json({ message: 'Error en el login' });
  }
});

module.exports = router;
