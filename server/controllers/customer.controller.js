const Customer = require('../models/customer.model');

const createCustomer = async (req, res) => {
    try {
        const { name, phoneNumber, email, address } = req.body;
        const userId = req.user.id;

        const customer = new Customer({
        userId,
        name,
        phoneNumber,
        email,
        address
        });

        await customer.save();

        res.status(201).json({
        message: 'Customer created successfully',
        customer: {
            customerId: customer.customerId,
            name: customer.name,
            phoneNumber: customer.phoneNumber,
            email: customer.email,
            address: customer.address,
            totalBalance: customer.totalBalance
        }
        });
    } catch (err) {
        res.status(500).json({ error: 'Failed to create customer', details: err.message });
    }
};

const getAllCustomers = async (req, res) => {
    try {
        const userId = req.user.id;
        const customers = await Customer.find({ userId });

        res.status(200).json({ customers });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch customers', details: err.message });
    }
};

const getCustomerById = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;

        const customer = await Customer.findOne({ customerId: id, userId });
        if (!customer) return res.status(404).json({ message: 'Customer not found' });

        res.status(200).json({ customer });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch customer', details: err.message });
    }
};

const updateCustomer = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;

        const updated = await Customer.findOneAndUpdate(
        { customerId: id, userId },
        { $set: req.body },
        { new: true }
        );

        if (!updated) return res.status(404).json({ message: 'Customer not found' });

        res.status(200).json({ message: 'Customer updated', customer: updated });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update customer', details: err.message });
    }
};

const deleteCustomer = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;

        const deleted = await Customer.findOneAndDelete({ customerId: id, userId });

        if (!deleted) return res.status(404).json({ message: 'Customer not found' });

        res.status(200).json({ message: 'Customer deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete customer', details: err.message });
    }
};

module.exports = {
    createCustomer,
    getAllCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer
};
