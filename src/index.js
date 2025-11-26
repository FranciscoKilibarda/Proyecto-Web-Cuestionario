
const express = require('express');
const cors = require('cors');
const Dificultad = require('./models/dificultad.model');

require('dotenv').config();
console.log('DEBUG desde index.js, MONGO_URI =', process.env.MONGO_URI);

const dificultadesRoutes = require('./routes/dificultades.routes');
const rangosEdadRoutes = require('./routes/rangosEdad.routes');
const categoriasRoutes = require('./routes/categorias.routes');
const subcategoriasRoutes = require('./routes/subcategorias.routes');
const preguntasRoutes = require('./routes/preguntas.routes');
const connectMongo = require('./config/mongo'); 


console.log('>>> index.js se está ejecutando');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());

// Ruta raíz de prueba
app.get('/', (req, res) => {
  res.send('API de Encuestas con MongoDB - Funcionando ');
});

// Ruta para crear dificultades de prueba (solo para desarrollo)
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

// Routers de la API
app.use('/api/dificultades', dificultadesRoutes);
app.use('/api/rangos-edad', rangosEdadRoutes);
app.use('/api/categorias', categoriasRoutes);
app.use('/api/subcategorias', subcategoriasRoutes);
app.use('/api/preguntas', preguntasRoutes);

// Inicio del servidor
const startServer = async () => {
  try {
    console.log('>>> llamando a connectMongo');
    await connectMongo(); // conecta a MongoDB
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error(' Error al iniciar el servidor:', err.message);
  }
};

startServer();
