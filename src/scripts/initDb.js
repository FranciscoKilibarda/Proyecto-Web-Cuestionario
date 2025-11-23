// src/scripts/initDb.js
const db = require('../config/db.config'); // Importamos tu conexión

const createTables = async () => {
  try {
    // 1. Tabla de Categorías (Ej: Matemáticas, Historia, Anime)
    await db.query(`
      CREATE TABLE IF NOT EXISTS categorias (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL UNIQUE,
        descripcion TEXT
      )
    `);
    console.log('✅ Tabla Categorías creada');

    // 2. Tabla de Preguntas
    // Incluye: Texto, Nivel de Dificultad, Rango de Edad mín/máx
    await db.query(`
      CREATE TABLE IF NOT EXISTS preguntas (
        id INT AUTO_INCREMENT PRIMARY KEY,
        categoria_id INT,
        texto_pregunta TEXT NOT NULL,
        dificultad ENUM('facil', 'medio', 'dificil') DEFAULT 'medio',
        edad_min INT DEFAULT 0,
        edad_max INT DEFAULT 99,
        fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (categoria_id) REFERENCES categorias(id) ON DELETE SET NULL
      )
    `);
    console.log('✅ Tabla Preguntas creada');

    // 3. Tabla de Opciones (Las respuestas posibles para cada pregunta)
    await db.query(`
      CREATE TABLE IF NOT EXISTS opciones (
        id INT AUTO_INCREMENT PRIMARY KEY,
        pregunta_id INT,
        texto_opcion VARCHAR(255) NOT NULL,
        es_correcta BOOLEAN DEFAULT FALSE,
        FOREIGN KEY (pregunta_id) REFERENCES preguntas(id) ON DELETE CASCADE
      )
    `);
    console.log('✅ Tabla Opciones creada');

    console.log('🚀 ¡Base de datos inicializada correctamente!');
    process.exit(0); // Cierra el proceso al terminar

  } catch (error) {
    console.error('❌ Error creando tablas:', error);
    process.exit(1);
  }
};

createTables();