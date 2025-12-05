const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const marketRoutes = require('./routes/marketRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Importante para leer JSON bodies

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/market', marketRoutes);
app.use('/api/users', userRoutes);

// Ruta base para verificar estado
app.get('/', (req, res) => {
  res.json({ message: 'Bienvenido a MemeMarket API v1.0. ¡A invertir!' });
});

module.exports = app;