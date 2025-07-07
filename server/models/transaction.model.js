const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    customerId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Customer', 
        required: true 
    },
    amount: { 
        type: Number, 
        required: true, 
        min: 0 
    },
    type: { 
        type: String, 
        enum: ['CREDIT', 'DEBIT'], 
        required: true 
    },
    description: { 
        type: String, 
        default: '' 
    },
    transactionDate: { 
        type: Date, 
        required: true 
    },
    status: { 
        type: String, 
        enum: ['pending', 'completed', 'void'], 
        default: 'completed' 
    },
    referenceId: {
        type: String,
        unique: true,
        sparse: true,
        default: null
    }
}, { timestamps: true });

transactionSchema.index({ userId: 1 });
transactionSchema.index({ customerId: 1 });
transactionSchema.index({ transactionDate: 1 });

transactionSchema.pre('save', function(next) {
  if (!this.transactionDate) {
    this.transactionDate = new Date();
  }
  next();
});

module.exports = mongoose.model("Transaction", transactionSchema);
