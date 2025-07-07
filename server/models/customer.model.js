const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
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

customerSchema.index({ userId: 1 });
customerSchema.index({ userId: 1, phoneNumber: 1 }, { unique: true, sparse: true });

module.exports = mongoose.model("Customer", customerSchema);
