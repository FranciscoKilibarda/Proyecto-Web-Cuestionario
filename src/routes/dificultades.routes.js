const express = require('express');
const router = express.Router();
const { check } = require('express-validator'); 
const { crearDificultad } = require('../controllers/dificultad.controller'); 
const { validateResult } = require('../utils/validateHelper'); 

router.post(
  '/',
  [
    check('nombre')
      .exists().withMessage('El campo nombre es obligatorio')
      .notEmpty().withMessage('El nombre no puede estar vacío')
      .isString().withMessage('El nombre debe ser texto')
      .isLength({ min: 3, max: 50 }).withMessage('El nombre debe tener entre 3 y 50 caracteres'),

    (req, res, next) => {
      validateResult(req, res, next); 
    }
  ],
  crearDificultad 
);

module.exports = router;
