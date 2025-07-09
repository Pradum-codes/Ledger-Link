const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.middleware');
const controller = require('../controllers/transaction.controller');

// GET /api/transactions
router.get('/', auth, controller.getAllTransactions);

// GET /api/transactions/:id
router.get('/:id', auth, controller.getTransactionById);

// POST /api/transactions
router.post('/', auth, controller.createTransaction);

// PUT /api/transactions/:id
router.put('/:id', auth, controller.updateTransaction);


// DELETE /api/transactions/:id
router.delete('/:id', auth, controller.deleteTransaction);

// GET /api/transactions/customer/:id
router.get('/customer/:id', auth, controller.getCustomerTransactions);

module.exports = router;
