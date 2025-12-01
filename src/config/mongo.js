// src/config/mongo.js
const mongoose = require('mongoose');
require('dotenv').config();

const connectMongo = async () => {
  try {
    const uri = process.env.MONGO_URI;
    console.log('>>> connectMongo llamado');                // DEBUG
    console.log('MONGO_URI que estoy usando:', uri);        // DEBUG

    console.log(' Conectando a MongoDB...');
    await mongoose.connect(uri);
    console.log(' MongoDB conectado correctamente ✅');
  } catch (error) {
    console.error(' Error conectando a MongoDB:', error.message);
    throw error; // dejamos que index.js lo capture
  }
};

module.exports = connectMongo;
