const { validationResult } = require('express-validator');

const validateResult = (req, res, next) => {
    try {
        validationResult(req).throw(); // Busca errores en la petición
        return next(); // Si no hay errores, ¡pasa al siguiente paso (el controlador)!
    } catch (err) {
        res.status(403);
        res.send({ errors: err.array() }); // Devuelve la lista de errores al usuario
    }
};

module.exports = { validateResult };