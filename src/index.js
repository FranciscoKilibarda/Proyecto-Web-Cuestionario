// src/index.js
const express = require('express');
const cors = require('cors');

require('dotenv').config();
console.log('DEBUG desde index.js, MONGO_URI =', process.env.MONGO_URI);

const connectMongo = require('./config/mongo'); // 👈 SOLO UNA VEZ

console.log('>>> index.js se está ejecutando');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('API de Encuestas con MongoDB - Funcionando 🚀');
});

const startServer = async () => {
  try {
    console.log('>>> llamando a connectMongo');
    await connectMongo(); // conecta a MongoDB
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Error al iniciar el servidor:', err.message);
  }
};

startServer();
