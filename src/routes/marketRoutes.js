const express = require('express');
const router = express.Router();
const marketController = require('../controllers/marketController');
const verifyToken = require('../middleware/auth');

router.post('/seed', marketController.seedMarket); // Para inicializar DB
router.get('/', verifyToken, marketController.getStocks);
router.post('/buy', verifyToken, marketController.buyStock);

module.exports = router;