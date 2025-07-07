const express = require('express');
const router = express.Router();

// GET /api/transactions
router.get('/', (req, res) => {
  // controller.getAllTransactions
});

// GET /api/transactions/:id
router.get('/:id', (req, res) => {
  // controller.getTransactionById
});

// POST /api/transactions
router.post('/', (req, res) => {
  // controller.createTransaction
});

// PUT /api/transactions/:id
router.put('/:id', (req, res) => {
  // controller.updateTransaction
});

// DELETE /api/transactions/:id
router.delete('/:id', (req, res) => {
  // controller.deleteTransaction
});

// GET /api/transactions/customer/:id
router.get('/customer/:id', (req, res) => {
  // controller.getCustomerTransactions
});

module.exports = router;
