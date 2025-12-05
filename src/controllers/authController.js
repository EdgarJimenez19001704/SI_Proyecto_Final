const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Usuario y contraseña requeridos' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    
    const newUser = await User.create({
      username,
      password: hashedPassword
      
    });
    
    res.status(201).json({ 
      message: 'Usuario registrado exitosamente', 
      user: { id: newUser._id, username: newUser.username } 
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar usuario', details: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({ error: 'Contraseña incorrecta' });

    // Crear Token
    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      process.env.JWT_SECRET || 'secretoseguro123',
      { expiresIn: '2h' }
    );

    res.json({ token, message: 'Login exitoso' });
  } catch (error) {
    res.status(500).json({ error: 'Error en el servidor' });
  }
};