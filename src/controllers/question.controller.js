

const QuestionController = {
  getAll(req, res) {
    
    res.json({ message: 'Listado de preguntas (placeholder)' });
  },

  create(req, res) {
    res.status(201).json({ message: 'Pregunta creada (placeholder)' });
  },
};

module.exports = QuestionController;
