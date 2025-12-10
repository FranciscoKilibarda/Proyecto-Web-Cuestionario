const express = require('express');
const router = express.Router();
const { check } = require('express-validator'); 
const { crearRangoEdad } = require('../controllers/rangoEdad.controller'); 
const { validateResult } = require('../utils/validateHelper'); 

router.post(
  '/',
  [
    check('etiqueta')
      .exists().withMessage('La etiqueta es obligatoria')
      .notEmpty().withMessage('La etiqueta no puede estar vacía')
      .isString().withMessage('La etiqueta debe ser texto'),

    check('edad_min')
      .exists().withMessage('La edad mínima es obligatoria')
      .isInt({ min: 0 }).withMessage('La edad mínima debe ser un número positivo'),

    check('edad_max')
      .exists().withMessage('La edad máxima es obligatoria')
      .isInt({ min: 0 }).withMessage('La edad máxima debe ser un número positivo'),

    (req, res, next) => {
      validateResult(req, res, next); 
    }
  ],
  crearRangoEdad 
);

module.exports = router;
