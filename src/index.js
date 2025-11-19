const express = require('express');
const cors = require('cors');
require('dotenv').config();

const questionsRoutes = require('./routes/questions.routes');
const examsRoutes = require('./routes/exams.routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('API de Encuestas - Funcionando 🚀');
});

// Rutas del API
app.use('/api/questions', questionsRoutes);
app.use('/api/exams', examsRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
