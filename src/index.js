const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');

console.log('>>> index.js se está ejecutando');

const dificultadesRoutes = require('./routes/dificultades.routes');
const rangosEdadRoutes = require('./routes/rangosEdad.routes');
const categoriasRoutes = require('./routes/categorias.routes');
const subcategoriasRoutes = require('./routes/subcategorias.routes');
const preguntasRoutes = require('./routes/preguntas.routes');


const seedDatabase = require('./seed/seed');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
  res.send('API de Encuestas con MongoDB - Funcionando ');
});

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
