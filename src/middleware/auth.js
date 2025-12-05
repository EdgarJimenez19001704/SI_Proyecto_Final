const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ error: 'Se requiere un token para acceder' });
  }

  try {
    // Eliminamos "Bearer " si viene en el header
    const bearer = token.startsWith('Bearer ') ? token.slice(7, token.length) : token;
    const decoded = jwt.verify(bearer, process.env.JWT_SECRET || 'secretoseguro123');
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido' });
  }
};

module.exports = verifyToken;