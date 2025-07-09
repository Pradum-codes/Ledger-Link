const express = require('express');
const router = express.Router();
const controller = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// POST /api/users/register
router.post('/register', controller.registerUser);

// POST /api/users/login
router.post('/login', controller.loginUser);

// GET /api/users/me
router.get('/me', authMiddleware, controller.getCurrentUser);

module.exports = router;
