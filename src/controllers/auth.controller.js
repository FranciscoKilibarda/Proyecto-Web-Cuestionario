const { validationResult } = require('express-validator'); // Para manejar validaciones de rutas
const Usuario = require('../models/usuario.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 1. REGISTRO DE USUARIO
const register = async (req, res) => {
  try {
    // Verificar si los datos son válidos
    const errors = validationResult(req); // Comprueba errores de validación
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { nombre, email, password } = req.body;

    // Verificar si el email ya está registrado
    const usuarioExiste = await Usuario.findOne({ email });
    if (usuarioExiste) {
      return res.status(400).json({ msg: 'El correo ya está registrado' });
    }

    // Encriptar la contraseña
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Crear el nuevo usuario
    const nuevoUsuario = new Usuario({
      nombre,
      email,
      password: passwordHash,
    });

    await nuevoUsuario.save(); // Guardar el usuario en la base de datos

    res.status(201).json({ msg: 'Usuario registrado exitosamente' }); // Respuesta exitosa

  } catch (error) {
    console.error('Error al registrar usuario:', error.message);
    res.status(500).json({ msg: 'Error en el servidor', error });
  }
};

// 2. LOGIN (INICIO DE SESIÓN)
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verificar si el usuario existe
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({ msg: 'Credenciales inválidas (Email)' });
    }

    // Verificar la contraseña
    const validPassword = await bcrypt.compare(password, usuario.password);
    if (!validPassword) {
      return res.status(400).json({ msg: 'Credenciales inválidas (Password)' });
    }

    // Generar el token JWT
    const payload = { usuarioId: usuario._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({
      msg: 'Login exitoso',
      token,
      usuario: { id: usuario._id, nombre: usuario.nombre },
    });

  } catch (error) {
    console.error('Error en el login:', error.message);
    res.status(500).json({ msg: 'Error en el login', error });
  }
};

module.exports = { register, login };
