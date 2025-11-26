// src/index.js
const express = require('express');
const cors = require('cors');
const Dificultad = require('./models/dificultad.model'); 

require('dotenv').config();
console.log('DEBUG desde index.js, MONGO_URI =', process.env.MONGO_URI);

const connectMongo = require('./config/mongo'); //  SOLO UNA VEZ

console.log('>>> index.js se está ejecutando');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API de Encuestas con MongoDB - Funcionando ');
});

// Ruta para crear dificultades de prueba
app.get('/seed-dificultades', async (req, res) => {
  try {
    const docs = await Dificultad.insertMany([
      { nombre: 'Fácil' },
      { nombre: 'Medio' },
      { nombre: 'Difícil' }
    ]);

    res.json({
      message: 'Dificultades creadas',
      data: docs
    });
  } catch (error) {
    console.error('Error insertando dificultades:', error.message);
    res.status(500).json({ message: 'Error insertando dificultades' });
  }
});

const startServer = async () => {
  try {
    console.log('>>> llamando a connectMongo');
    await connectMongo();
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Error al iniciar el servidor:', err.message);
  }
};

startServer();
