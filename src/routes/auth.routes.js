const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/auth.controller');

// Aquí podrías agregar validaciones con express-validator si quieres (ej: validar que el email sea email)
router.post('/register', register);
router.post('/login', login);

module.exports = router;