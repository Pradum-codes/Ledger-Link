const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/user.route');
const customerRouter = require('./routes/customer.route');
const transactionRouter = require('./routes/transaction.route');
const connectDB = require('./config/db.config');

const app = express();

const startServer = async () => {
  try {
    // Connect to the database
    await connectDB();

    // Middleware setup
    app.use(cors());
    app.use(express.json());

    // Route mounting
    app.use('/api/users', userRouter);
    app.use('/api/customers', customerRouter);
    app.use('/api/transactions', transactionRouter);

    // Start server
    // eslint-disable-next-line no-undef
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`------------Server is running on http://localhost:${PORT}`);
    });
    
} catch (error) {
    console.error('------------Failed to start server:', error.message);
    // eslint-disable-next-line no-undef
    process.exit(1); // Exit with failure code
  }
};

startServer();
