const express = require('express');
const router = express.Router();
const { check } = require('express-validator'); 
const { crearPregunta } = require('../controllers/pregunta.controller'); 
const { validateResult } = require('../utils/validateHelper'); 

router.post(
  '/',
  [
    check('enunciado')
      .exists().withMessage('El enunciado es obligatorio')
      .notEmpty().withMessage('El enunciado no puede estar vacío')
      .isString().withMessage('El enunciado debe ser texto'),

    check('categoria')
      .exists().withMessage('La categoría es obligatoria')
      .notEmpty().withMessage('La categoría no puede estar vacía'),

    check('subcategoria')
      .exists().withMessage('La subcategoría es obligatoria')
      .notEmpty().withMessage('La subcategoría no puede estar vacía'),

    check('dificultad')
      .exists().withMessage('La dificultad es obligatoria')
      .notEmpty().withMessage('La dificultad no puede estar vacía'),

    check('rango_edad')
      .exists().withMessage('El rango de edad es obligatorio')
      .notEmpty().withMessage('El rango de edad no puede estar vacío'),

    check('opciones')
      .isArray().withMessage('Las opciones deben ser un array')
      .isLength({ min: 2 }).withMessage('Debe haber al menos 2 opciones'),

    check('respuesta_correcta')
      .exists().withMessage('La respuesta correcta es obligatoria')
      .isIn([]).withMessage('La respuesta correcta debe estar entre las opciones'),

    (req, res, next) => {
      validateResult(req, res, next); 
    }
  ],
  crearPregunta 
);

module.exports = router;
