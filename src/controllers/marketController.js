const MemeStock = require('../models/MemeStock');
const User = require('../models/User');
const Transaction = require('../models/Transaction');

exports.seedMarket = async (req, res) => {
    const stocks = [
        { symbol: 'DOGE', name: 'DogeCoin', price: 150 },
        { symbol: 'PEPE', name: 'Pepe The Frog', price: 50 },
        { symbol: 'STONKS', name: 'Stonks Guy', price: 500 },
        { symbol: 'CAT', name: 'Crying Cat', price: 20 }
    ];
    await MemeStock.deleteMany({});
    await MemeStock.insertMany(stocks);
    res.json({ message: 'Mercado inicializado con memes frescos.' });
};

exports.getStocks = async (req, res) => {
    const stocks = await MemeStock.find();
    res.json(stocks);
};

exports.buyStock = async (req, res) => {
    try {
        const { symbol, quantity } = req.body;
        const userId = req.user.id;


        if (!quantity || quantity <= 0) {
            return res.status(400).json({ error: 'La cantidad debe ser un número mayor a 0.' });
        }
        
        // Adicional
        if (!Number.isInteger(quantity)) {
            return res.status(400).json({ error: 'Solo se permiten cantidades enteras.' });
        }

        const stock = await MemeStock.findOne({ symbol });
        const user = await User.findById(userId);

        if (!stock) return res.status(404).json({ error: 'Meme no encontrado' });
        if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

        // Inicialización defensiva del portafolio (corrección previa del bug de crash)
        if (!user.portfolio) user.portfolio = [];

        const totalCost = stock.price * quantity;

        if (user.walletBalance < totalCost) {
            return res.status(400).json({ error: 'No tienes suficientes MemeCoins' });
        }

        // Actualizar balance
        user.walletBalance -= totalCost;
        
        // Actualizar portafolio
        const existingStockIndex = user.portfolio.findIndex(p => p.symbol === symbol);
        if (existingStockIndex >= 0) {
            user.portfolio[existingStockIndex].quantity += quantity;
        } else {
            user.portfolio.push({ symbol, quantity });
        }

        await user.save();

        // Registrar transacción
        await Transaction.create({
            userId,
            symbol,
            type: 'BUY',
            quantity,
            priceAtTransaction: stock.price
        });

        res.json({ message: `Compra exitosa! Ahora tienes más ${symbol}`, newBalance: user.walletBalance });

    } catch (error) {
        console.error("ERROR EN COMPRA:", error);
        res.status(500).json({ error: 'Error en la transacción', details: error.message });
    }
};