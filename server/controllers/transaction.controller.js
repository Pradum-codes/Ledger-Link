const Transaction = require('../models/transaction.model');
const Customer = require('../models/customer.model');

// Create a transaction and update customer's balance
const createTransaction = async (req, res) => {
    try {
        const userId = req.user.id;
        const { customerId, amount, type, description, transactionDate, referenceId } = req.body;

        const customer = await Customer.findById(customerId);
        if (!customer || customer.userId.toString() !== userId) {
        return res.status(404).json({ message: 'Customer not found or unauthorized' });
        }

        const transaction = new Transaction({
            userId,
            customerId,
            amount,
            type,
            description,
            transactionDate,
            referenceId,
        });

        await transaction.save();

        // Update customer's balance
        if (type === 'CREDIT') {
        customer.totalBalance += amount;
        } else if (type === 'DEBIT') {
        customer.totalBalance -= amount;
        }
        customer.lastTransactionDate = transaction.transactionDate;
        await customer.save();

        res.status(201).json({ message: 'Transaction recorded', transaction });
    } catch (err) {
        res.status(500).json({ error: 'Failed to create transaction', details: err.message });
    }
};

const getAllTransactions = async (req, res) => {
    try {
        const userId = req.user.id;
        const transactions = await Transaction.find({ userId }).sort({ createdAt: -1 });

        res.status(200).json({ transactions });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch transactions', details: err.message });
    }
};

const getTransactionById = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;

        const transaction = await Transaction.findOne({ _id: id, userId });
        if (!transaction) return res.status(404).json({ message: 'Transaction not found' });

        res.status(200).json({ transaction });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch transaction', details: err.message });
    }
};

const getCustomerTransactions = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params; // customerId

        const transactions = await Transaction.find({ customerId: id, userId }).sort({ createdAt: -1 });
        res.status(200).json({ transactions });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch customer transactions', details: err.message });
    }
};

const updateTransaction = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;

        const existing = await Transaction.findOne({ _id: id, userId });
        if (!existing) return res.status(404).json({ message: 'Transaction not found' });

        // Optional: Recalculate balance if amount/type changed (more complex, can skip for now)

        const updated = await Transaction.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({ message: 'Transaction updated', transaction: updated });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update transaction', details: err.message });
    }
};

const deleteTransaction = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;

        const transaction = await Transaction.findOne({ _id: id, userId });
        if (!transaction) return res.status(404).json({ message: 'Transaction not found' });

        // Optional: Adjust customer balance again (reverse logic)

        await Transaction.deleteOne({ _id: id });
        res.status(200).json({ message: 'Transaction deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete transaction', details: err.message });
    }
};

module.exports = {
    createTransaction,
    getAllTransactions,
    getTransactionById,
    getCustomerTransactions,
    updateTransaction,
    deleteTransaction,
};
