// server/routes/authRoutes.js
const express = require('express');
const { registerUser, loginUser, registerAdmin, loginAdmin } = require('../controllers/authController');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth'); // This middleware is for general user authentication
const verifyToken = require('../middleware/verifyToken'); // Assuming this is your admin-specific middleware from CounselorRoutes.js

// --- PUBLIC ROUTES (NO AUTHENTICATION REQUIRED) ---
// These routes are meant for users/admins to gain a token (login/register)
router.post('/register', registerUser);       // User registration
router.post('/login', loginUser);             // User login
router.post('/admin/register', registerAdmin); // Admin registration
router.post('/admin/login', loginAdmin);       // Admin login (This is the one that was failing)



module.exports = router;