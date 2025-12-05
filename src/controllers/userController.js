const User = require('../models/User');
const Transaction = require('../models/Transaction');

exports.getProfile = async (req, res) => {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
};

exports.getUserTransactions = async (req, res) => {
    try {
        const { userId } = req.params;
        

        if (req.user.id !== userId && req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Acceso denegado: No puedes ver transacciones de otros usuarios.' });
        }

        const transactions = await Transaction.find({ userId: userId });
        
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener transacciones' });
    }
};