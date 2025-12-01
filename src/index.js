<<<<<<< HEAD
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');

console.log('>>> index.js se está ejecutando');
=======
// src/index.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
>>>>>>> Eduardo

// 👉 Importa cada archivo de rutas directamente
const dificultadesRoutes = require('./routes/dificultades.routes');
const rangosEdadRoutes = require('./routes/rangosEdad.routes');
const categoriasRoutes = require('./routes/categorias.routes');
const subcategoriasRoutes = require('./routes/subcategorias.routes');
const preguntasRoutes = require('./routes/preguntas.routes');

const seedDatabase = require('./seed/seed');

const app = express();
const PORT = Number(process.env.PORT) || 3000;

const seedDatabase = require('./seed/seed');

// Middlewares
app.use(cors());
app.use(express.json());

<<<<<<< HEAD

=======
// Ruta de prueba
>>>>>>> Eduardo
app.get('/', (req, res) => {
  res.send('API de Encuestas con MongoDB - Funcionando');
});

<<<<<<< HEAD
async function connectAndSeed() {
  try {
    console.log(" Conectando a MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Conectado a MongoDB");

    console.log(" Ejecutando seed...");
    await seedDatabase();
    console.log("Seed completado");
  } catch (error) {
    console.error("Error conectando o ejecutando seed:", error.message);
  }
}

connectAndSeed();

// Rutas
app.use('/api/dificultades', dificultadesRoutes);
app.use('/api/rangos-edad', rangosEdadRoutes);
app.use('/api/categorias', categoriasRoutes);
app.use('/api/subcategorias', subcategoriasRoutes);
app.use('/api/preguntas', preguntasRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
=======
async function startServer() {
  try {
    const mongoURI = process.env.MONGO_URI;

    if (!mongoURI) {
      console.error('❌ MONGO_URI no está definido en el archivo .env');
      process.exit(1);
    }

    console.log('Conectando a MongoDB...');
    await mongoose.connect(mongoURI);
    console.log('✅ Conectado a MongoDB');

    console.log('⚙️ Ejecutando seed...');
    await seedDatabase();
    console.log('✅ Seed completado');

    // 👉 Montar las rutas UNA POR UNA bajo /api
    app.use('/api/dificultades', dificultadesRoutes);
    app.use('/api/rangos-edad', rangosEdadRoutes);
    app.use('/api/categorias', categoriasRoutes);
    app.use('/api/subcategorias', subcategoriasRoutes);
    app.use('/api/preguntas', preguntasRoutes);

    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
      console.log(`📡 Ejemplo: http://localhost:${PORT}/api/categorias`);
    });
  } catch (error) {
    console.error('❌ Error conectando o ejecutando seed:', error.message);
    process.exit(1);
  }
}

startServer();
>>>>>>> Eduardo
