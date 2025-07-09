const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    customerId: {
        type: String,
        required: true,
        unique: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    totalBalance: {
        type: Number,
        default: 0
    },
    name: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        match: /^\+?[1-9]\d{1,14}$/
    },
    email: {
        type: String,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    address: String,
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    lastTransactionDate: Date
}, { timestamps: true });

// Custom UID generation
customerSchema.pre('save', async function (next) {
    if (this.customerId) return next(); // avoid regenerating

    try {
        const lastCustomer = await mongoose.model('Customer').findOne(
        { userId: this.userId },
        {},
        { sort: { createdAt: -1 } }
        );

        const lastId = lastCustomer?.customerId?.replace(/[^\d]/g, '') || '10000';
        this.customerId = `CUST${parseInt(lastId) + 1}`;
        next();
    } catch (error) {
        next(error);
  }
});

module.exports = mongoose.model('Customer', customerSchema);
