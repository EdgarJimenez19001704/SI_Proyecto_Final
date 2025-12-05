const mongoose = require('mongoose');

// Este modelo representa la "acción" del meme disponible en el mercado
const memeStockSchema = new mongoose.Schema({
  symbol: { type: String, required: true, unique: true }, // Ej: DOGE
  name: { type: String, required: true }, // Ej: DogeCoin
  price: { type: Number, required: true }, // Precio actual
  availableQuantity: { type: Number, default: 1000000 } // Liquidez del mercado
});

module.exports = mongoose.model('MemeStock', memeStockSchema);