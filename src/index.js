const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// Importación de rutas
const dificultadesRoutes = require('./routes/dificultades.routes');
const rangosEdadRoutes = require('./routes/rangosEdad.routes');
const categoriasRoutes = require('./routes/categorias.routes');
const subcategoriasRoutes = require('./routes/subcategorias.routes');
const preguntasRoutes = require('./routes/preguntas.routes');
const authRoutes = require('./routes/auth.routes'); // Agregado explícitamente

const seedDatabase = require('./seed/seed');

const app = express();

// CONFIGURACIÓN DEL PUERTO PARA RENDER
// Render nos asigna un puerto en process.env.PORT. Si no existe, usa el 3000.
const PORT = process.env.PORT || 3000;

console.log('>>> index.js comenzando secuencia de inicio...');

// Middlewares
app.use(cors()); // Permite conexiones desde cualquier lugar (vital para el frontend)
app.use(express.json());

// Ruta base para verificar que el servidor vive
app.get('/', (req, res) => {
  res.send(`API de Encuestas Funcionando - Entorno: ${process.env.NODE_ENV || 'Desarrollo'}`);
});

async function startServer() {
  try {
    const mongoURI = process.env.MONGO_URI;

    if (!mongoURI) {
      console.error('ERROR FATAL: MONGO_URI no está definido en el archivo .env o en las variables de Render.');
      process.exit(1);
    }

    // 1. Conectar a Base de Datos
    console.log('Conectando a MongoDB...');
    await mongoose.connect(mongoURI);
    console.log('Conectado a MongoDB Exitosamente');

    // 2. Ejecutar Seed (Con protección anti-caídas)
    // Envolvemos esto para que si el seed falla, el servidor NO se caiga.
    try {
        console.log('Ejecutando seed (llenado de datos)...');
        await seedDatabase();
        console.log('SEED COMPLETO');
    } catch (seedError) {
        console.error('El Seed falló, pero el servidor continuará iniciando.');
        console.error('Razón del fallo del seed:', seedError.message);
    }

    // 3. Definir Rutas
    app.use('/api/dificultades', dificultadesRoutes);
    app.use('/api/rangos-edad', rangosEdadRoutes);
    app.use('/api/categorias', categoriasRoutes);
    app.use('/api/subcategorias', subcategoriasRoutes);
    app.use('/api/preguntas', preguntasRoutes);
    app.use('/api/auth', authRoutes);

    // 4. Levantar el Servidor
    app.listen(PORT, () => {
      console.log(`Servidor corriendo y escuchando en el puerto ${PORT}`);
      console.log(`URL Local: http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error('Error fatal al iniciar el servidor:', error.message);
    process.exit(1); // Aquí sí cerramos si no hay conexión a BD
  }
}

startServer();
