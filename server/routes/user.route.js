const express = require('express');
const router = express.Router();

// POST /api/users/register
router.post('/register', (req, res) => {
  // controller.registerUser
});

// POST /api/users/login
router.post('/login', (req, res) => {
  // controller.loginUser
});

// GET /api/users/me
router.get('/me', (req, res) => {
  // controller.getCurrentUser
});

module.exports = router;
