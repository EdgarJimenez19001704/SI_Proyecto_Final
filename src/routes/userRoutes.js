const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verifyToken = require('../middleware/auth');

router.get('/profile', verifyToken, userController.getProfile);

// Aquí pasamos un ID como parámetro
router.get('/:userId/transactions', verifyToken, userController.getUserTransactions);

module.exports = router;