const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.middleware');
const controller = require('../controllers/customer.controller');

// GET all customers
router.get('/', auth, controller.getAllCustomers);

// GET single customer by ID
router.get('/:id', auth, controller.getCustomerById);

// CREATE a new customer
router.post('/', auth, controller.createCustomer);

// UPDATE a customer
router.put('/:id', auth, controller.updateCustomer);

// DELETE a customer
router.delete('/:id', auth, controller.deleteCustomer);

module.exports = router;
