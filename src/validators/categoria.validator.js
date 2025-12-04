const { check } = require('express-validator');
const { validateResult } = require('../utils/validateHelper');

const validateCreateCategoria = [
    // 1. Validar el nombre
    check('nombre')
        .exists().withMessage('El campo nombre es obligatorio')
        .notEmpty().withMessage('El nombre no puede estar vacío')
        .isString().withMessage('El nombre debe ser texto')
        .isLength({ min: 3, max: 50 }).withMessage('El nombre debe tener entre 3 y 50 caracteres'),

    // 2. Validar la descripción (opcional pero si viene, que sea texto)
    check('descripcion')
        .optional()
        .isString()
        .isLength({ max: 200 }),

    // 3. Llamar al helper que revisa los resultados (el que creamos en el paso 2)
    (req, res, next) => {
        validateResult(req, res, next);
    }
];

module.exports = { validateCreateCategoria };