const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/auth.controller');

const { check } = require('express-validator');
const { validateResult } = require('../utils/validateHelper');


router.post(
  '/register',
  [
    check('nombre')
      .exists().withMessage('El campo nombre es obligatorio')
      .notEmpty().withMessage('El nombre no puede estar vacío')
      .isString().withMessage('El nombre debe ser texto')
      .isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres'),

    check('email')
      .exists().withMessage('El campo email es obligatorio')
      .isEmail().withMessage('Debe ser un correo válido'),
    check('password')
      .exists().withMessage('La contraseña es obligatoria')
      .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),

    (req, res, next) => {
      validateResult(req, res, next);
    },
  ],
  register
);

router.post('/login', login);

module.exports = router;
