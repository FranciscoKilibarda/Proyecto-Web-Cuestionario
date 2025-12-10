const express = require('express');
const router = express.Router();
const { check } = require('express-validator'); 
const { crearSubcategoria } = require('../controllers/subcategoria.controller'); 
const { validateResult } = require('../utils/validateHelper'); 


router.post(
  '/',
  [
    check('nombre')
      .exists().withMessage('El campo nombre es obligatorio')
      .notEmpty().withMessage('El nombre no puede estar vacío')
      .isString().withMessage('El nombre debe ser texto')
      .isLength({ min: 3, max: 50 }).withMessage('El nombre debe tener entre 3 y 50 caracteres'),


    check('categoria')
      .exists().withMessage('La categoría es obligatoria')
      .notEmpty().withMessage('La categoría no puede estar vacía'),

    (req, res, next) => {
      validateResult(req, res, next); 
    }
  ],
  crearSubcategoria 
);

module.exports = router;
