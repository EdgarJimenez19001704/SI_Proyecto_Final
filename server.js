const app = require('./src/app');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mememarket';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ Conectado a MongoDB (MemeMarket DB)');
    app.listen(PORT, () => {
      console.log(`🚀 API corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Error conectando a la base de datos:', err);
  });