
function errorHandler(err, req, res, next) {
  console.error('[ERROR]', err.message);
  res.status(500).json({ message: 'Error interno del servidor (placeholder)' });
}

module.exports = errorHandler;
