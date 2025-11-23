const mysql = require('mysql2');
require('dotenv').config(); // Importante para leer el .env

// Creamos la conexión usando los datos seguros del .env
// NO escribimos contraseñas aquí directamente
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306, // Por si el puerto no está en el env
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Mensaje en consola para confirmar que cargó la configuración
console.log(`Intentando conectar a la BD: ${process.env.DB_NAME}`);

// Exportamos la "promesa" del pool para usar async/await
module.exports = pool.promise();