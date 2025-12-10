const Usuario = require('../models/usuario.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 1. REGISTRO DE USUARIO
const register = async (req, res) => {
    try {
        const { nombre, email, password } = req.body;

        // Verificar si ya existe el email
        const usuarioExiste = await Usuario.findOne({ email });
        if (usuarioExiste) {
            return res.status(400).json({ msg: 'El correo ya está registrado' });
        }

        // Encriptar contraseña
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        // Crear usuario
        const nuevoUsuario = new Usuario({
            nombre,
            email,
            password: passwordHash 
        });

        await nuevoUsuario.save();

        res.status(201).json({ msg: 'Usuario registrado exitosamente' });

    } catch (error) {
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

        // Verificar contraseña (comparar texto plano con el hash de la BD)
        const validPassword = await bcrypt.compare(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({ msg: 'Credenciales inválidas (Password)' });
        }

        // Generar Token JWT
        const payload = { usuarioId: usuario._id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ 
            msg: 'Login exitoso', 
            token, 
            usuario: { id: usuario._id, nombre: usuario.nombre } 
        });

    } catch (error) {
        res.status(500).json({ msg: 'Error en el login', error });
    }
};

module.exports = { register, login };