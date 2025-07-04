## 1. User Model

**Collection**: `users`

Represents a business owner using the application.

```js
const userSchema = new mongoose.Schema({
  businessName: { type: String, required: true },
  ownerName: { type: String, required: true },
  phoneNumber: { type: String, unique: true, required: true, match: /^\+?[1-9]\d{1,14}$/ },
  email: { type: String, unique: true, required: true, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
  passwordHash: { type: String, required: true },
  status: { type: String, enum: ['active', 'inactive', 'suspended'], default: 'active' }
}, { timestamps: true });
userSchema.index({ phoneNumber: 1 }, { unique: true });
userSchema.index({ email: 1 }, { unique: true });
```

## 2. Customer Model
**Collection**: `customers`

Represents a customer associated with a particular user.
```js
const customerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  totalBalance: { type: Number, default: 0, required: true },
  name: { type: String, required: true },
  phoneNumber: { type: String, match: /^\+?[1-9]\d{1,14}$/ },
  email: { type: String, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
  address: String,
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  lastTransactionDate: Date
}, { timestamps: true });
customerSchema.index({ userId: 1 });
customerSchema.index({ userId: 1, phoneNumber: 1 }, { unique: true, sparse: true });
```

## 3. Transaction Model
**Collection**: transactions

Each credit or debit entry for a customer.

```js
{
const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  amount: { type: Number, required: true, min: 0 },
  type: { type: String, enum: ['CREDIT', 'DEBIT'], required: true },
  description: { type: String, default: '' },
  transactionDate: { type: Date, required: true },
  status: { type: String, enum: ['pending', 'completed', 'void'], default: 'completed' }
}, { timestamps: true });
transactionSchema.index({ userId: 1 });
transactionSchema.index({ customerId: 1 });
transactionSchema.index({ transactionDate: 1 });
}
```

## Relationships Overview
- User → Customers: One-to-Many
- Customer → Transactions: One-to-Many
- User → Transactions: One-to-Many (direct mapping for dashboard-wide summaries)