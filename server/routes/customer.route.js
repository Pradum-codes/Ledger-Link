const express = require('express');
const router = express.Router();

// GET /api/customers
router.get('/', (req, res) => {
  // controller.getAllCustomers
});

// GET /api/customers/:id
router.get('/:id', (req, res) => {
  // controller.getCustomerById
});

// POST /api/customers
router.post('/', (req, res) => {
  // controller.createCustomer
});

// PUT /api/customers/:id
router.put('/:id', (req, res) => {
  // controller.updateCustomer
});

// DELETE /api/customers/:id
router.delete('/:id', (req, res) => {
  // controller.deleteCustomer
});

module.exports = router;
